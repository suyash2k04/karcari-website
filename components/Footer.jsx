import { socialLinks } from "@/data/products";
import { buildEmailLink, INDIA_MART_URL, RETAIL_URL } from "@/lib/contact";

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10" /></svg>;
}
function Instagram() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.8" r="1"/></svg>;
}
function Facebook() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.2 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.4V10H8v3h2.8v8h3.4Z"/></svg>;
}
function Youtube() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12s0-3.2-.4-4.8a2.6 2.6 0 0 0-1.8-1.8C17.2 5 12 5 12 5s-5.2 0-6.8.4a2.6 2.6 0 0 0-1.8 1.8C3 8.8 3 12 3 12s0 3.2.4 4.8a2.6 2.6 0 0 0 1.8 1.8C6.8 19 12 19 12 19s5.2 0 6.8-.4a2.6 2.6 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8Z"/><path className="youtube-play" d="m10 9 5 3-5 3V9Z"/></svg>;
}

export default function Footer() {
  return (
    <footer className="site-footer premium-footer">
      <div className="shell premium-footer-grid">
        <section className="premium-footer-brand">
          <div className="footer-lockup"><span>क</span><strong>karcari</strong></div>
          <p>Ready-to-cook Indian premixes and ingredients for food businesses.</p>
          <a className="premium-footer-retail" href={RETAIL_URL} target="_blank" rel="noopener noreferrer">
            Shop the retail range <Arrow />
          </a>
        </section>

        <section className="premium-footer-panel">
          <small>EXPLORE</small>
          <a href="#top">Brand</a>
          <a href="#premix-range">Premix Range</a>
          <a href="#powders">Ingredient Powders</a>
          <a href="#business">Partnerships</a>
          <a href="#reviews">Reviews</a>
        </section>

        <section className="premium-footer-panel">
          <small>BUSINESS</small>
          <a href={buildEmailLink("Bulk Ingredient Enquiry")}>Bulk ingredients</a>
          <a href={buildEmailLink("Distribution Partnership Enquiry")}>Distribution</a>
          <a href={buildEmailLink("Private Label Enquiry")}>Private label</a>
          <a href={buildEmailLink("Institutional Supply Enquiry")}>Institutional supply</a>
        </section>

        <section className="premium-footer-panel premium-footer-address">
          <small>CONTACT</small>
          <strong>Karcari Products LLP</strong>
          <p>2nd Floor, J-536/11, Khande Wasti, MIDC Bhosari, Pune, Maharashtra 411026</p>
          <a href="tel:+918956151155">+91 89561 51155</a>
          <a href={buildEmailLink("Karcari Product Enquiry")}>connect@karcari.com</a>
        </section>
      </div>

      <div className="shell premium-footer-social">
        <div>
          <small>FOLLOW KARCARI</small>
          <p>Product stories, recipes and brand updates.</p>
        </div>
        <nav aria-label="Karcari social media">
          <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"><Instagram/><span><small>Instagram</small><strong>@karcariproducts</strong></span><Arrow/></a>
          <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"><Facebook/><span><small>Facebook</small><strong>Karcari Products</strong></span><Arrow/></a>
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"><Youtube/><span><small>YouTube</small><strong>Watch brand film</strong></span><Arrow/></a>
        </nav>
      </div>

      <div className="footer-bottom shell premium-footer-bottom">
        <span>© 2026 Karcari Products LLP. All rights reserved.</span>
        <div><a href="https://www.karcari.in/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy</a><a href="https://www.karcari.in/terms-and-conditions" target="_blank" rel="noopener noreferrer">Terms</a></div>
        <div><a href={INDIA_MART_URL || "#indiamart"} target={INDIA_MART_URL ? "_blank" : undefined} rel={INDIA_MART_URL ? "noopener noreferrer" : undefined}>IndiaMART</a><a href="/admin">Admin sign-in</a></div>
      </div>
    </footer>
  );
}
