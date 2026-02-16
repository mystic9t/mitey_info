"use client";

import { useLanguage } from "@/lib/language-context";
import { TricolorDivider } from "./tricolor-divider";

const translations = {
  en: {
    tagline: "Simple access to government schemes for every Indian",
    disclaimer: "Informational portal. Verify on official government websites.",
  },
  hi: {
    tagline: "हर भारतीय के लिए सरकारी योजनाओं तक सरल पहुंच",
    disclaimer: "सूचना पोर्टल। आधिकारिक सरकारी वेबसाइटों पर सत्यापित करें।",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="sticky bottom-0 z-40">
      <div className="bg-india-green text-white">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-saffron flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="font-semibold">Saral Yojana</span>
              <span className="text-saffron hidden sm:inline">| सरल योजना</span>
            </div>
            <p className="text-white/80 text-center">{t.tagline}</p>
            <p className="text-white/60 hidden md:block">{t.disclaimer}</p>
          </div>
        </div>
      </div>
      <TricolorDivider thickness={3} />
    </footer>
  );
}
