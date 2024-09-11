'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search, Lock } from "lucide-react"
import Navbar from './shared/Navbar'

const faqs = [
  {
    question: "How do I submit a report?",
    answer: "To submit a report, click on the 'Report' button in the navigation menu. You'll be guided through a step-by-step process where you can provide details about the incident, upload any evidence, and submit your report securely.",
    category: "reporting"
  },
  {
    question: "Can I report anonymously?",
    answer: "Yes, SafeSpace allows for anonymous reporting. When submitting a report, you have the option to withhold your personal information. However, providing contact information can be helpful if further information is needed for the investigation.",
    category: "reporting"
  },
  {
    question: "What happens after I submit a report?",
    answer: "After submission, your report is reviewed by our team. You'll receive a unique report ID for tracking. Our team may reach out for additional information if needed. You can check the status of your report at any time using your report ID.",
    category: "reporting"
  },
  {
    question: "How is my privacy protected?",
    answer: "SafeSpace takes your privacy seriously. All data is encrypted both in transit and at rest. We use industry-standard security measures to protect your information. Your personal details are only accessible to authorized personnel directly involved in handling your report.",
    category: "privacy"
  },
  {
    question: "Who has access to my report?",
    answer: "Only authorized SafeSpace personnel directly involved in investigating and addressing your report have access to its details. All staff are bound by strict confidentiality agreements.",
    category: "privacy"
  },
  {
    question: "How long do you keep my report information?",
    answer: "We retain report information for as long as necessary to complete the investigation and any resulting actions. After this period, personal data is anonymized or deleted in accordance with our data retention policy and applicable laws.",
    category: "privacy"
  },
  {
    question: "What security measures does SafeSpace use?",
    answer: "SafeSpace employs multiple layers of security including encryption, secure data centers, regular security audits, and strict access controls. We also use two-factor authentication for all staff accounts and continuously monitor our systems for any unusual activity.",
    category: "security"
  },
  {
    question: "Can I update or add information to my report?",
    answer: "Yes, you can add information to your report at any time. Simply go to the 'Report Status' page, enter your report ID, and you'll find an option to add additional information or messages to your existing report.",
    category: "reporting"
  },
  {
    question: "What should I do if I'm in immediate danger?",
    answer: "If you're in immediate danger, please contact your local emergency services immediately. SafeSpace is not an emergency response service. Once you're safe, you can submit a report on our platform for further assistance and support.",
    category: "reporting"
  },
  {
    question: "How does SafeSpace handle data breaches?",
    answer: "In the unlikely event of a data breach, SafeSpace has a comprehensive incident response plan. We will promptly notify affected users, relevant authorities, and take immediate steps to secure our systems. We also conduct regular security drills to ensure we're prepared for any scenarios.",
    category: "security"
  }
]

export function AppFaqPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredFaqs = faqs.filter(faq =>
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>

        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="mb-8 flex justify-center space-x-2">
          <Button
            className={activeCategory === 'all' ? '' : 'text-black'}
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('all')}
          >
            All
          </Button>
          <Button
            className={activeCategory === 'reporting' ? '' : 'text-black'}
            variant={activeCategory === 'reporting' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('reporting')}
          >
            Reporting
          </Button>
          <Button
            className={activeCategory === 'privacy' ? '' : 'text-black'}
            variant={activeCategory === 'privacy' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('privacy')}
          >
            Privacy
          </Button>
          <Button
            className={activeCategory === 'security' ? '' : 'text-black'}
            variant={activeCategory === 'security' ? 'default' : 'outline'}
            onClick={() => setActiveCategory('security')}
          >
            Security
          </Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className='text-black font-bold'>{faq.question}</AccordionTrigger>
              <AccordionContent className='text-black'>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFaqs.length === 0 && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">No matching FAQs found. Please try a different search term.</p>
            </CardContent>
          </Card>
        )}

        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lock className="h-5 w-5 mr-2" />
              Our Commitment to Privacy and Security
            </CardTitle>
            <CardDescription>
              At SafeSpace, we prioritize the privacy and security of our users above all else.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>Data Encryption:</strong> All data transmitted to and from our servers is encrypted using industry-standard protocols.
            </p>
            <p>
              <strong>Secure Storage:</strong> We use advanced encryption methods to secure all stored data, ensuring that your information remains protected at all times.
            </p>
            <p>
              <strong>Limited Access:</strong> Only authorized personnel have access to report information, and all access is logged and monitored.
            </p>
            <p>
              <strong>Regular Audits:</strong> We conduct regular security audits and penetration testing to identify and address any potential vulnerabilities.
            </p>
            <p>
              <strong>Transparency:</strong> We are committed to being transparent about our data practices. You can read more in our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </CardContent>
        </Card>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Didn&apos;t find the answer you were looking for?</p>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
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