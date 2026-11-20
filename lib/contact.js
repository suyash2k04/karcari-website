export const RETAIL_URL = "https://www.karcari.in/products";
export const INDIA_MART_URL = process.env.NEXT_PUBLIC_INDIAMART_URL;
export const CONTACT_EMAIL = "connect@karcari.com";
export const WHATSAPP_NUMBER = "918888879779";

export const ENQUIRY_EMAIL_BODY = `Hello Team
I would like to enquire about Karcari products.
Please share the relevant product details, pricing and availability.
Thank you.`;

export function buildEmailLink(subject = "Karcari Product Enquiry", body = ENQUIRY_EMAIL_BODY) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const WHATSAPP_MESSAGE = `Hello Karcari Team,

I would like to enquire about Karcari products.

Name:
Company / Business:
Product / Requirement:
Required Quantity:
City / Location:

Please share the relevant product details, pricing and availability.

Thank you.`;

export function buildWhatsappLink() {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
