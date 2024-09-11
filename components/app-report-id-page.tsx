'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Clock, CheckCircle2, MessageCircle, Paperclip, AlertTriangle } from "lucide-react"
import Navbar from './shared/Navbar'

interface ReportUpdate {
  id: string
  date: string
  content: string
  type: 'status_change' | 'admin_message' | 'user_message'
}

interface ReportDetails {
  id: string
  dateSubmitted: string
  category: string
  status: 'submitted' | 'under_review' | 'in_progress' | 'resolved' | 'closed'
  description: string
  evidence: string[]
  updates: ReportUpdate[]
}

const mockFetchReportDetails = (id: string): Promise<ReportDetails> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        dateSubmitted: '2023-06-15',
        category: 'Workplace Harassment',
        status: 'in_progress',
        description: 'I have been experiencing consistent verbal harassment from a coworker. This has been ongoing for the past month and is affecting my work environment.',
        evidence: ['audio_recording.mp3', 'email_screenshot.jpg'],
        updates: [
          { id: '1', date: '2023-06-15', content: 'Report submitted', type: 'status_change' },
          { id: '2', date: '2023-06-16', content: 'Your report has been reviewed and assigned to an investigator.', type: 'admin_message' },
          { id: '3', date: '2023-06-18', content: 'We have reached out to the relevant parties for more information.', type: 'admin_message' },
          { id: '4', date: '2023-06-20', content: 'Thank you for the additional information provided.', type: 'admin_message' },
        ]
      })
    }, 1000)
  })
}

export function AppReportIdPage() {
  const params = useParams()
  const reportId = params.id as string

  const [reportDetails, setReportDetails] = useState<ReportDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const details = await mockFetchReportDetails(reportId)
        setReportDetails(details)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch report details. Please try again later.')
        setIsLoading(false)
      }
    }

    fetchReportDetails()
  }, [reportId])

  const handleNewMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && reportDetails) {
      const updatedReport = {
        ...reportDetails,
        updates: [
          ...reportDetails.updates,
          { id: (reportDetails.updates.length + 1).toString(), date: new Date().toISOString().split('T')[0], content: newMessage, type: 'user_message' as const }
        ]
      }
      setReportDetails(updatedReport)
      setNewMessage('')
    }
  }

  const getStatusBadge = (status: ReportDetails['status']) => {
    switch (status) {
      case 'submitted':
        return <Badge variant="secondary">Submitted</Badge>
      case 'under_review':
        return <Badge variant="outline">Under Review</Badge>
      case 'in_progress':
        return <Badge variant="default">In Progress</Badge>
      case 'resolved':
        return <Badge variant="default">Resolved</Badge>
      case 'closed':
        return <Badge variant="destructive">Closed</Badge>
      default:
        return null
    }
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!reportDetails) {
    return <div className="flex justify-center items-center h-screen">Report not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Report Details</h1>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Report #{reportDetails.id}</CardTitle>
                <CardDescription>Submitted on {reportDetails.dateSubmitted}</CardDescription>
              </div>
              {getStatusBadge(reportDetails.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Category</h3>
              <p>{reportDetails.category}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p>{reportDetails.description}</p>
            </div>
            {reportDetails.evidence.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Evidence</h3>
                <ul className="list-disc pl-5">
                  {reportDetails.evidence.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <Paperclip className="h-4 w-4 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {reportDetails.updates.map((update) => (
              <div key={update.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center mb-2">
                  {update.type === 'status_change' && <Clock className="h-5 w-5 text-blue-500 mr-2" />}
                  {update.type === 'admin_message' && <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />}
                  {update.type === 'user_message' && <MessageCircle className="h-5 w-5 text-purple-500 mr-2" />}
                  <span className="font-semibold">{update.date}</span>
                </div>
                <p>{update.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add a Message</CardTitle>
            <CardDescription>Provide additional information or ask questions about your report</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleNewMessageSubmit}>
              <Textarea
                placeholder="Type your message here"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="mb-4"
              />
              <Button type="submit" disabled={!newMessage.trim()}>Send Message</Button>
            </form>
          </CardContent>
          <CardFooter className="bg-yellow-50 text-yellow-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <p className="text-sm">
              Please do not include any sensitive personal information in your messages.
            </p>
          </CardFooter>
        </Card>
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