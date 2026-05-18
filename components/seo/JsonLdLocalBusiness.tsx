import { siteConfig } from '@/data/site';

export default function JsonLdLocalBusiness() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.fullName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contacts.phone,
    email: siteConfig.contacts.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.address.city,
      addressCountry: 'RU',
      streetAddress: siteConfig.address.full,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.address.coords.lat,
      longitude: siteConfig.address.coords.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '11:00',
        closes: '17:00',
      },
    ],
    sameAs: [siteConfig.contacts.telegram, siteConfig.contacts.vk],
    image: `${siteConfig.url}/images/og/default.png`,
    priceRange: '₽₽',
    currenciesAccepted: 'RUB',
    paymentAccepted: 'Cash, Bank Transfer',
    areaServed: {
      '@type': 'City',
      name: 'Ярославль',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
