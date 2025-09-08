'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Heart, Home, Users, Shield } from 'lucide-react'

export function FirstNationsChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Aaniin! I'm Maya, your Discovery Homes assistant specializing in First Nations housing solutions. How can I help your community today?"
    }
  ])

  // First Nations specific responses
  const getFirstNationsResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('funding') || lowerMessage.includes('finance') || lowerMessage.includes('cost')) {
      return "We offer comprehensive funding assistance for First Nations housing projects. This includes CMHC programs, Indigenous Services Canada funding, and our own financing solutions. Would you like me to connect you with our funding specialist?"
    }
    
    if (lowerMessage.includes('cultural') || lowerMessage.includes('traditional') || lowerMessage.includes('heritage')) {
      return "We deeply respect cultural traditions and work closely with community elders and cultural advisors. Our designs can incorporate traditional elements, local materials, and cultural motifs while maintaining modern functionality. Would you like to see examples of our culturally-sensitive designs?"
    }
    
    if (lowerMessage.includes('consultation') || lowerMessage.includes('process') || lowerMessage.includes('how')) {
      return "Our consultation process begins with community engagement meetings, followed by cultural consultation, design development, and project planning. We work at your community's pace and ensure full transparency throughout. Should I schedule a consultation call?"
    }
    
    if (lowerMessage.includes('sustainable') || lowerMessage.includes('environment') || lowerMessage.includes('green')) {
      return "Our modular homes are built with sustainability in mind - energy-efficient systems, sustainable materials, and reduced environmental impact. We also offer solar options and other green technologies. Would you like to learn more about our sustainable building practices?"
    }
    
    if (lowerMessage.includes('timeline') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
      return "Project timelines vary based on scope and complexity. A typical First Nations housing project takes 6-18 months from initial consultation to completion. We can work with your community's specific timeline and needs. What's your project timeline?"
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('projects') || lowerMessage.includes('past')) {
      return "We've completed over 50 First Nations housing projects across Canada, including residential complexes, community centers, and elder housing. Each project is unique and reflects the community's specific needs and cultural values. Would you like to see our success stories?"
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('speak')) {
      return "I'd be happy to connect you with our First Nations housing specialist. You can call us at 1-800-DISCOVERY or I can have someone contact you within 24 hours. What's the best way to reach you?"
    }
    
    // Default response
    return "Thank you for your question about First Nations housing. For immediate assistance with your specific needs, I recommend speaking directly with our First Nations housing specialist. Would you like me to connect you with them?"
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const botResponse = getFirstNationsResponse(message)
    
    const newMessages = [
      ...messages,
      { type: 'user', content: message },
      { type: 'bot', content: botResponse }
    ]
    
    setMessages(newMessages)
    setMessage('')
  }

  const quickReplies = [
    "Tell me about funding options",
    "Show me cultural design examples", 
    "What's the consultation process?",
    "How long do projects take?",
    "Connect me with a specialist"
  ]

  const handleQuickReply = (reply: string) => {
    const newMessages = [
      ...messages,
      { type: 'user', content: reply },
      { type: 'bot', content: getFirstNationsResponse(reply) }
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
            <h3 className="font-semibold">Maya - First Nations Housing Specialist</h3>
            <p className="text-sm opacity-90">Ask me about community housing solutions!</p>
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
                placeholder="Ask about First Nations housing..."
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