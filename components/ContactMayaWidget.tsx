'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic } from 'lucide-react'

interface ContactMayaWidgetProps {
  mode?: 'voice' | 'chat'
}

export function ContactMayaWidget({ mode = 'voice' }: ContactMayaWidgetProps) {
  const [userChoice, setUserChoice] = useState<'voice' | 'chat' | null>(null)
  const [showChoice, setShowChoice] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!userChoice) return
    const iframe = iframeRef.current
    if (!iframe) return

    // Set iframe properties for the contact page widget
    iframe.style.position = 'relative'
    iframe.style.border = '0'
    iframe.style.background = 'transparent'
    iframe.style.pointerEvents = 'auto'
    iframe.allow = 'microphone; autoplay;'

    // Size for the contact page widget (larger than the jumping one)
    iframe.width = '100%'
    iframe.height = '600'

    const idoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!idoc) return

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; background: transparent; }
      body { 
        overflow: hidden; 
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        min-height: 100vh;
        background: transparent;
      }
      vapi-widget { 
        position: relative; 
        width: 100%; 
        height: 100%; 
        z-index: 1; 
        margin: 0;
      }
    </style>
  </head>
  <body>
    <vapi-widget
      public-key="8bb91407-0cab-4af1-a757-84aa8bebf9a0"
      assistant-id="4166420a-4e63-4225-b825-0bd58332ee28"
      mode="${userChoice}"
      theme="dark"
      base-bg-color="#000000"
      accent-color="#bd9924"
      cta-button-color="#000000"
      cta-button-text-color="#ffffff"
      border-radius="large"
      size="full"
      position="top-left"
      title="TALK WITH MAYA!"
      start-button-text="Start"
      end-button-text="End Call"
      chat-first-message="Hi there! This is Maya your virtual home adviser."
      chat-placeholder="Type your message..."
      voice-show-transcript="true"
      consent-required="true"
      consent-title="Terms and conditions"
      consent-content='By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service.'
      consent-storage-key="vapi_widget_consent"
    ></vapi-widget>
    <script src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js" async type="text/javascript"></script>
    <script>
      (function autoOpen() {
        const MAX_TRIES = 20; // ~4s
        let tries = 0;
        const interval = setInterval(() => {
          tries++;
          const widget = document.querySelector('vapi-widget');
          if (!widget) return;
          try {
            if (typeof widget.open === 'function') {
              widget.open();
              clearInterval(interval);
              return;
            }
            if (widget.shadowRoot) {
              const btn = widget.shadowRoot.querySelector('button, [role="button"]');
              if (btn) {
                btn.click();
                clearInterval(interval);
                return;
              }
            }
          } catch (e) {
            // ignore and retry until timeout
          }
          if (tries >= MAX_TRIES) clearInterval(interval);
        }, 200);
      })();
    </script>
  </body>
</html>`

    idoc.open()
    idoc.write(html)
    idoc.close()

    return () => {
      const cleanupDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
      if (cleanupDoc) {
        cleanupDoc.open()
        cleanupDoc.write('<!doctype html><html><head></head><body></body></html>')
        cleanupDoc.close()
      }
    }
  }, [userChoice])

  const handleModeSelection = (selected: 'voice' | 'chat') => {
    setUserChoice(selected)
    setShowChoice(false)
  }

  if (!userChoice) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-[#2D2D2D] mb-6">Chat with Maya</h2>
        <p className="text-gray-600 mb-8">
          Get instant answers about your modular home project. Choose how you'd like to connect with Maya:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleModeSelection('voice')}
            className="flex flex-col items-center p-6 border-2 border-[#D4AF37] rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all duration-300 group"
          >
            <div className="bg-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-[#D4AF37] transition-colors">
              <Mic className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice Chat</h3>
            <p className="text-sm text-center opacity-80">
              Speak naturally with Maya about your project
            </p>
          </button>
          
          <button
            onClick={() => handleModeSelection('chat')}
            className="flex flex-col items-center p-6 border-2 border-[#D4AF37] rounded-xl hover:bg-[#D4AF37] hover:text-white transition-all duration-300 group"
          >
            <div className="bg-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-[#D4AF37] transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Text Chat</h3>
            <p className="text-sm text-center opacity-80">
              Type your questions and get detailed responses
            </p>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {userChoice === 'voice' && (
            <div className="bg-[#D4AF37] w-10 h-10 rounded-full flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h2 className="text-3xl font-bold text-[#2D2D2D]">
              {userChoice === 'voice' ? 'Voice Chat with Maya' : 'Text Chat with Maya'}
            </h2>
            <p className="text-gray-600 mt-2">
              {userChoice === 'voice' 
                ? 'Speak naturally about your modular home project' 
                : 'Get instant answers to all your questions'
              }
            </p>
          </div>
        </div>
        <button
          onClick={() => setUserChoice(null)}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Back to selection"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Maya is ready to help with your project</span>
        </div>
      </div>

      <iframe
        ref={iframeRef}
        className="w-full border-0 rounded-lg"
        style={{ height: '800px' }}
      />
    </div>
  )
}
