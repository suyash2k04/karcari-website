# Karcari Owner Admin — setup and deployment

## What is included

The existing Karcari website is preserved, with a private `/admin` dashboard. The owner can:

- Add premixes or ingredient products, including images and descriptions.
- Edit existing products, badges, pack sizes, yields, benefits and colour accents.
- Publish / unpublish products (drafts do not appear publicly).
- Delete products (after confirmation).
- Search and filter the catalogue. The initial 10 premixes + 6 ingredients are automatically imported on first use.

Public page content comes from the same persisted catalogue. Changes take effect on page refresh; no code deployment is required.

## Local installation

1. Install Node.js 22 or later.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Change `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` to private values; the secret must be at least 32 characters. Do not commit this file.
5. Run `npm run dev` and open `http://localhost:3000/admin`.
6. Add/edit products. Preview the public site at `http://localhost:3000/`.

### Production

Run `npm run build` and `npm run start` behind HTTPS with a **persistent, writable filesystem**. Configure `DATA_DIR` to a persistent mounted volume (e.g. `/var/lib/karcari`). The catalog data is saved as `DATA_DIR/catalog.json` and uploaded images as `DATA_DIR/uploads/*.webp`; do not delete these when redeploying. Back up both files and images regularly.

**Important hosting limitation:** This implementation is for a persistent Node.js server (VPS, Render with persistent disk, etc.). **Do not deploy unchanged to Vercel or other read-only / ephemeral serverless hosts**; product changes and image uploads would be lost or fail. A Vercel deployment needs a managed database and object storage (e.g., Supabase) instead.

The username and password are controlled through environment variables, not edited in the admin interface. The cookie lasts eight hours. Login is protected with a simple per-instance retry limit; for production use, also use a reverse-proxy rate limiter and enable HTTPS. No payment processing is involved.

### Images and product claims

Images are limited to 8 MB, optimised to WebP, and stored in the persistent data directory. Always obtain approval for commercial and nutrition claims before publishing. Deleting a product does not remove its image file; periodically clean unused media after backing up.

### Recovery

For backup/restore copy `DATA_DIR/catalog.json` and `DATA_DIR/uploads/` together. If `catalog.json` has never been saved, the original 16 products are shown as initial data. Once any edit is made, it becomes the persisted source of truth.

### Included routes

- `/admin` — login and product management.
- `/api/admin/login`, `/api/admin/logout` — owner session.
- `/api/admin/products` — protected product read/create/update/delete.
- `/api/admin/upload` — authenticated image upload.
- `/media/<generated-image>.webp` — public read-only images.
