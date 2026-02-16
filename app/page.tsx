"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import schemes from "@/data/schemes.json";

const categoryInfo: Record<string, { icon: string; color: string; nameEn: string; nameHi: string }> = {
  agriculture: { icon: "🌾", color: "bg-india-green/10 text-india-green border-india-green/30 hover:bg-india-green/20", nameEn: "Agriculture", nameHi: "कृषि" },
  health: { icon: "🏥", color: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100", nameEn: "Health", nameHi: "स्वास्थ्य" },
  housing: { icon: "🏠", color: "bg-saffron/10 text-saffron border-saffron/30 hover:bg-saffron/20", nameEn: "Housing", nameHi: "आवास" },
  women: { icon: "👩‍👧", color: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100", nameEn: "Women & Child", nameHi: "महिला एवं बाल विकास" },
  financial: { icon: "💰", color: "bg-navy/10 text-navy border-navy/30 hover:bg-navy/20", nameEn: "Financial", nameHi: "वित्तीय" },
  education: { icon: "📚", color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100", nameEn: "Education", nameHi: "शिक्षा" },
};

const translations = {
  en: {
    brand: "Saral Yojana",
    brandHi: "सरल योजना",
    heroTitle: "Find Government Schemes",
    heroTitleHighlight: "You Qualify For",
    heroSubtitle: "Discover central and state government schemes that match your profile",
    ctaChecker: "Check My Eligibility",
    ctaBrowse: "Browse All Schemes",
    categoriesTitle: "Browse by Category",
    schemesCount: "Government Schemes",
  },
  hi: {
    brand: "Saral Yojana",
    brandHi: "सरल योजना",
    heroTitle: "सरकारी योजनाएं खोजें",
    heroTitleHighlight: "जिनके लिए आप पात्र हैं",
    heroSubtitle: "अपनी प्रोफाइल से मेल खाती केंद्र और राज्य सरकार की योजनाएं खोजें",
    ctaChecker: "मेरी पात्रता जांचें",
    ctaBrowse: "सभी योजनाएं देखें",
    categoriesTitle: "श्रेणी के अनुसार ब्राउज़ करें",
    schemesCount: "सरकारी योजनाएं",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const categories = [...new Set(schemes.map((s) => s.category))];

  return (
    <div className="h-[calc(100vh-120px)] overflow-hidden relative bg-white">
      {/* India Map Background - Grey at 25% opacity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/india-map.webp"
          alt=""
          width={1200}
          height={1200}
          className="w-full md:w-[90%] lg:w-[100%] max-w-none md:max-w-4xl h-auto grayscale opacity-[0.25]"
          priority={false}
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/90 pointer-events-none" />

      {/* Main content - centered and scaled for mobile */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in max-w-4xl w-full scale-[0.9] sm:scale-90 md:scale-95 lg:scale-100 origin-center">
          {/* Brand Logo */}
          <div className="flex flex-col items-center mb-4 md:mb-5">
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-saffron to-saffron/80 flex items-center justify-center shadow-xl mb-2 md:mb-3">
              <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-navy">{t.brand}</h2>
            <p className="text-saffron font-medium text-xs md:text-sm">{t.brandHi}</p>
          </div>

          {/* Scheme count badge */}
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-saffron/10 text-saffron rounded-full text-sm md:text-base font-medium mb-4 md:mb-5">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {schemes.length} {t.schemesCount}
          </div>
          
          {/* Hero Title */}
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-navy mb-3 md:mb-4 text-balance leading-tight">
            {t.heroTitle}
            <span className="block text-saffron mt-1 md:mt-2">{t.heroTitleHighlight}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm md:text-xl text-muted-foreground max-w-lg mx-auto mb-5 md:mb-8 text-balance px-2">
            {t.heroSubtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-5 md:mb-8">
            <Link href="/checker" className="btn-primary text-sm md:text-lg px-5 md:px-8 py-2.5 md:py-4">
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.ctaChecker}
            </Link>
            <Link href="/schemes" className="btn-outline text-sm md:text-lg px-5 md:px-8 py-2.5 md:py-4">
              <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              {t.ctaBrowse}
            </Link>
          </div>

          {/* Category Pills */}
          <div className="max-w-2xl mx-auto px-2 md:px-0">
            <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">{t.categoriesTitle}</p>
            <div className="flex flex-wrap justify-center gap-1.5 md:gap-3">
              {categories.map((category) => {
                const info = categoryInfo[category] || { icon: "📋", color: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100", nameEn: category, nameHi: category };
                const count = schemes.filter((s) => s.category === category).length;
                
                return (
                  <Link
                    key={category}
                    href={`/schemes?category=${category}`}
                    className={`category-pill border text-xs md:text-base px-2.5 md:px-4 py-1.5 md:py-2 ${info.color}`}
                  >
                    <span className="text-sm md:text-lg">{info.icon}</span>
                    <span className="font-medium hidden sm:inline">
                      {language === "en" ? info.nameEn : info.nameHi}
                    </span>
                    <span className="opacity-60 text-xs">({count})</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
