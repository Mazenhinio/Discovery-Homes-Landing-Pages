'use client'

import { useState, type ReactNode } from 'react';

interface LeadCaptureFormProps {
  title?: string;
  subtitle?: string;
  description?: string;
  segment?: string;
  submitText?: string;
  fields?: any[];
  onSubmit?: (formData: any) => void;
  isSubmitted?: boolean;
  successMessage?: string;
  children?: ReactNode;
}

export function LeadCaptureForm({ 
  title = "Get Started", 
  subtitle,
  description = "Contact us for more information", 
  segment, 
  submitText = "Submit", 
  fields = [],
  onSubmit,
  isSubmitted = false,
  successMessage = "Thank you for your submission!",
  children
}: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<any>({})
  const [localIsSubmitted, setLocalIsSubmitted] = useState(isSubmitted)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    setLocalIsSubmitted(true)
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }

  if (localIsSubmitted) {
    return (
      <div className="bg-discovery-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-discovery-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-discovery-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-2">Success!</h3>
          <p className="text-discovery-charcoal-light">{successMessage}</p>
        </div>
      </div>
    )
  }

  // Custom embed/children mode: render header and children only
  if (children) {
    return (
      <div className="bg-discovery-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-2">{title}</h3>
          {subtitle && <p className="text-discovery-charcoal-light">{subtitle}</p>}
        </div>
        <div>
          {children}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-discovery-white p-8 rounded-2xl shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif font-bold text-discovery-charcoal mb-2">{title}</h3>
        {subtitle && <p className="text-discovery-charcoal-light">{subtitle}</p>}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-discovery-charcoal mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'select' ? (
              <select
                required={field.required}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-3 border border-discovery-charcoal/20 rounded-lg focus:ring-2 focus:ring-discovery-gold focus:border-transparent bg-discovery-white"
              >
                <option value="">Select {field.label}</option>
                {field.options?.map((option: string, optionIndex: number) => (
                  <option key={optionIndex} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                required={field.required}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full p-3 border border-discovery-charcoal/20 rounded-lg focus:ring-2 focus:ring-discovery-gold focus:border-transparent"
                placeholder={field.label}
              />
            )}
          </div>
        ))}
        
        <button
          type="submit"
          className="w-full bg-discovery-gold hover:bg-discovery-gold-dark text-discovery-charcoal font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {submitText}
        </button>
      </form>
    </div>
  );
} 