# Karcari Flagship Website — 10/10 Rework

A premium Next.js/React concept for Karcari.com with a lightweight product-led hero, exact B2C product routing, B2B ingredient enquiries and a complete commercial footer.

## Immediate preview

Open `preview.html` in Chrome. Keep the complete folder together because the preview uses `preview.css`, `preview.js` and local assets under `public/`.

## Next.js development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production

```bash
npm run build
npm start
```

## Functional routing

- Each consumer product selector and pantry card opens its own exact Karcari.in product page.
- Beetroot, Tomato, Garlic, Onion, Mint and Banana ingredient enquiries create product-specific emails to `connect@karcari.com`.
- Distribution, institutional supply, private-label and general business conversations use `connect@karcari.com`.
- Instagram, Facebook and YouTube are included as dedicated footer cards.

## Performance approach

- No GSAP, Lenis, canvas, video or scroll-scrubbed blur effects in the hero.
- Product transitions use opacity and transform only.
- Pointer depth is restricted to the product theatre and disabled below tablet width.
- Motion respects `prefers-reduced-motion`.
- Hero scene files use compressed WebP assets.

## Preview images

Screenshots are included under `design-preview/` for desktop hero, mobile hero, pantry, B2B ingredient studio and footer.
