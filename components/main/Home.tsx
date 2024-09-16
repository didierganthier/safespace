import Link from 'next/link'
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Shield, FileText, Book, Phone } from "lucide-react"
import Navbar from '../shared/Navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to SafeSpace</h1>
          <p className="text-xl text-gray-600 mb-8">A secure platform for reporting and addressing harassment</p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/report">Report an Incident</Link>
            </Button>
            <Button className='text-black' asChild variant="outline" size="lg">
              <Link href="/reports">View Public Reports</Link>
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Anonymous Reporting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Report incidents without revealing your identity, ensuring your privacy and safety.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Detailed Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Provide comprehensive information about incidents, including the option to upload supporting evidence.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="h-5 w-5 mr-2 text-blue-600" />
                Educational Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access a wealth of information about harassment, your rights, and available support services.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        <section className="bg-blue-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How SafeSpace Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Submit an anonymous report about the harassment you&apos;ve experienced.</li>
            <li>Our team reviews the report and takes appropriate action.</li>
            <li>Access support resources and connect with others who&apos;ve had similar experiences.</li>
          </ol>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Immediate Help?</h2>
          <p className="text-gray-600 mb-4">If you&apos;re in immediate danger, please contact emergency services.</p>
          <Button asChild variant="secondary">
            <Link href="/resources" className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              View Helpline Numbers
            </Link>
          </Button>
        </section>
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