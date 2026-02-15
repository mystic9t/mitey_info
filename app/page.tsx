"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import schemes from "@/data/schemes.json";
import { Scheme } from "@/types/scheme";

const categoryInfo: Record<string, { icon: string; color: string; nameEn: string; nameHi: string }> = {
  agriculture: { icon: "🌾", color: "bg-green-100 text-green-700 border-green-200", nameEn: "Agriculture", nameHi: "कृषि" },
  health: { icon: "🏥", color: "bg-red-100 text-red-700 border-red-200", nameEn: "Health", nameHi: "स्वास्थ्य" },
  housing: { icon: "🏠", color: "bg-orange-100 text-orange-700 border-orange-200", nameEn: "Housing", nameHi: "आवास" },
  women: { icon: "👩‍👧", color: "bg-pink-100 text-pink-700 border-pink-200", nameEn: "Women & Child", nameHi: "महिला एवं बाल विकास" },
  financial: { icon: "💰", color: "bg-blue-100 text-blue-700 border-blue-200", nameEn: "Financial", nameHi: "वित्तीय" },
  education: { icon: "📚", color: "bg-purple-100 text-purple-700 border-purple-200", nameEn: "Education", nameHi: "शिक्षा" },
};

const translations = {
  en: {
    heroTitle: "Find Government Schemes",
    heroTitleHighlight: "You Qualify For",
    heroSubtitle: "Discover central and state government schemes that match your profile. Simple, fast, and free.",
    ctaChecker: "Check My Eligibility",
    ctaBrowse: "Browse All Schemes",
    categoriesTitle: "Browse by Category",
    categoriesSubtitle: "Explore schemes across different sectors",
    featuredTitle: "Popular Schemes",
    featuredSubtitle: "Most accessed government schemes",
    viewAll: "View All Schemes",
    howItWorksTitle: "How It Works",
    step1Title: "Enter Your Details",
    step1Desc: "Tell us about your age, occupation, income and location",
    step2Title: "Get Instant Matches",
    step2Desc: "We check which schemes you qualify for in seconds",
    step3Title: "Apply Easily",
    step3Desc: "Get step-by-step instructions to apply for each scheme",
    schemesCount: "schemes",
    learnMore: "Learn more",
  },
  hi: {
    heroTitle: "सरकारी योजनाएं खोजें",
    heroTitleHighlight: "जिनके लिए आप पात्र हैं",
    heroSubtitle: "अपनी प्रोफाइल से मेल खाती केंद्र और राज्य सरकार की योजनाएं खोजें। सरल, तेज और मुफ्त।",
    ctaChecker: "मेरी पात्रता जांचें",
    ctaBrowse: "सभी योजनाएं देखें",
    categoriesTitle: "श्रेणी के अनुसार ब्राउज़ करें",
    categoriesSubtitle: "विभिन्न क्षेत्रों में योजनाओं का अन्वेषण करें",
    featuredTitle: "लोकप्रिय योजनाएं",
    featuredSubtitle: "सबसे अधिक उपयोग की जाने वाली सरकारी योजनाएं",
    viewAll: "सभी योजनाएं देखें",
    howItWorksTitle: "यह कैसे काम करता है",
    step1Title: "अपना विवरण दर्ज करें",
    step1Desc: "अपनी आयु, पेशा, आय और स्थान के बारे में बताएं",
    step2Title: "तुरंत मिलान प्राप्त करें",
    step2Desc: "हम सेकंड में जांचते हैं कि आप किन योजनाओं के पात्र हैं",
    step3Title: "आसानी से आवेदन करें",
    step3Desc: "प्रत्येक योजना के लिए चरण-दर-चरण निर्देश प्राप्त करें",
    schemesCount: "योजनाएं",
    learnMore: "और जानें",
  },
};

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];
  const categories = [...new Set(schemes.map((s) => s.category))];

  return (
    <div className="space-y-16">
      <section className="hero-pattern rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {language === "en" ? "18+ Government Schemes" : "18+ सरकारी योजनाएं"}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            {t.heroTitle}
            <span className="block text-primary mt-2">{t.heroTitleHighlight}</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            {t.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checker" className="btn-primary text-lg px-8 py-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {t.ctaChecker}
            </Link>
            <Link href="/schemes" className="btn-secondary text-lg px-8 py-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              {t.ctaBrowse}
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t.categoriesTitle}</h2>
          <p className="text-muted-foreground">{t.categoriesSubtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const info = categoryInfo[category] || { icon: "📋", color: "bg-gray-100 text-gray-700 border-gray-200", nameEn: category, nameHi: category };
            const count = schemes.filter((s) => s.category === category).length;
            
            return (
              <Link
                key={category}
                href={`/schemes?category=${category}`}
                className={`group p-6 rounded-xl border ${info.color} card-hover text-center`}
              >
                <div className="text-3xl mb-3">{info.icon}</div>
                <h3 className="font-semibold text-sm mb-1">
                  {language === "en" ? info.nameEn : info.nameHi}
                </h3>
                <p className="text-xs opacity-70">{count} {t.schemesCount}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t.featuredTitle}</h2>
          <p className="text-muted-foreground">{t.featuredSubtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(schemes as Scheme[]).slice(0, 6).map((scheme) => {
            const info = categoryInfo[scheme.category] || { icon: "📋", color: "bg-gray-100 text-gray-700" };
            
            return (
              <Link
                key={scheme.id}
                href={`/schemes/${scheme.id}`}
                className="scheme-card group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`badge-category ${info.color}`}>
                    {language === "en" ? info.nameEn : info.nameHi}
                  </span>
                  <div className="text-2xl">{info.icon}</div>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {language === "en" ? scheme.name : scheme.name_hi}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {language === "en" ? scheme.benefit : scheme.benefit_hi}
                </p>
                
                <div className="flex items-center gap-2 text-primary text-sm font-medium">
                  {t.learnMore}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="text-center mt-10">
          <Link href="/schemes" className="btn-outline">
            {t.viewAll}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-br from-secondary to-secondary/50 rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">{t.howItWorksTitle}</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: 1, title: t.step1Title, desc: t.step1Desc, icon: "📝" },
            { step: 2, title: t.step2Title, desc: t.step2Desc, icon: "⚡" },
            { step: 3, title: t.step3Title, desc: t.step3Desc, icon: "🎯" },
          ].map((item) => (
            <div key={item.step} className="relative text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-3xl mx-auto mb-4">
                {item.icon}
              </div>
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                {item.step}
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2 mt-4">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
