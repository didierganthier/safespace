'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Shield, Users, Lock, Lightbulb } from "lucide-react"

const AppAboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Shield className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold text-gray-900">SafeSpace</span>
          </Link>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About SafeSpace</h1>
          <p className="text-xl text-gray-600 mb-8">Empowering individuals to speak up and create safer environments</p>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            SafeSpace is dedicated to providing a secure and confidential platform for individuals to report instances of harassment. 
            We believe that by empowering people to speak up, we can create awareness, drive change, and ultimately build safer communities and workplaces.
          </p>
          <p className="text-gray-600 mb-4">
            Our goal is to break the silence surrounding harassment, support those who have experienced it, and provide tools for organizations to address and prevent such incidents.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-blue-600 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Safe Reporting</h3>
                  <p className="text-gray-600">We provide a secure platform for anonymous reporting, ensuring user privacy and safety.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Users className="h-6 w-6 text-blue-600 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Support Network</h3>
                  <p className="text-gray-600">We connect users with resources and support services to help them navigate their situations.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Lock className="h-6 w-6 text-blue-600 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Data Security</h3>
                  <p className="text-gray-600">We employ robust security measures to protect all user data and maintain confidentiality.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Lightbulb className="h-6 w-6 text-blue-600 mr-2 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">Education and Prevention</h3>
                  <p className="text-gray-600">We provide resources and training to help prevent harassment and promote respectful environments.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-blue-100 rounded-lg p-8 flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=300&width=400"
              alt="Illustration of people supporting each other"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & CEO", image: "/placeholder.svg?height=150&width=150" },
              { name: "Sam Lee", role: "Chief Technology Officer", image: "/placeholder.svg?height=150&width=150" },
              { name: "Jamie Smith", role: "Head of User Support", image: "/placeholder.svg?height=150&width=150" },
            ].map((member) => (
              <Card key={member.name}>
                <CardHeader>
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full mx-auto"
                  />
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Us in Making a Difference</h2>
          <p className="text-gray-600 mb-8">
            Whether you&apos;re an individual looking to report an incident, an organization aiming to create a safer environment, 
            or a supporter of our mission, there are many ways to get involved with SafeSpace.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/report">Report an Incident</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
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

export default AppAboutPage