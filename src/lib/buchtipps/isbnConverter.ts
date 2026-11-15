/**
 * ISBN-13 zu ISBN-10 (ASIN) Konverter & Amazon Affiliate URL Builder
 * Partner-Tag für About the World / Erklärung und mehr: erklaerung-21
 */

import { Language } from '@/types';

export const AMAZON_DOMAINS: Record<Language, string> = {
  de: 'www.amazon.de',
  en: 'www.amazon.com',
  fr: 'www.amazon.fr',
  es: 'www.amazon.es',
  it: 'www.amazon.it',
};

export function isbn13ToIsbn10(isbn13: string): string | null {
  const cleaned = isbn13.replace(/[^0-9X]/gi, '');
  if (cleaned.length === 10) return cleaned.toUpperCase();
  if (cleaned.length !== 13 || !cleaned.startsWith('978')) return null;

  const core = cleaned.slice(3, 12); // 9 Kernziffern ohne 978 und ohne alte Prüfziffer
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(core[i], 10) * (10 - i);
  }

  const remainder = (11 - (sum % 11)) % 11;
  const checkDigit = remainder === 10 ? 'X' : remainder.toString();
  return core + checkDigit;
}

export function buildAmazonAffiliateUrl(
  isbn: string,
  lang: Language = 'de',
  partnerTag?: string
): string {
  const tag = partnerTag || process.env.NEXT_PUBLIC_AMAZON_PARTNER_TAG || 'erklaerung-21';
  const domain = AMAZON_DOMAINS[lang] || 'www.amazon.de';
  const asin = isbn13ToIsbn10(isbn) || isbn.replace(/[^0-9X]/gi, '');
  return `https://${domain}/dp/${asin}?tag=${encodeURIComponent(tag)}`;
}

export function buildAmazonDeAffiliateUrl(isbn: string, partnerTag?: string): string {
  const tag = partnerTag || process.env.NEXT_PUBLIC_AMAZON_PARTNER_TAG || 'erklaerung-21';
  const asin = isbn13ToIsbn10(isbn) || isbn.replace(/[^0-9X]/gi, '');
  return `https://www.amazon.de/dp/${asin}?tag=${encodeURIComponent(tag)}`;
}

export function getOpenLibraryCoverUrl(coverId?: number, isbn?: string): string | null {
  if (coverId) {
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }
  if (isbn) {
    const cleaned = isbn.replace(/[^0-9X]/gi, '');
    return `https://covers.openlibrary.org/b/isbn/${cleaned}-L.jpg`;
  }
  return null;
}

export function getAmazonCoverUrl(isbn: string): string {
  const asin = isbn13ToIsbn10(isbn) || isbn.replace(/[^0-9X]/gi, '');
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
}
