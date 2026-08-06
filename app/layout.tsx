import type { Metadata } from "next";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

export const metadata: Metadata = {
  metadataBase: new URL("https://navisamarnath.com"),
  title: "Navisamarnath | Counselling, Psychotherapy & Coaching",
  description:
    "Thoughtful, evidence-based counselling, psychotherapy, and coaching for clarity, connection, resilience, and lasting change.",
  openGraph: {
    title: "Navisamarnath | Counselling, Psychotherapy & Coaching",
    description: "Step into your greater self. Where Aspiration Meets Transformation.",
    type: "website",
    images: [
      {
        url: "/og-home.png",
        width: 1734,
        height: 907,
        alt: "Navisamarnath — Step into your greater self. Where Aspiration Meets Transformation.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navisamarnath | Counselling, Psychotherapy & Coaching",
    description: "Step into your greater self. Where Aspiration Meets Transformation.",
    images: ["/og-home.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
