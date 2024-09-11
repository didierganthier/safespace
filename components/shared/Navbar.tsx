import { Shield } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Shield className="h-8 w-8 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">SafeSpace</span>
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                        <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                        <li><Link href="/report" className="text-gray-600 hover:text-gray-900">Report</Link></li>
                        <li><Link href="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Navbar