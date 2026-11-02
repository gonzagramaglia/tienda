# Personal Garage Sale Storefront

A minimalist, high-performance personal catalog built with Next.js 15, React 19, Tailwind CSS, and Sanity CMS.

## Features

- **Personal Catalog**: Clean Medusa-inspired design with real-time search, availability filter, and product galleries.
- **Direct Actions**:
  - `Coordinar compra por WhatsApp`: Initiates direct WhatsApp chat with product details pre-filled.
  - `Comparar precio en Mercado Libre`: Opens Mercado Libre listing or automated price comparison query.
- **Zero-Maintenance CMS**: Embedded Sanity Studio at `/studio` for uploading photos, updating prices, and toggling product statuses (available, reserved, sold).
- **Demo Mode**: Built-in mock data for immediate preview without initial CMS configuration.

## Getting Started

### 1. Install dependencies and run locally
```bash
yarn install
yarn dev
```
Open [http://localhost:8000](http://localhost:8000) for the storefront or [http://localhost:8000/studio](http://localhost:8000/studio) for the admin studio.

### 2. Configure Sanity CMS & WhatsApp
Create a `.env.local` file with:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_WHATSAPP_NUMBER=5493515490431
NEXT_PUBLIC_STORE_TITLE="Venta Personal de Gonza"
```

## Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS**
- **Sanity Studio v3**
