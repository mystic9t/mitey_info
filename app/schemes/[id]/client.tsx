"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { Scheme } from "@/types/scheme";

const translations = {
  en: {
    home: "Home",
    schemes: "Schemes",
    benefit: "Benefit",
    applicationStatus: "Application Status",
    whoCanApply: "Who Can Apply?",
    occupation: "Occupation:",
    ageRequirement: "Age Requirement:",
    minimum: "Minimum",
    years: "years",
    incomeLimit: "Income Limit:",
    upTo: "Up to",
    perYear: "per year",
    landHolding: "Land Holding:",
    lessThan: "Less than",
    hectares: "hectares",
    requiredDocuments: "Required Documents",
    howToApply: "How to Apply",
    officialInformation: "Official Information",
    officialWebsite: "Official Website",
    applyOnline: "Apply online here",
    helpline: "Helpline",
    important: "Important:",
    disclaimer: "This information is for guidance only. Please verify all details on the official government website before applying. Eligibility criteria and documents may vary by state.",
    availableIn: "Available in",
    checkEligibility: "Check Eligibility",
  },
  hi: {
    home: "होम",
    schemes: "योजनाएं",
    benefit: "लाभ",
    applicationStatus: "आवेदन स्थिति",
    whoCanApply: "कौन आवेदन कर सकता है?",
    occupation: "व्यवसाय:",
    ageRequirement: "आयु आवश्यकता:",
    minimum: "न्यूनतम",
    years: "वर्ष",
    incomeLimit: "आय सीमा:",
    upTo: "तक",
    perYear: "प्रति वर्ष",
    landHolding: "भूमि धारण:",
    lessThan: "से कम",
    hectares: "हेक्टेयर",
    requiredDocuments: "आवश्यक दस्तावेज",
    howToApply: "आवेदन कैसे करें",
    officialInformation: "आधिकारिक जानकारी",
    officialWebsite: "आधिकारिक वेबसाइट",
    applyOnline: "यहां ऑनलाइन आवेदन करें",
    helpline: "हेल्पलाइन",
    important: "महत्वपूर्ण:",
    disclaimer: "यह जानकारी केवल मार्गदर्शन के लिए है। कृपया आवेदन करने से पहले आधिकारिक सरकारी वेबसाइट पर सभी विवरण सत्यापित करें। पात्रता मानदंड और दस्तावेज राज्य के अनुसार भिन्न हो सकते हैं।",
    availableIn: "उपलब्ध",
    checkEligibility: "पात्रता जांचें",
  },
};

const categoryInfo: Record<string, { nameEn: string; nameHi: string; color: string; icon: string }> = {
  agriculture: { nameEn: "Agriculture", nameHi: "कृषि", color: "bg-green-100 text-green-700", icon: "🌾" },
  health: { nameEn: "Health", nameHi: "स्वास्थ्य", color: "bg-red-100 text-red-700", icon: "🏥" },
  housing: { nameEn: "Housing", nameHi: "आवास", color: "bg-orange-100 text-orange-700", icon: "🏠" },
  women: { nameEn: "Women & Child", nameHi: "महिला एवं बाल विकास", color: "bg-pink-100 text-pink-700", icon: "👩‍👧" },
  financial: { nameEn: "Financial", nameHi: "वित्तीय", color: "bg-blue-100 text-blue-700", icon: "💰" },
  education: { nameEn: "Education", nameHi: "शिक्षा", color: "bg-purple-100 text-purple-700", icon: "📚" },
};

interface SchemeDetailClientProps {
  scheme: Scheme;
}

