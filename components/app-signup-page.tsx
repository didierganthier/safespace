'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, Eye, EyeOff, AlertCircle, Info } from "lucide-react"

export function AppSignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy')
      return
    }

    // Here you would typically make an API call to create the user account
    // For this example, we'll just simulate the account creation process
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulated successful account creation
      console.log('Account created:', { email: formData.email })
      
      // Redirect to dashboard or home page after successful signup
      router.push('/dashboard')
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-center items-center px-4">
      <Link href="/" className="flex items-center mb-8">
        <Shield className="h-8 w-8 text-blue-600 mr-2" />
        <span className="text-2xl font-bold text-gray-900">SafeSpace</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your SafeSpace Account</CardTitle>
          <CardDescription>Join our community and start reporting safely</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="agreeTerms" 
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, agreeTerms: checked as boolean }))
                }
              />
              <Label htmlFor="agreeTerms" className="text-sm">
                I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span>{error}</span>
                </div>
              </div>
            )}
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>

      <div className="mt-8 max-w-md text-center text-sm text-gray-600">
        <div className="flex items-center justify-center mb-2">
          <Info className="h-4 w-4 mr-2 text-blue-600" />
          <span className="font-semibold">Privacy Notice</span>
        </div>
        <p>
          SafeSpace is committed to protecting your privacy. We collect only the information necessary to provide our services and will never share your personal data without your explicit consent.
        </p>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-600">
        <p>&copy; 2023 SafeSpace. All rights reserved.</p>
        <div className="mt-2">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          {" | "}
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </footer>
    </div>
  )
}