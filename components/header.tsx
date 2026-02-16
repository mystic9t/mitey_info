"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { useState } from "react";
import { TricolorDivider } from "./tricolor-divider";

const translations = {
  en: {
    brand: "Saral Yojana",
    brandHi: "सरल योजना",
    allSchemes: "All Schemes",
    checkEligibility: "Check Eligibility",
    about: "About",
    searchPlaceholder: "Search schemes...",
    search: "Search",
  },
  hi: {
    brand: "Saral Yojana",
    brandHi: "सरल योजना",
    allSchemes: "सभी योजनाएं",
    checkEligibility: "पात्रता जांचें",
    about: "हमारे बारे में",
    searchPlaceholder: "योजनाएं खोजें...",
    search: "खोजें",
  },
};

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const texts = translations[language];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <TricolorDivider thickness={3} />
      <div className="bg-saffron text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy to-navy/80 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-navy">
                  {texts.brand}
                </span>
                <span className="text-xs text-navy/80 leading-tight">
                  {texts.brandHi}
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/schemes"
                className="px-4 py-2 text-sm font-medium text-white/90 hover:text-navy hover:bg-white/20 rounded-lg transition-colors"
              >
                {texts.allSchemes}
              </Link>
              <Link
                href="/checker"
                className="px-4 py-2 text-sm font-medium text-white/90 hover:text-navy hover:bg-white/20 rounded-lg transition-colors"
              >
                {texts.checkEligibility}
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-sm font-medium text-white/90 hover:text-navy hover:bg-white/20 rounded-lg transition-colors"
              >
                {texts.about}
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    language === "en"
                      ? "bg-navy text-white shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("hi")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    language === "hi"
                      ? "bg-navy text-white shadow-sm"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  हिं
                </button>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden absolute top-full right-0 w-48 bg-saffron shadow-lg animate-fade-in z-50 rounded-bl-lg">
            <div className="px-4 py-3">
              <div className="flex flex-col gap-1">
                <Link
                  href="/schemes"
                  className="px-4 py-3 text-sm font-medium text-white/90 hover:text-navy hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {texts.allSchemes}
                </Link>
                <Link
                  href="/checker"
                  className="px-4 py-3 text-sm font-medium text-white/90 hover:text-navy hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {texts.checkEligibility}
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-3 text-sm font-medium text-white/90 hover:text-navy hover:bg-white/10 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {texts.about}
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
