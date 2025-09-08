'use client'

import { useState } from 'react'

export function NewsletterSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    segment: ''
  })
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const segments = [
    { value: '', label: 'Select your interest (optional)' },
    { value: 'indigenous', label: 'Indigenous Community' },
    { value: 'developer', label: 'Developer' },
    { value: 'resort-owner', label: 'Resort Owner' },
    { value: 'rural-living', label: 'Rural Living' },
    { value: 'net-zero', label: 'Net-Zero/Off-Grid' },
    { value: 'general', label: 'General Interest' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('')

    try {
      const response = await fetch('/api/forms/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setStatus(result.message)
        setIsSubmitted(true)
        setFormData({ name: '', email: '', segment: '' })
      } else {
        setStatus(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
      setStatus('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <section className="py-16 bg-[#2D2D2D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Discovery Homes!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Thank you for subscribing to our monthly insights and opportunities. Check your email for our welcome message.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-[#D4AF37] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#B8941F] transition-colors"
            >
              Subscribe Another Email
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-[#2D2D2D] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Sign Up for Monthly Insights & Opportunities
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Get the latest insights on modular housing, funding opportunities, and industry updates delivered to your inbox every month
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              required
              disabled={isLoading}
              className="px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email address"
              required
              disabled={isLoading}
              className="px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
            />
          </div>
          
          <div className="mb-6">
            <select
              name="segment"
              value={formData.segment}
              onChange={handleInputChange}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:opacity-50"
            >
              {segments.map((segment) => (
                <option key={segment.value} value={segment.value}>
                  {segment.label}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#D4AF37] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#B8941F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </>
            ) : (
              'Subscribe to Newsletter'
            )}
          </button>
          
          {status && (
            <p className={`mt-4 ${status.includes('error') ? 'text-red-400' : 'text-[#D4AF37]'}`}>
              {status}
            </p>
          )}
        </form>
        
        <p className="text-sm opacity-70 mt-4">
          Join 2,500+ subscribers. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  )
} 