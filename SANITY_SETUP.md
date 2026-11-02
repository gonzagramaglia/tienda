# Step-by-Step Guide: Sanity CMS Setup & Usage

This guide explains how to create your Sanity project, configure credentials locally and in production (GitHub Pages), and use the embedded **Sanity Studio** to manage your products.

---

## 1. Create Your Account and Project in Sanity

1. Go to [sanity.io](https://www.sanity.io) and click **Get Started** or **Sign In** (you can sign in with your GitHub or Google account).
2. Inside your management dashboard ([sanity.io/manage](https://www.sanity.io/manage)):
   - Click **Create project** (or **New project**).
   - Enter a name for your project (e.g., `tienda-personal` or `garage-sale`).
   - Select the **Free** plan (the generous free tier is more than enough for a personal garage sale catalog).
3. Once created, copy the **Project ID** shown at the top (an 8-character alphanumeric string, e.g. `a1b2c3d4`).
4. By default, Sanity creates a dataset named `production`. You can verify this under the **Datasets** tab.

---

## 2. Configure Allowed Origins (CORS)

To allow the storefront and Sanity Studio to query and mutate data from your browser:

1. In [sanity.io/manage](https://www.sanity.io/manage), open your project.
2. Navigate to the **API** tab > **CORS Origins** section.
3. Click **Add CORS origin**:
   - **For local development**:
     - Origin: `http://localhost:8000`
     - Allow credentials: **Enabled (Checked ✅)**
     - Click **Save**.
   - **For GitHub Pages (Production)**:
     - Origin: `https://<your-username>.github.io` *(replace with your GitHub username)*
     - Allow credentials: **Enabled (Checked ✅)**
     - Click **Save**.

---

## 3. Set Up Credentials

### A. Local Development (`.env.local`)

In the root of the project, edit or create `.env.local`:

```env
# Project ID obtained from sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here

# Dataset name (default: "production")
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API version date
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Your WhatsApp phone number with country and area code (digits only)
NEXT_PUBLIC_WHATSAPP_NUMBER=5493515490431

# Storefront title
NEXT_PUBLIC_STORE_TITLE="Venta de Garage en Ciudad Universitaria"
```

> **Note**: If `NEXT_PUBLIC_SANITY_PROJECT_ID` is left empty or set to `'demo'`, the store automatically uses built-in mock products. Once your real ID is set, it connects directly to your Sanity dataset.

---

### B. Production Deployment (GitHub Secrets)

To allow GitHub Actions to build the static storefront with your live Sanity content:

1. In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions**.
2. Under **Repository secrets**, click **New repository secret** and add:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity Project ID.
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: `5493515490431`
3. Every push to the `main` branch uses these secrets to build and export the static site to GitHub Pages.

---

## 4. How to Use Sanity Studio to Manage Products

The storefront comes with an embedded **Sanity Studio v3** reachable directly via the `/studio` route.

### 1. Access the Studio

- **Locally**: [http://localhost:8000/studio](http://localhost:8000/studio)
- **On GitHub Pages**: `https://<your-username>.github.io/tienda/studio/`

*(On first visit, you will be prompted to log in with your Sanity credentials).*

---

### 2. Create or Edit a Product

1. In the left sidebar, click **Productos**.
2. Click the **+** (Create new document) button at the top.
3. Fill in the fields:
   - **Título**: Clear title of the item (e.g. `Monitor Dell UltraSharp 27" 4K`).
   - **Slug**: Click the **Generate** button next to the input to generate the URL-safe slug.
   - **Precio**: Numeric price (e.g. `420000`).
   - **Moneda**: Select `ARS` or `USD`.
   - **Estado**:
     - `available`: Appears on the **Artículos disponibles** tab.
     - `reserved`: Moves to the **Reservados o vendidos** tab.
     - `sold`: Marked as sold on the **Reservados o vendidos** tab.
   - **Condición**: `Como nuevo`, `Excelente`, `Muy bueno`, etc.
   - **Imágenes**: Upload one or more high-quality photos. Drag and drop to reorder; the first image will be the primary cover image.
   - **Descripción**: Details regarding condition, usage duration, technical specs, or included accessories.
   - **Enlace de Mercado Libre (Optional)**:
     - If you have an existing listing or reference URL, paste it here.
     - If left empty, the button automatically generates a Mercado Libre search for the product title.
   - **Mensaje personalizado de WhatsApp (Optional)**: Customize the pre-filled WhatsApp message for this item.
4. Click the green **Publish** button at the bottom right.

---

## 5. Publishing Changes to GitHub Pages

Since GitHub Pages serves pre-rendered static HTML files:

1. **Locally**: Content changes in Sanity reflect immediately on page reload.
2. **On GitHub Pages**: To update the public site with newly added products or updated prices:
   - Go to the **Actions** tab in your GitHub repository.
   - Select the **Deploy to GitHub Pages** workflow.
   - Click **Run workflow** > **Branch: main** > **Run workflow**.
   *(Or push any commit to `main` to trigger the build automatically).*
