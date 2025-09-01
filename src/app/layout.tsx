import "./globals.css";
import {
  sawarabiMincho,
  GentiumBookPlus,
  GentiumPlus,
} from "../../utils/handleFont";
import type { Metadata, Viewport } from "next";

import Nav from "../../components/navigation/Nav";
import Footer from "../../components/footer/Footer";

import { ThemeProvider } from "../../components/themes/ThemeProvider";
import ThemeScript from "../../components/themes/ThemeScript";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.corentindamas.com"),
  title: {
    default: "Corentin Damas Photography",
    template: "%s | Corentin Damas Photography",
  },
  description:
    "Fine art photography capturing landscapes, urban scenes, and cultural moments from around the world. Based in Cagliari, Italy.",
  keywords: [
    "photography",
    "fine art",
    "landscape",
    "street photography",
    "travel",
    "Japan",
    "Europe",
  ],
  creator: "Corentin Damas",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

// Add viewport settings for mobile optimization
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#121a22" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${sawarabiMincho.variable} ${GentiumBookPlus.variable} ${GentiumPlus.variable}`}
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#6fa9cf" />
        <meta name="msapplication-TileColor" content="#e74d3c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        {/* Applique immédiatement le thème avant l’hydratation */}
        <ThemeScript />

        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <Nav />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
