'use client'

import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import { Textarea } from "@/app/components/ui/textarea"
import { AlertCircle, Upload } from "lucide-react"

export function ReportForm() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>SafeSpace: Report Harassment</CardTitle>
            <CardDescription>Your voice matters. Report safely and anonymously.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Harassment Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="workplace">Workplace Discrimination</SelectItem>
                    <SelectItem value="online">Online Abuse</SelectItem>
                    <SelectItem value="public">Public Harassment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the incident in detail..."
                  className="h-32"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="evidence">Upload Evidence (optional)</Label>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" /> Upload Files
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Accepted formats: PNG, JPG, PDF, MP3 (max 10MB)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact" className="flex items-center space-x-2">
                  <span>Contact Information (optional)</span>
                  <AlertCircle className="h-4 w-4 text-gray-400" />
                </Label>
                <Input id="contact" type="email" placeholder="email@example.com" />
                <p className="text-sm text-gray-500">
                  Your email will be encrypted and only used for follow-up if necessary.
                </p>
              </div>
              <Button type="submit" className="w-full">
                Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}