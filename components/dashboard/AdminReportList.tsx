'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'


type Report = {
  id: string
  category: string
  description: string
  status: 'New' | 'In Progress' | 'Resolved'
  dateSubmitted: string
  evidence?: string[]
}

const mockReports: Report[] = [
  {
    id: '1',
    category: 'Workplace Discrimination',
    description: 'Experienced unfair treatment due to gender in promotion process.',
    status: 'New',
    dateSubmitted: '2023-06-15',
    evidence: ['document1.pdf', 'audio1.mp3']
  },
  {
    id: '2',
    category: 'Online Abuse',
    description: 'Received threatening messages on social media platform.',
    status: 'In Progress',
    dateSubmitted: '2023-06-14'
  },
  {
    id: '3',
    category: 'Public Harassment',
    description: 'Verbal harassment incident in public transportation.',
    status: 'Resolved',
    dateSubmitted: '2023-06-10',
    evidence: ['image1.jpg']
  },
]

export function AppAdminReportList() {
  const [expandedReport, setExpandedReport] = useState<string | null>(null)

  const toggleReportDetails = (reportId: string) => {
    setExpandedReport(expandedReport === reportId ? null : reportId)
  }

  const updateReportStatus = (reportId: string, newStatus: Report['status']) => {
    // In a real application, this would update the status in the backend
    console.log(`Updating report ${reportId} status to ${newStatus}`)
  }

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-500'
      case 'In Progress': return 'bg-yellow-500'
      case 'Resolved': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Submitted Reports</CardTitle>
        <CardDescription>Review and manage harassment reports</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockReports.map((report) => (
              <>
                <TableRow key={report.id}>
                  <TableCell>{report.id}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                  </TableCell>
                  <TableCell>{report.dateSubmitted}</TableCell>
                  <TableCell>
                    <Button variant="ghost" onClick={() => toggleReportDetails(report.id)}>
                      {expandedReport === report.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      <span className="sr-only">Toggle report details</span>
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedReport === report.id && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Description:</h4>
                          <p>{report.description}</p>
                          {report.evidence && (
                            <div className="mt-2">
                              <h4 className="font-semibold mb-2">Evidence:</h4>
                              <ul className="list-disc pl-5">
                                {report.evidence.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="mt-4">
                            <h4 className="font-semibold mb-2">Update Status:</h4>
                            <Select onValueChange={(value) => updateReportStatus(report.id, value as Report['status'])}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="New">New</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500 flex items-center">
          <AlertCircle className="h-4 w-4 mr-2" />
          Ensure all reports are handled with confidentiality and care.
        </p>
      </CardFooter>
    </Card>
  )
}