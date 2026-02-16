import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Saral Yojana - Find Government Schemes You Qualify For | सरल योजना",
  description: "Discover central and state government schemes you qualify for. Simple, fast, and available in Hindi and English. सरकारी योजनाएं खोजें।",
  keywords: "government schemes, India, Sarkari Yojana, सरकारी योजना, PM Kisan, Ayushman Bharat, PM Awas Yojana, eligibility checker, yojana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
return (
      <html lang="en" suppressHydrationWarning>
        <body className="min-h-screen flex flex-col bg-background font-sans antialiased">
          <LanguageProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    );
}
