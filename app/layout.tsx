import dynamic from "next/dynamic";
import Script from "next/script";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/seo-config";
import { organizationSchema, websiteSchema, localBusinessSchema, renderJsonLd } from "@/lib/seo";
import "./globals.css";

const Analytics = dynamic(() =>
  import("@vercel/analytics/next").then((m) => ({ default: m.Analytics }))
);

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "optional",
  preload: true,
});

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "optional",
  preload: true,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationSchema(),
    websiteSchema(),
    localBusinessSchema({
      name: siteConfig.name,
      description: siteConfig.description,
    }),
  ],
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "ERP software India",
    "SaaS ERP",
    "training institute management software",
    "rental business management software",
    "event management software",
    "academy management system",
    "multi-tenant ERP",
    "business operating system",
    "student management system",
    "inventory management software",
    "Indian SaaS",
    "branch management software",
    "WhatsApp business integration",
    "fee collection software",
    "attendance tracking system",
  ],
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.openGraph.image}`,
        width: siteConfig.openGraph.imageWidth,
        height: siteConfig.openGraph.imageHeight,
        alt: siteConfig.openGraph.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    images: [
      {
        url: `${siteConfig.url}${siteConfig.openGraph.image}`,
        alt: siteConfig.openGraph.imageAlt,
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/svg+xml" },
      { url: "/logo.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: siteConfig.name,
    statusBarStyle: "default",
  },
  category: "business",
  classification: "Business Software",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#15131f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://vercel.live" />
        <link rel="preload" href="/dashboard-preview.svg" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: renderJsonLd(jsonLd) }}
          key="json-ld-graph"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-LV7DB40J4H`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-LV7DB40J4H');`}
        </Script>
        <Script id="sw-register" strategy="lazyOnload">
          {`if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{})})}`}
        </Script>
        <Script id="ethereum-polyfill" strategy="lazyOnload">
          {`try{if(typeof window!=='undefined'&&!window.ethereum){window.ethereum=null}}catch(e){}`}
        </Script>
      </body>
    </html>
  );
}
