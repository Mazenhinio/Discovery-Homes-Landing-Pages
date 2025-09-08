'use client'

import { useEffect, useRef, useState } from 'react'

interface VapiWidgetProps {
  mode?: 'voice' | 'chat'
}

// The widget is fully sandboxed inside an iframe so it can NEVER change
// the parent document's viewport, styles, or responsive mode.
export function VapiWidget({ mode }: VapiWidgetProps) {
  const [userChoice, setUserChoice] = useState<'voice' | 'chat' | null>(mode || null)
  const [showChoice, setShowChoice] = useState(false)
  const [showCallout, setShowCallout] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (!userChoice) return
    const iframe = iframeRef.current
    if (!iframe) return

    // Visually anchor without affecting layout flow
    iframe.style.position = 'fixed'
    iframe.style.bottom = '0px'
    iframe.style.right = '0px'
    iframe.style.zIndex = '40'
    iframe.style.border = '0'
    iframe.style.background = 'transparent'
    iframe.style.pointerEvents = 'auto'
    iframe.allow = 'microphone; autoplay;'

    // Reasonable size for the embedded widget container
    iframe.width = '420'
    iframe.height = '640'

    const idoc = iframe.contentDocument || iframe.contentWindow?.document
    if (!idoc) return

    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      html, body { margin: 0; padding: 0; background: transparent; }
      body { overflow: hidden; }
      vapi-widget { position: fixed; bottom: 0; right: 0; z-index: 2147483647; }
    </style>
  </head>
  <body>
    <script src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"></script>
    <vapi-widget
      public-key="8bb91407-0cab-4af1-a757-84aa8bebf9a0"
      assistant-id="4166420a-4e63-4225-b825-0bd58332ee28"
      mode="${userChoice}"
      theme="dark"
      base-bg-color="#000000"
      accent-color="#bd9924"
      cta-button-color="#000000"
      cta-button-text-color="#ffffff"
      border-radius="medium"
      size="tiny"
      position="bottom-right"
      title="${userChoice === 'voice' ? 'Speak to Maya!' : 'Chat with Maya!'}"
      start-button-text="Start"
      end-button-text="End Call"
      chat-first-message="Hi there! This is Maya your virtual home adviser."
      chat-placeholder="Type your message..."
      voice-show-transcript="true"
      consent-required="false"
    ></vapi-widget>
  </body>
  </html>`

    idoc.open()
    idoc.write(html)
    idoc.close()

    // Nudge user to click the widget after load
    const calloutOpenTimeout = window.setTimeout(() => setShowCallout(true), 800)
    const calloutAutoHideTimeout = window.setTimeout(() => setShowCallout(false), 12000)

    return () => {
      const cleanupDoc = iframeRef.current?.contentDocument || iframeRef.current?.contentWindow?.document
      if (cleanupDoc) {
        cleanupDoc.open()
        cleanupDoc.write('<!doctype html><html><head></head><body></body></html>')
        cleanupDoc.close()
      }
      window.clearTimeout(calloutOpenTimeout)
      window.clearTimeout(calloutAutoHideTimeout)
    }
  }, [userChoice])

  const handleShowChoice = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowChoice(true)
  }

  const handleModeSelection = (selected: 'voice' | 'chat') => {
    setUserChoice(selected)
    setShowChoice(false)
  }

  if (showChoice) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-black rounded-lg shadow-lg border border-gray-700 p-4 w-64">
          <h3 className="text-white font-semibold mb-3 text-center">How would you like to chat with Maya?</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleModeSelection('voice')}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <span>Voice Chat</span>
            </button>
            <button
              onClick={() => handleModeSelection('chat')}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Text Chat</span>
            </button>
          </div>
          <button
            onClick={() => setShowChoice(false)}
            className="w-full text-gray-400 hover:text-white text-sm mt-3 transition-colors duration-200"
          >
            Maybe later
          </button>
        </div>
      </div>
    )
  }

  if (!userChoice) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleShowChoice}
          className="bg-gradient-to-r from-discovery-gold to-discovery-gold-dark text-discovery-charcoal p-5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 animate-bounce"
          title="Chat with Maya"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    )
  }

  // Render the isolated iframe when a mode is selected, with flashing callout above it
  return (
    <>
      <iframe
        ref={iframeRef}
        title="Maya Assistant"
        aria-label="Maya Assistant"
        style={{ pointerEvents: 'auto' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
      />
      {showCallout && (
        <div className="fixed bottom-20 right-4 z-50">
          <div className="bg-discovery-gold text-discovery-charcoal px-4 py-2 rounded-lg shadow-lg animate-pulse">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">
                Click the widget to start {userChoice === 'voice' ? 'voice' : 'text'} chat with Maya
              </span>
              <button
                aria-label="Dismiss"
                className="ml-2 text-discovery-charcoal/70 hover:text-discovery-charcoal"
                onClick={() => setShowCallout(false)}
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


