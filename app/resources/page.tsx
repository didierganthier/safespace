'use client'

import Link from 'next/link'
import { PhoneCall, BookOpen, Scale } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'

const ResourcesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">SafeSpace Resources</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PhoneCall className="mr-2 h-6 w-6" />
                Helplines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                24/7 support lines for immediate assistance.
              </CardDescription>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    National Harassment Hotline
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Workplace Discrimination Support
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-6 w-6" />
                Educational Materials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Learn about different forms of harassment and how to address them.
              </CardDescription>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Understanding Workplace Harassment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Cyberbullying: A Comprehensive Guide
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scale className="mr-2 h-6 w-6" />
                Legal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Know your rights and legal options.
              </CardDescription>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Anti-Harassment Laws
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-blue-600 hover:underline">
                    Legal Steps to Address Harassment
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4">Need to report an incident?</p>
          <Button asChild>
            <Link href="/report">File a Report</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResourcesPage