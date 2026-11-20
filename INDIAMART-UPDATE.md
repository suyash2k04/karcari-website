# IndiaMART product links update

Two product-level links are configured:

- Sprouted Moong Chilla: https://www.indiamart.com/proddetail/karcari-sprouted-moong-chilla-premix-powder-2859373289848.html
- Puran Poli Premix: https://www.indiamart.com/proddetail/karcari-puran-poli-premix-powder-2859367875155.html

Tracking query strings were removed from the supplied links; the product-detail addresses remain the same. The link appears on the corresponding product card only. Other products have no IndiaMART link.

Admins can now edit each product's IndiaMART URL in `/admin`. For existing deployments where `storage/catalog.json` already exists, run `npm run indiamart:update` once, using the same `DATA_DIR` as production. The script backs up the existing catalogue and changes only these two product fields. Run it with the application stopped to avoid simultaneous file writes. If no saved catalogue exists, the default products already contain both URLs.

The top navigation and footer company-level IndiaMART link remains hidden until a real company/storefront URL is supplied via `NEXT_PUBLIC_INDIAMART_URL`. Do not use a single product URL as the company storefront.
