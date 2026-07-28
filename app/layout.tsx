import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://navisamarnath.com"),
  title: "Navisamarnath | Psychology & Coaching",
  description:
    "Thoughtful, evidence-based therapy and coaching for clarity, connection, resilience, and lasting change.",
  openGraph: {
    title: "Navisamarnath | Psychology & Coaching",
    description: "Make space for the life waiting within.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Navisamarnath — Make space for the life waiting within.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navisamarnath | Psychology & Coaching",
    description: "Make space for the life waiting within.",
    images: ["/og.png"],
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
