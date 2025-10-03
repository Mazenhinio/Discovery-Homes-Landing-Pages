# Microsoft Clarity Setup Guide

## Overview
Microsoft Clarity has been successfully integrated into your Discovery Homes project alongside your existing analytics stack (Google Analytics, Facebook Pixel, Vercel Analytics).

## What's Been Implemented

### 1. Configuration
- Added Clarity configuration to `lib/analytics.ts`
- Environment variable support for easy deployment management
- Integration with existing analytics configuration structure

### 2. Components
- Created `ClarityProvider` component in `components/providers/ClarityProvider.tsx`
- Integrated into main layout alongside other providers
- Automatic page view tracking on route changes

### 3. Event Tracking
- Enhanced tracking functions in `lib/analytics.ts`
- New `trackClarityEvent()` function for custom events
- `trackBusinessEventWithClarity` object with pre-configured business events
- Seamless integration with existing Google Analytics and Facebook Pixel tracking

### 4. TypeScript Support
- Added proper TypeScript declarations for the `clarity` global window object
- Type-safe event tracking functions

## Setup Instructions

### 1. Get Your Clarity Project ID
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Sign in with your Microsoft account
3. Create a new project for "Discovery Homes"
4. Copy your Project ID from the tracking code

### 2. Configure Environment Variables
Add to your `.env.local` file:
```bash
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_clarity_project_id_here
NEXT_PUBLIC_CLARITY_ENABLED=true
```

### 3. Test the Integration
1. Start your development server: `npm run dev`
2. Open your browser's developer tools (F12)
3. Navigate through your project
4. Check the console for Clarity initialization messages
5. Visit your Clarity dashboard to verify data is being collected

## Usage Examples

### Basic Event Tracking
```typescript
import { trackClarityEvent } from '@/lib/analytics'

// Simple event
trackClarityEvent('button_clicked')

// Event with data
trackClarityEvent('form_submission', {
  form_type: 'contact',
  source: 'hero_section'
})
```

### Business Events
```typescript
import { trackBusinessEventWithClarity } from '@/lib/analytics'

// Quote builder events
trackBusinessEventWithClarity.quoteStarted()
trackBusinessEventWithClarity.quoteCompleted(45000)
trackBusinessEventWithClarity.submitApplication({
  model: 'Pine 1',
  estimatedPrice: 45000,
  timeline: '6-8 months'
})

// Contact events
trackBusinessEventWithClarity.contactFormSubmitted('footer')
trackBusinessEventWithClarity.consultationScheduled('phone')

// Content engagement
trackBusinessEventWithClarity.contentDownloaded('pdf', 'custom_homes_guide')
```

### Using in Components
```typescript
import { trackBusinessEventWithClarity } from '@/lib/analytics'

export function QuoteBuilderForm() {
  const handleSubmit = (formData: any) => {
    // Your form submission logic here
    
    // Track the event across all analytics platforms
    trackBusinessEventWithClarity.submitApplication(formData)
  }
  
  return (
    // Your form JSX
  )
}
```

## Integration with Existing Analytics

The Clarity integration is designed to work seamlessly with your existing analytics:

- **Google Analytics**: Events tracked in both platforms
- **Facebook Pixel**: Business events also sent to Meta
- **Vercel Analytics**: Page views tracked across all platforms
- **Clarity**: Provides additional user behavior insights

## Features Available in Clarity

Once set up, Clarity will provide you with:

1. **Session Replays**: Watch user sessions to understand behavior
2. **Heatmaps**: See where users click and how far they scroll
3. **Insights**: Automatic detection of rage clicks, dead clicks, and excessive scrolling
4. **Custom Events**: Track specific user actions beyond page views
5. **Funnels**: Analyze conversion paths through your site
6. **User Cohorts**: Group users by behavior patterns

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Your Clarity project ID | Yes | '' |
| `NEXT_PUBLIC_CLARITY_ENABLED` | Enable/disable Clarity tracking | No | false |

## Troubleshooting

### Clarity Not Loading
- Check browser console for initialization errors
- Verify `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set correctly
- Ensure `NEXT_PUBLIC_CLARITY_ENABLED` is set to `true`
- Check network tab for failed script requests

### No Data in Clarity Dashboard
- Wait 24-48 hours for data to appear (new projects take time)
- Ensure you're testing on the correct domain
- Verify script is loading in browser dev tools

### TypeScript Errors
- If you see TypeScript errors related to `window.clarity`, restart your TypeScript server
- Ensure the declarations in `lib/analytics.ts` are properly imported

## Best Practices

1. **Start Simple**: Begin with page view tracking, then add custom events
2. **Test Thoroughly**: Use your staging environment to verify tracking works
3. **Privacy Compliance**: Ensure your privacy policy covers Clarity data collection
4. **Performance**: Clarity has minimal performance impact but monitor your site
5. **Data Quality**: Set up appropriate custom events for meaningful insights

## Support

For issues with the integration, check:
1. Browser console for errors
2. Clarity dashboard for data flow
3. Network requests tab for script loading
4. Microsoft Clarity documentation for best practices

The implementation is production-ready and follows Microsoft's recommended practices for Next.js applications.

