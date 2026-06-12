import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import {
  SITE_URL,
  getLanguageAlternates,
  getLocalizedPath,
  getPageRobots,
} from "./lib/seo";
import { Analytics } from "./components/analytics";
import { InstallAppPrompt } from "./components/install-app-prompt";
import { ServiceWorkerRegistration } from "./components/service-worker-registration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Move2Marbella | Costa del Sol Property Search",
    template: "%s | Move2Marbella",
  },
  description:
    "Search properties for sale in Marbella, Estepona and across the Costa del Sol with Move2Marbella.",
  applicationName: "Move2Marbella",
  alternates: {
    canonical: getLocalizedPath("en"),
    languages: getLanguageAlternates(),
  },
  openGraph: {
    type: "website",
    siteName: "Move2Marbella",
    title: "Move2Marbella | Costa del Sol Property Search",
    description:
      "Search properties for sale in Marbella, Estepona and across the Costa del Sol.",
    url: getLocalizedPath("en"),
    images: [
      {
        url: "/move2marbella-panorama.jpg",
        width: 1200,
        height: 675,
        alt: "Aerial panorama of Marbella and the Costa del Sol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Move2Marbella | Costa del Sol Property Search",
    description:
      "Search properties for sale in Marbella, Estepona and across the Costa del Sol.",
    images: ["/move2marbella-panorama.jpg"],
  },
  robots: getPageRobots(),
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
        <ServiceWorkerRegistration />
        <InstallAppPrompt />
      </body>
    </html>
  );
}
