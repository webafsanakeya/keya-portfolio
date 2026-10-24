import type { Metadata, Viewport } from "next";
import { Inter, Orbitron } from "next/font/google";
import { profile } from "@/lib/data";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-orbitron", display: "swap" });

const description =
  "Portfolio of Afsana Noor Keya, a full-stack developer (Next.js, Node.js, MongoDB, PostgreSQL) and bootcamp career mentor based in Dhaka.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} | Full-Stack Developer`, template: `%s | ${profile.name}` },
  description,
  openGraph: {
    title: `${profile.name} | Full-Stack Developer`,
    description,
    url: profile.siteUrl,
    siteName: profile.name,
    type: "website",
  },
  twitter: { card: "summary", title: `${profile.name} | Full-Stack Developer`, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#050314",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Full-stack developer",
  url: profile.siteUrl,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  worksFor: { "@type": "Organization", name: "Programming Hero" },
  knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL", "FastAPI", "LangGraph"],
  sameAs: [profile.linkedin, profile.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
