'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, AlertCircle, CheckCircle2, Clock, HelpCircle } from "lucide-react"
import Navbar from './shared/Navbar'

type ReportStatus = 'submitted' | 'under_review' | 'in_progress' | 'resolved' | 'closed'

interface ReportDetails {
  id: string
  status: ReportStatus
  lastUpdated: string
  category: string
  nextSteps?: string
}

const mockReportLookup = (id: string): ReportDetails | null => {
  const reports: { [key: string]: ReportDetails } = {
    'REP123456': {
      id: 'REP123456',
      status: 'under_review',
      lastUpdated: '2023-06-20',
      category: 'Workplace Harassment',
      nextSteps: 'Our team is currently reviewing your report. We may contact you for additional information.'
    },
    'REP789012': {
      id: 'REP789012',
      status: 'in_progress',
      lastUpdated: '2023-06-18',
      category: 'Online Abuse',
      nextSteps: 'We are actively working on your case and coordinating with relevant parties.'
    },
    'REP345678': {
      id: 'REP345678',
      status: 'resolved',
      lastUpdated: '2023-06-15',
      category: 'Discrimination',
      nextSteps: 'Your case has been resolved. Please check your email for a detailed resolution report.'
    }
  }
  return reports[id] || null
}

export function AppReportStatusPage() {
  const [reportId, setReportId] = useState('')
  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(null)
  const [error, setError] = useState('')

  const handleReportIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportId(e.target.value)
    setError('')
    setReportDetails(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const details = mockReportLookup(reportId)
    if (details) {
      setReportDetails(details)
      setError('')
    } else {
      setReportDetails(null)
      setError('No report found with this ID. Please check the ID and try again.')
    }
  }

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle2 className="h-5 w-5 text-blue-500" />
      case 'under_review':
        return <Search className="h-5 w-5 text-yellow-500" />
      case 'in_progress':
        return <Clock className="h-5 w-5 text-orange-500" />
      case 'resolved':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'closed':
        return <HelpCircle className="h-5 w-5 text-gray-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: ReportStatus) => {
    switch (status) {
      case 'submitted':
        return 'Submitted'
      case 'under_review':
        return 'Under Review'
      case 'in_progress':
        return 'In Progress'
      case 'resolved':
        return 'Resolved'
      case 'closed':
        return 'Closed'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Check Report Status</h1>

        <Card>
          <CardHeader>
            <CardTitle>Enter Your Report ID</CardTitle>
            <CardDescription>
              Please enter the unique report ID you received when you submitted your report.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportId">Report ID</Label>
                <Input
                  id="reportId"
                  placeholder="e.g., REP123456"
                  value={reportId}
                  onChange={handleReportIdChange}
                />
              </div>
              <Button type="submit" className="w-full">Check Status</Button>
            </form>
          </CardContent>
        </Card>

        {error && (
          <Card className="mt-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {reportDetails && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Report Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Report ID:</span>
                <span>{reportDetails.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Status:</span>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(reportDetails.status)}
                  <span>{getStatusText(reportDetails.status)}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Category:</span>
                <span>{reportDetails.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Last Updated:</span>
                <span>{reportDetails.lastUpdated}</span>
              </div>
              {reportDetails.nextSteps && (
                <div className="pt-4">
                  <h3 className="font-semibold mb-2">Next Steps:</h3>
                  <p className="text-sm text-gray-600">{reportDetails.nextSteps}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50 text-sm text-gray-600">
              <p>
                If you need to provide additional information or have any questions, please contact our support team.
              </p>
            </CardFooter>
          </Card>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need to submit a new report? <Link href="/report" className="text-blue-600 hover:underline">Click here</Link>
          </p>
        </div>
      </main>

      <footer className="bg-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">&copy; 2023 SafeSpace. All rights reserved.</p>
            <nav>
              <ul className="flex space-x-4">
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}