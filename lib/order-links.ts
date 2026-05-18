import { siteConfig } from '@/data/site';

type OrderContext = {
  productName?: string;
  productSlug?: string;
};

export function getTelegramOrderLink(ctx?: OrderContext): string {
  const base = siteConfig.contacts.telegram;
  if (!ctx?.productName) return base;
  const text = encodeURIComponent(
    `Здравствуйте! Хочу заказать «${ctx.productName}» (${siteConfig.url}/katalog/${ctx.productSlug ?? ''})`
  );
  return `${base}?text=${text}`;
}

export function getWhatsAppOrderLink(ctx?: OrderContext): string {
  const phone = siteConfig.contacts.whatsapp.replace(/\D/g, '');
  if (!ctx?.productName) return siteConfig.contacts.whatsapp;
  const text = encodeURIComponent(
    `Здравствуйте! Хочу заказать «${ctx.productName}» (${siteConfig.url}/katalog/${ctx.productSlug ?? ''})`
  );
  return `https://wa.me/${phone}?text=${text}`;
}
