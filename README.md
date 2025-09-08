# Discovery Homes Copy Pages

This is a standalone project containing the copy pages for Discovery Homes modular housing website.

## Pages Included

- **First Nations Landing Page** (`/copies/first-nations-v2`)
- **Land Owners Landing Page** (`/copies/land-owners-v2`) 
- **Resort Owners Landing Page** (`/copies/resort-owners-v2`)
- **Quote Builder** (`/copies/quote-builder-v2`)
- **Home Page Copy** (`/copies/home-v2`)

## Features

- ✅ Fall Sale countdown timer
- ✅ Interactive Our Homes section with tabbed navigation
- ✅ Conveyor belt success stories animation
- ✅ How It Works process section
- ✅ Download guide popup forms with webhook integration
- ✅ Custom thank you modals
- ✅ Responsive design with Tailwind CSS
- ✅ All images and assets included locally

## Environment Variables

Create a `.env.local` file with the following variables:

```bash
# GoHighLevel Webhook URLs
GHL_FIRST_NATIONS_WEBHOOK=https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/bbf2c818-151c-4366-b401-cc3b2d2bb222
GHL_LAND_OWNERS_WEBHOOK=https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/HbWk0Go6KNcxvahZph0m
GHL_RESORT_OWNERS_WEBHOOK=https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/HbWk0Go6KNcxvahZph0m
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project is designed to be deployed as a subdomain. All assets are self-contained and the image paths have been updated to use local assets.

## Webhook URLs

The forms are configured to submit to the following webhooks:
- First Nations Guide: `https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/bbf2c818-151c-4366-b401-cc3b2d2bb222`
- Land Owners Guide: `https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/HbWk0Go6KNcxvahZph0m`
- Resort Owners Guide: `https://services.leadconnectorhq.com/hooks/02vJIYEzMsesDcYai65O/webhook-trigger/HbWk0Go6KNcxvahZph0m`

## Assets

All images and assets are located in the `assets/` folder and are referenced with `/assets/` paths.

