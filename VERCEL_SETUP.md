# BaxishliMedia - CMS Setup Instructions

## Vercel Deployment with Server-Side CMS

Your site now uses **Vercel KV** for server-side data storage. This means when you edit content in the CMS, it saves to Vercel's servers and affects all users globally.

### Required: Set up Vercel KV

1. **Go to your Vercel Dashboard**
   - Navigate to https://vercel.com/dashboard
   - Select your project (Baxhislimedia)

2. **Go to Storage Tab**
   - Click on the "Storage" tab
   - Click "Create Database"
   - Select **"KV"** (Key-Value Store)

3. **Create the KV Store**
   - Name it: `baxishlimedia-kv` (or any name you prefer)
   - Click "Create"

4. **Connect to Your Project**
   - After creation, click "Connect Project"
   - Select your Baxhislimedia project
   - Click "Connect"

5. **Redeploy**
   - After connecting, redeploy your project
   - Go to Deployments tab → Click the three dots on latest deployment → "Redeploy"

### How It Works

- **CMS Edits**: When you save changes in `/admin`, data is sent to `/api/cms-data` endpoint
- **Storage**: Data is stored in Vercel KV (key-value database)
- **Loading**: All users load data from Vercel KV, so everyone sees the same content
- **No LocalStorage**: Changes are no longer device-specific!

### API Endpoints

- **POST `/api/cms-data`** - Save CMS data (requires JSON body)
- **GET `/api/cms-data`** - Load current CMS data

### Environment Variables

The Vercel KV connection is automatic once you connect it to your project. No manual environment variables needed!

### Testing

After setup:
1. Go to `https://your-site.vercel.app/admin`
2. Edit some content (e.g., add a partner)
3. Click "Save changes"
4. Open site in a different device/browser
5. Changes should be visible everywhere! ✓

---

## Local Development

For local development, the app falls back to localStorage. To test the API locally, you would need to run Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

This starts a local Vercel environment with KV support.
