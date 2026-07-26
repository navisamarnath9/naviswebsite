import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Maya Rhodes | Clinical Psychologist",
  description:
    "Compassionate, evidence-based online therapy for anxiety, relationships, burnout, and life transitions across New York.",
  openGraph: {
    title: "Dr. Maya Rhodes | Clinical Psychologist",
    description:
      "A softer place to land. A clearer way forward. Online therapy across New York.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Dr. Maya Rhodes — A softer place to land. A clearer way forward.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Maya Rhodes | Clinical Psychologist",
    description:
      "A softer place to land. A clearer way forward. Online therapy across New York.",
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
