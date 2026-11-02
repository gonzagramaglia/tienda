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
NEXT_PUBLIC_STORE_TITLE="Tienda Personal de Gonza"
```

For detailed instructions on creating a free Sanity project, setting CORS, and managing items, see [SANITY_SETUP.md](./SANITY_SETUP.md).

## Tech Stack

- **Next.js 15** (App Router, Static Export)
- **React 19**
- **Tailwind CSS**
- **Sanity Studio v3**

## Deployment to GitHub Pages

This storefront is configured for automated static export and deployment via GitHub Actions:

1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. (Optional) Add your repository secrets under **Settings** > **Secrets and variables** > **Actions**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Every push to the `main` branch triggers `.github/workflows/deploy.yml` and publishes the site.