export default function SchemeDetailClient({ scheme }: SchemeDetailClientProps) {
  const { language } = useLanguage();
  const t = translations[language];

  const info = categoryInfo[scheme.category] || { nameEn: scheme.category, nameHi: scheme.category, color: "bg-gray-100 text-gray-700", icon: "📋" };

  const name = language === "en" ? scheme.name : scheme.name_hi;
  const description = language === "en" ? scheme.description : scheme.description_hi;
  const benefit = language === "en" ? scheme.benefit : scheme.benefit_hi;
  const eligibilityText = language === "en" ? scheme.eligibility_text : scheme.eligibility_text_hi;
  const documents = language === "en" ? scheme.documents : scheme.documents_hi;
  const steps = language === "en" ? scheme.application_steps : scheme.application_steps_hi;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 bg-secondary/50 rounded-lg px-4 py-2">
        <Link href="/" className="hover:text-primary transition-colors">{t.home}</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/schemes" className="hover:text-primary transition-colors">{t.schemes}</Link>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-foreground font-medium truncate">{name}</span>
      </nav>

      <div className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent rounded-3xl p-8 mb-8">
        <div className="flex items-start gap-4 mb-6">
          <span className={`badge-category ${info.color}`}>
            {language === "en" ? info.nameEn : info.nameHi}
          </span>
          {scheme.states.includes("All India") && (
            <span className="badge-category bg-blue-50 text-blue-700 border border-blue-200">
              🇮🇳 All India
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{name}</h1>
        <p className="text-xl text-muted-foreground mb-6">{description}</p>

        <div className="flex flex-wrap gap-3">
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {t.officialWebsite}
          </a>
          <Link href="/checker" className="btn-outline">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.checkEligibility}
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold opacity-90">{t.benefit}</h2>
          </div>
          <p className="text-2xl font-bold">{benefit}</p>
        </div>

        <div className="bg-secondary rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-foreground">{t.applicationStatus}</h2>
          </div>
          <p className="text-xl font-bold text-green-600">{scheme.deadline}</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{t.whoCanApply}</h2>
        <div className="bg-card border rounded-2xl p-6">
          <p className="text-lg text-foreground mb-6">{eligibilityText}</p>

          <div className="grid md:grid-cols-2 gap-4">
            {scheme.eligibility.occupation && scheme.eligibility.occupation.length > 0 && (
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{t.occupation}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {scheme.eligibility.occupation.map((occ) => (
                      <span key={occ} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium capitalize">
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {scheme.eligibility.age_min && (
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{t.ageRequirement}</h3>
                  <p className="text-muted-foreground mt-1">
                    {t.minimum} {scheme.eligibility.age_min} {t.years}
                  </p>
                </div>
              </div>
            )}

            {scheme.eligibility.income_max && typeof scheme.eligibility.income_max === "number" && (
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{t.incomeLimit}</h3>
                  <p className="text-muted-foreground mt-1">
                    {t.upTo} ₹{scheme.eligibility.income_max.toLocaleString()} {t.perYear}
                  </p>
                </div>
              </div>
            )}

            {scheme.eligibility.landholding_max && (
              <div className="flex items-start gap-3 p-4 bg-secondary rounded-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{t.landHolding}</h3>
                  <p className="text-muted-foreground mt-1">
                    {t.lessThan} {scheme.eligibility.landholding_max} {t.hectares}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{t.requiredDocuments}</h2>
        <div className="bg-card border rounded-2xl p-6">
          <ul className="grid md:grid-cols-2 gap-3">
            {documents.map((doc, index) => (
              <li key={index} className="flex items-center gap-3 p-3 bg-secondary rounded-xl">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-foreground">{doc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{t.howToApply}</h2>
        <div className="bg-card border rounded-2xl p-6">
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md shadow-primary/20">
                  {index + 1}
                </span>
                <span className="pt-2 text-foreground">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">{t.officialInformation}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href={scheme.official_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all group"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <div>
              <div className="font-semibold">{t.officialWebsite}</div>
              <div className="text-sm opacity-90">{t.applyOnline}</div>
            </div>
          </a>

          <a
            href={`tel:${scheme.helpline}`}
            className="flex items-center gap-4 p-5 bg-secondary rounded-2xl hover:bg-secondary/80 transition-all group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-foreground">{t.helpline}</div>
              <div className="text-sm text-muted-foreground">{scheme.helpline}</div>
            </div>
          </a>
        </div>
      </section>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-amber-800 mb-1">{t.important}</p>
            <p className="text-sm text-amber-700">{t.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
