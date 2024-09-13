"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import UploadFile from "../shared/UploadFile";
import { toast } from "react-toastify";

export function ReportForm() {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState<any>([]); // Array to store uploaded file URLs
  const [contact, setContact] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setSubmitting(true);

    try {
      // Upload evidence files (if any)
      const uploadedEvidence = await Promise.all(
        evidence.map(async (file: any) => {
          const fileRef = ref(storage, `reports/${file.name!}`);
          await uploadBytes(fileRef, file);
          return await getDownloadURL(fileRef);
        })
      );

      // Create a new report object
      const reportData = {
        category,
        description,
        evidence: uploadedEvidence,
        contact: contact, // Assuming contact is an email input
        timestamp: new Date(), // Timestamp of report submission
      };

      // Add report data to Firestore
      await addDoc(collection(db, "reports"), reportData);

      // Clear form after successful submission
      setCategory("");
      setDescription("");
      setEvidence([]);
      setContact("");

      // Show success toast
      toast.success('Your report has been submitted successfully.');

    } catch (error) {
      // Show error toast
      toast.error('There was an error submitting your report. Please try again.');
    }
    setSubmitting(false);
  };

  const handleFileChange = (event: any) => {
    const files = Array.from(event.target.files);
    setEvidence([...evidence, ...files]); // Add selected files to evidence array
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>SafeSpace: Report Harassment</CardTitle>
            <CardDescription>Your voice matters. Report safely and anonymously.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="category">Harassment Category</Label>
                <Select value={category} onValueChange={(e: string) => setCategory(e)}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workplace-discrimination">Workplace Discrimination</SelectItem>
                    <SelectItem value="online-abuse">Online Abuse</SelectItem>
                    <SelectItem value="public-harassment">Public Harassment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe the incident in detail..."
                  className="h-32"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evidence">Upload Evidence (optional)</Label>
                <UploadFile handleFileChange={handleFileChange} />
                <ul className="mt-2 list-disc pl-5 text-sm text-gray-600">
                  {evidence.map((file: any, index: number) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500">
                  Accepted formats: PNG, JPG, PDF, MP3 (max 10MB)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact" className="flex items-center space-x-2">
                  <span>Contact Information (optional)</span>
                  <AlertCircle className="h-4 w-4 text-gray-400" />
                </Label>
                <Input
                  id="contact"
                  type="email"
                  placeholder="email@example.com"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                <p className="text-sm text-gray-500">
                  Your email will be encrypted and only used for follow-up if necessary.
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Submitting Report..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}