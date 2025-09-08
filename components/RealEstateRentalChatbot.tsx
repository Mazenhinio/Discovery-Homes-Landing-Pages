'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, DollarSign, TrendingUp, Building, Calculator, Users, Shield } from 'lucide-react'

export function RealEstateRentalChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm Maya, your Discovery Homes assistant specializing in rental property investments. How can I help you scale your portfolio today?"
    }
  ])

  // Real Estate Rental specific responses
  const getRealEstateRentalResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('roi') || lowerMessage.includes('return') || lowerMessage.includes('profit')) {
      return "Our modular homes typically deliver 12-18% annual ROI with rental incomes of $2,500+ per month. Would you like me to connect you with our investment calculator?"
    }
    
    if (lowerMessage.includes('financing') || lowerMessage.includes('loan') || lowerMessage.includes('funding')) {
      return "We offer portfolio loans up to $10M, construction financing with interest-only payments, and bridge loans for quick opportunities. What's your investment budget?"
    }
    
    if (lowerMessage.includes('timeline') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
      return "From order to rental-ready takes just 60 days vs 6-12 months with traditional construction. This means faster income generation for your portfolio."
    }
    
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('repair') || lowerMessage.includes('upkeep')) {
      return "Our modular homes are built with premium materials and modern systems, requiring minimal maintenance. This reduces your operational costs and attracts quality tenants."
    }
    
    if (lowerMessage.includes('portfolio') || lowerMessage.includes('scale') || lowerMessage.includes('expand')) {
      return "We've helped investors scale from 5 to 200+ units. Our modular approach allows rapid portfolio expansion with predictable costs and timelines."
    }
    
    if (lowerMessage.includes('market') || lowerMessage.includes('location') || lowerMessage.includes('area')) {
      return "We analyze local rental markets, zoning requirements, and demographic trends to identify the best investment opportunities for your portfolio."
    }
    
    if (lowerMessage.includes('tenant') || lowerMessage.includes('rental') || lowerMessage.includes('occupancy')) {
      return "Our premium modular homes achieve 95%+ occupancy rates and attract quality tenants who pay premium rents. We also offer tenant screening services."
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('speak')) {
      return "I'd be happy to connect you with our rental property investment specialist. You can call us at 1-800-DISCOVERY or I can have someone contact you within 24 hours."
    }
    
    // Default response
    return "Thank you for your question about rental property investment. For immediate assistance with your specific needs, I recommend speaking directly with our investment specialist. Would you like me to connect you with them?"
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const botResponse = getRealEstateRentalResponse(message)
    
    const newMessages = [
      ...messages,
      { type: 'user', content: message },
      { type: 'bot', content: botResponse }
    ]
    
    setMessages(newMessages)
    setMessage('')
  }

  const quickReplies = [
    "What's the typical ROI?",
    "Tell me about financing options", 
    "How fast can I deploy units?",
    "What about maintenance costs?",
    "Connect me with an investment specialist"
  ]

  const handleQuickReply = (reply: string) => {
    const newMessages = [
      ...messages,
      { type: 'user', content: reply },
      { type: 'bot', content: getRealEstateRentalResponse(reply) }
    ]
    
    setMessages(newMessages)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-discovery-gold text-discovery-charcoal p-4 rounded-full shadow-lg hover:bg-discovery-gold-dark transition-colors z-50"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-discovery-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-discovery-gold text-discovery-charcoal p-4 rounded-t-lg">
            <h3 className="font-semibold">Maya - Rental Investment Specialist</h3>
            <p className="text-sm opacity-90">Ask me about portfolio scaling!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.type === 'user'
                      ? 'bg-discovery-gold text-discovery-charcoal'
                      : 'bg-discovery-charcoal/10 text-discovery-charcoal'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <div className="text-xs text-discovery-charcoal-light mb-2">Quick questions:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="bg-discovery-sage/20 text-discovery-charcoal text-xs px-3 py-1 rounded-full hover:bg-discovery-sage/30 transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-discovery-charcoal/10">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about rental investments..."
                className="flex-1 border border-discovery-charcoal/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-discovery-gold"
              />
              <button
                onClick={handleSendMessage}
                className="bg-discovery-gold text-discovery-charcoal p-2 rounded-md hover:bg-discovery-gold-dark transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 