# Karcari product and story update

- 17 premix/smoothie/pancake products in the requested order. The original B2B ingredient catalog stays intact.
- Images are sourced from the user-supplied branded product photographs; no generated replacements. Lifestyle images provided are retained under `public/products/lifestyle` for future gallery support.
- Red Velvet Pancake and Vanilla Pancake are drafts: no approved images or descriptions. Chocolate Protein Pancake has an image but no approved description and remains a draft.
- New product descriptions follow the supplied copy with light punctuation editing. Some health or nutrient claims in supplied copy may need compliance review before public use.
- The founder-story section is adapted from the supplied `Our Story.docx` and is visible as a dedicated section with navigation.
- IndiaMART is added as a conditional navigation/footer link. Enter the exact public profile URL as `NEXT_PUBLIC_INDIAMART_URL` in `.env.local` to reveal it. No guessed profile URL is hardcoded.
- Data store: an existing `storage/catalog.json` file takes precedence over new seed product records. For an existing deployment, run `npm run catalog:migrate` once on the deployed server with `DATA_DIR` configured. This creates a timestamped backup and retains custom records and ingredients. The 17 supplied premix entries replace records with matching IDs.
- Test `npm run build` and all admin CRUD routes in a Node hosting environment with a persistent storage volume before production.
