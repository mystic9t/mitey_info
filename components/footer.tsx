"use client";

import { useLanguage } from "@/lib/language-context";

const translations = {
  en: {
    tagline: "Helping Indians find government schemes",
    disclaimer: "This is an informational portal. Always verify details on official government websites.",
    links: {
      schemes: "All Schemes",
      checker: "Eligibility Checker",
      about: "About Us",
    },
    madeWith: "Made with care for citizens of India",
  },
  hi: {
    tagline: "भारतीयों को सरकारी योजनाएं खोजने में मदद",
    disclaimer: "यह एक सूचना पोर्टल है। हमेशा आधिकारिक सरकारी वेबसाइटों पर विवरण सत्यापित करें।",
    links: {
      schemes: "सभी योजनाएं",
      checker: "पात्रता परीक्षक",
      about: "हमारे बारे में",
    },
    madeWith: "भारत के नागरिकों के लिए प्यार से बनाया गया",
  },
};

export function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="bg-gradient-to-b from-secondary to-secondary/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="font-bold text-foreground">LocalGovAssist</span>
            </div>
            <p className="text-sm text-muted-foreground">{t.tagline}</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === "en" ? "Quick Links" : "त्वरित लिंक"}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/schemes" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.links.schemes}
                </a>
              </li>
              <li>
                <a href="/checker" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.links.checker}
                </a>
              </li>
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {t.links.about}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {language === "en" ? "Important Notice" : "महत्वपूर्ण सूचना"}
            </h4>
            <p className="text-sm text-muted-foreground">{t.disclaimer}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">{t.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
