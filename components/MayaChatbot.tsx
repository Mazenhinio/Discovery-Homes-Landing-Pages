'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX, Phone, MessageSquare } from 'lucide-react'

type Message = {
  type: 'bot' | 'user'
  content: string
  timestamp: Date
}

type ChatMode = 'text' | 'voice'

export function MayaChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<ChatMode>('text')
  const [message, setMessage] = useState('')
  const [sessionId] = useState(() => `maya-session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hi! I'm Maya, your Discovery Homes assistant. I can help you with text or voice. How can I assist you today?",
      timestamp: new Date()
    }
  ])
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage: Message = {
      type: 'user',
      content: message,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentMessage = message
    setMessage('')
    setIsTyping(true)

    try {
      // Send message to n8n webhook
      const response = await fetch('https://neverclosedai.app.n8n.cloud/webhook/de125f97-5f46-4af9-9f4b-eb7d7abbcffa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          timestamp: new Date().toISOString(),
          source: 'discovery-homes-website',
          sessionId: sessionId
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Check if response has content
      const responseText = await response.text()
      console.log('Raw response from n8n:', responseText)
      
      let data
      try {
        data = responseText ? JSON.parse(responseText) : {}
      } catch (parseError) {
        console.error('Failed to parse JSON response:', parseError)
        console.log('Response was not valid JSON:', responseText)
        data = {}
      }
      
      // Handle the response from n8n
      const botMessage: Message = {
        type: 'bot',
        content: data.response || data.message || data.text || responseText || "I'm sorry, I couldn't process your request. Please try again or call 1-800-DISCOVERY for immediate assistance.",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error sending message to n8n:', error)
      
      // Fallback response if webhook fails
      const botMessage: Message = {
        type: 'bot',
        content: "I'm having trouble connecting to my AI brain right now. For immediate assistance, please call 1-800-DISCOVERY or use our contact form.",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleVoiceToggle = () => {
    if (mode === 'text') {
      setMode('voice')
      // TODO: Initialize voice connection with VAPI
      setIsConnected(true)
    } else {
      setMode('text')
      setIsListening(false)
      setIsConnected(false)
    }
  }

  const handleVoiceStart = () => {
    if (!isConnected) return
    setIsListening(true)
    // TODO: Start voice recording with VAPI
  }

  const handleVoiceStop = () => {
    setIsListening(false)
    // TODO: Stop voice recording with VAPI
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-discovery-gold to-discovery-gold-dark text-discovery-charcoal p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Maya</h3>
                <p className="text-sm opacity-90">Discovery Homes Assistant</p>
              </div>
              <div className="flex items-center space-x-2">
                {/* Mode Toggle */}
                <button
                  onClick={handleVoiceToggle}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    mode === 'voice' 
                      ? 'bg-discovery-charcoal text-discovery-gold' 
                      : 'bg-discovery-charcoal/20 text-discovery-charcoal hover:bg-discovery-charcoal/30'
                  }`}
                  title={mode === 'text' ? 'Switch to Voice' : 'Switch to Text'}
                >
                  {mode === 'text' ? <Phone size={16} /> : <MessageSquare size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-discovery-charcoal/20 text-discovery-charcoal hover:bg-discovery-charcoal/30 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            {/* Mode Indicator */}
            <div className="flex items-center mt-2">
              <div className={`flex items-center space-x-1 text-xs ${
                mode === 'voice' ? 'text-discovery-charcoal' : 'text-discovery-charcoal/60'
              }`}>
                <MessageSquare size={12} />
                <span>Text</span>
              </div>
              <div className="w-8 h-px bg-discovery-charcoal/30 mx-2"></div>
              <div className={`flex items-center space-x-1 text-xs ${
                mode === 'voice' ? 'text-discovery-charcoal/60' : 'text-discovery-charcoal'
              }`}>
                <Phone size={12} />
                <span>Voice</span>
              </div>
              {mode === 'voice' && (
                <div className={`ml-2 flex items-center space-x-1 text-xs ${
                  isConnected ? 'text-green-600' : 'text-red-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-green-600' : 'bg-red-600'
                  }`}></div>
                  <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      msg.type === 'user'
                        ? 'bg-gradient-to-r from-discovery-gold to-discovery-gold-dark text-discovery-charcoal'
                        : 'bg-white text-discovery-charcoal shadow-sm border border-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${
                    msg.type === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%]">
                  <div className="bg-white text-discovery-charcoal p-3 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-discovery-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="p-4 border-t border-gray-100 bg-white">
            {mode === 'text' ? (
              /* Text Mode Input */
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-discovery-gold focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  className="bg-gradient-to-r from-discovery-gold to-discovery-gold-dark text-discovery-charcoal p-3 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            ) : (
              /* Voice Mode Input */
              <div className="flex flex-col items-center space-y-3">
                {!isConnected ? (
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-2">Connecting to voice service...</div>
                    <button
                      onClick={handleVoiceToggle}
                      className="bg-gradient-to-r from-discovery-gold to-discovery-gold-dark text-discovery-charcoal px-6 py-2 rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      Retry Connection
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-gray-600 text-center">
                      {isListening ? 'Listening... Speak now!' : 'Tap to start voice conversation'}
                    </div>
                    <button
                      onClick={isListening ? handleVoiceStop : handleVoiceStart}
                      className={`p-6 rounded-full transition-all duration-300 ${
                        isListening
                          ? 'bg-red-500 text-white shadow-lg animate-pulse'
                          : 'bg-gradient-to-r from-discovery-gold to-discovery-gold-dark text-discovery-charcoal hover:shadow-xl'
                      }`}
                    >
                      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                    </button>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Volume2 size={12} />
                        <span>Voice AI</span>
                      </div>
                      <div className="w-px h-3 bg-gray-300"></div>
                      <div className="flex items-center space-x-1">
                        <span>Powered by VAPI</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
} 