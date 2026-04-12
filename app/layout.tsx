import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "700", "800", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Autoplyn MK – LPG servis a autoservis | Nová Ľubovňa",
  description:
    "Autoplyn MK s.r.o. – Špecialista na montáž LPG systémov KME, servis a diagnostiku LPG vozidiel a kontrolu emisií v Novej Ľubovni. 20 rokov skúseností.",
  keywords: ["LPG servis", "autoservis", "montáž LPG", "KME", "Nová Ľubovňa", "kontrola emisií"],
  openGraph: {
    title: "Autoplyn MK – LPG servis a autoservis",
    description: "Špecialista na montáž LPG systémov KME, servis a diagnostiku LPG vozidiel.",
    url: "https://www.autoplynmk.sk",
    siteName: "Autoplyn MK",
    locale: "sk_SK",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: "Autoplyn MK s.r.o.",
  description:
    "Špecialista na montáž LPG systémov KME, servis a diagnostiku LPG vozidiel a kontrolu emisií.",
  url: "https://www.autoplynmk.sk",
  telephone: "+421907321693",
  email: "info@autoplynmk.sk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Nová Ľubovňa 95",
    postalCode: "065 11",
    addressLocality: "Nová Ľubovňa",
    addressCountry: "SK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 49.2969,
    longitude: 20.6872,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
  priceRange: "€€",
  sameAs: ["https://www.autoplynmk.sk"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      className={`${interTight.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
