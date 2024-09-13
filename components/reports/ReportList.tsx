'use client'

import { useState, useEffect } from 'react';
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react";
import { db } from "@/lib/firebase"; // Make sure this imports your Firebase configuration
import { collection, getDocs, Timestamp } from "firebase/firestore";
import formatDate from '@/utils/formatDate';

type Report = {
  id: string;
  category: string;
  targetEntity: string;
  dateSubmitted: string;
  timestamp: Timestamp;
  claimCount: number;
  description: string;
};

export function AppReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [claimDialogOpen, setClaimDialogOpen] = useState(false);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsCollection = collection(db, "reports");
        const reportsSnapshot = await getDocs(reportsCollection);
        const reportsData = reportsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Report[];
        setReports(reportsData);
      } catch (error) {
        console.error("Error fetching reports: ", error);
      }
    };

    fetchReports();
  }, []);

  const toggleReportDetails = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  const openClaimDialog = (reportId: string) => {
    setCurrentReportId(reportId);
    setClaimDialogOpen(true);
  };

  const submitClaim = (event: React.FormEvent) => {
    event.preventDefault();
    // Add logic to submit the claim to Firestore
    console.log(`Submitting claim for report ${currentReportId}`);
    setClaimDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Public Report List</CardTitle>
          <CardDescription>View anonymized reports and add your voice if you&apos;ve experienced similar harassment</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.map((report) => (
            <Card key={report.id} className="mb-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {report.category.replace(/^\w/, (c) => c.toUpperCase()).replace('-', ' ')}
                </CardTitle>
                {report.claimCount > 0 && (<Badge variant="secondary">{report.claimCount} similar claims</Badge>)}
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-2">
                  Reported on {formatDate(report.timestamp)}
                </div>
                <Button variant="ghost" onClick={() => toggleReportDetails(report.id)} className="mb-2">
                  {expandedReport === report.id ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
                  {expandedReport === report.id ? 'Hide Details' : 'Show Details'}
                </Button>
                {expandedReport === report.id && (
                  <div className="mt-2 p-4 bg-muted rounded-md">
                    <p className="text-sm">{report.description}</p>
                  </div>
                )}
                <div className="mt-4">
                  <Button onClick={() => openClaimDialog(report.id)}>
                    I&apos;ve experienced this too
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Dialog open={claimDialogOpen} onOpenChange={setClaimDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Similar Experience</DialogTitle>
            <DialogDescription>
              Please provide details about your similar experience. This information will be kept confidential.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitClaim}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name (Optional)
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email (Optional)
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" className="col-span-3" required />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit Claim</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-8 flex items-center justify-center text-sm text-muted-foreground">
        <AlertCircle className="h-4 w-4 mr-2" />
        If you&apos;re in immediate danger, please contact local authorities or a helpline.
      </div>
    </div>
  );
}