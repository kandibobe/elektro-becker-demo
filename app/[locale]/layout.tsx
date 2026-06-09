import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import type { Metadata } from 'next';

import { Header } from '@components/layout/Header';
import { Footer } from '@components/layout/Footer';
import { DemoBanner } from '@components/ui/DemoBanner';
import { FloatingCallButton } from '@components/ui/FloatingCallButton';
import { CookieBanner } from '@components/ui/CookieBanner';
import { routing } from '@/i18n/routing';
import { electricianConfig } from '@lib/config';
import '../globals.css';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  name: electricianConfig.name,
  description: 'Meisterbetrieb für Elektroinstallation, Reparatur, Smart Home und Photovoltaik in Gelsenkirchen',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Musterstraße 12',
    addressLocality: 'Gelsenkirchen',
    postalCode: '45881',
    addressCountry: 'DE',
  },
  telephone: electricianConfig.phone,
  email: electricianConfig.email,
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://elektro-becker-demo.vercel.app',
  openingHours: ['Mo-Fr 07:00-18:00', 'Sa 08:00-13:00'],
  priceRange: '€€',
  areaServed: { '@type': 'City', name: 'Gelsenkirchen' },
  hasMap: electricianConfig.googleMapsEmbedUrl,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '87',
  },
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_APP_URL || 'https://elektro-becker-demo.vercel.app'
    ),
    title: t('title'),
    description: t('description'),
    openGraph: {
      type: 'website',
      locale,
      siteName: electricianConfig.name,
      title: t('title'),
      description: t('description'),
    },
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: {
        de: '/',
        en: '/en',
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <DemoBanner />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingCallButton />
          <CookieBanner />
          <Toaster position="bottom-right" richColors />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
