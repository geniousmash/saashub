'use client'

import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">SaaSHub</Link>
        </nav>
      </header>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Login</h1>
          <p className="text-gray-600 mb-8">Authentication features coming soon</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}
