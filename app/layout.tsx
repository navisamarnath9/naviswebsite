import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://navisamarnath.com"),
  title: "Navisamarnath | Psychology & Coaching",
  description:
    "Thoughtful, evidence-based therapy and coaching for clarity, connection, resilience, and lasting change.",
  openGraph: {
    title: "Navisamarnath | Psychology & Coaching",
    description: "Space to understand. Support to move forward.",
    type: "website",
    images: [
      {
        url: "/og-home.png",
        width: 1734,
        height: 907,
        alt: "Navisamarnath — Space to understand. Support to move forward.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navisamarnath | Psychology & Coaching",
    description: "Space to understand. Support to move forward.",
    images: ["/og-home.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
