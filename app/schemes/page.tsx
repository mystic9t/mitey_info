"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/language-context";
import schemes from "@/data/schemes.json";
import { Scheme } from "@/types/scheme";

const translations = {
  en: {
    title: "All Government Schemes",
    subtitle: "Browse through all available central and state government schemes. Click on any scheme to learn more about eligibility and application process.",
    searchPlaceholder: "Search schemes...",
    allCategories: "All Categories",
    allStates: "All India + All States",
    stateFilterHint: "Filter by state government schemes",
    centralSchemes: "Central Schemes",
    stateSchemes: "State Schemes",
    noResults: "No schemes found matching your criteria.",
    clearFilters: "Clear Filters",
    viewDetails: "View Details",
    eligibility: "Eligibility:",
    required: "Required:",
    notSure: "Not sure which schemes you qualify for?",
    notSureDesc: "Use our eligibility checker to find schemes that match your profile in seconds.",
    checkEligibility: "Check My Eligibility",
  },
  hi: {
    title: "सभी सरकारी योजनाएं",
    subtitle: "उपलब्ध सभी केंद्र और राज्य सरकारी योजनाओं को ब्राउज़ करें। पात्रता और आवेदन प्रक्रिया के बारे में जानने के लिए किसी भी योजना पर क्लिक करें।",
    searchPlaceholder: "योजनाएं खोजें...",
    allStates: "सभी भारत + सभी राज्य",
    stateFilterHint: "राज्य सरकार की योजनाओं के अनुसार फ़िल्टर करें",
    centralSchemes: "केंद्रीय योजनाएं",
    stateSchemes: "राज्य योजनाएं",
    allCategories: "सभी श्रेणियां",
    noResults: "आपके मानदंड से मेल खाती कोई योजना नहीं मिली।",
    clearFilters: "फ़िल्टर साफ़ करें",
    viewDetails: "विवरण देखें",
    eligibility: "पात्रता:",
    required: "आवश्यक:",
    notSure: "नहीं पता आप किन योजनाओं के पात्र हैं?",
    notSureDesc: "सेकंड में अपनी प्रोफाइल से मेल खाती योजनाएं खोजने के लिए हमारा पात्रता परीक्षक उपयोग करें।",
    checkEligibility: "मेरी पात्रता जांचें",
  },
};

const categoryInfo: Record<string, { nameEn: string; nameHi: string; color: string }> = {
  agriculture: { nameEn: "Agriculture", nameHi: "कृषि", color: "bg-green-100 text-green-700 border-green-200" },
  health: { nameEn: "Health", nameHi: "स्वास्थ्य", color: "bg-red-100 text-red-700 border-red-200" },
  housing: { nameEn: "Housing", nameHi: "आवास", color: "bg-orange-100 text-orange-700 border-orange-200" },
  women: { nameEn: "Women & Child", nameHi: "महिला एवं बाल विकास", color: "bg-pink-100 text-pink-700 border-pink-200" },
  financial: { nameEn: "Financial", nameHi: "वित्तीय", color: "bg-blue-100 text-blue-700 border-blue-200" },
  education: { nameEn: "Education", nameHi: "शिक्षा", color: "bg-purple-100 text-purple-700 border-purple-200" },
};

const states = [
  { value: "", labelEn: "All India + All States", labelHi: "सभी भारत + सभी राज्य" },
  { value: "All India", labelEn: "🇮🇳 All India (Central)", labelHi: "🇮🇳 ऑल इंडिया (केंद्रीय)" },
  { value: "Delhi", labelEn: "Delhi", labelHi: "दिल्ली" },
  { value: "Uttar Pradesh", labelEn: "Uttar Pradesh", labelHi: "उत्तर प्रदेश" },
];

function SchemesContent() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedState, setSelectedState] = useState("");

  const t = translations[language];

  const filteredSchemes = useMemo(() => {
    return (schemes as Scheme[]).filter((scheme) => {
      if (selectedCategory && scheme.category !== selectedCategory) {
        return false;
      }

      if (selectedState) {
        if (selectedState === "All India") {
          return scheme.level === "central" || scheme.states.includes("All India");
        }
        return scheme.level === "state" && scheme.states.includes(selectedState);
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const name = language === "en" ? scheme.name : scheme.name_hi;
        const desc = language === "en" ? scheme.description : scheme.description_hi;
        const benefit = language === "en" ? scheme.benefit : scheme.benefit_hi;
        
        if (
          !name.toLowerCase().includes(query) &&
          !desc.toLowerCase().includes(query) &&
          !benefit.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedState, language]);

  const categories = [...new Set(schemes.map((s) => s.category))];

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedState("");
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.title}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      <div className="bg-card border rounded-2xl p-4 md:p-6 shadow-sm">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select-field"
          >
            <option value="">{t.allCategories}</option>
            {categories.map((cat) => {
              const info = categoryInfo[cat];
              return (
                <option key={cat} value={cat}>
                  {language === "en" ? info?.nameEn : info?.nameHi}
                </option>
              );
            })}
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="select-field"
            title={t.stateFilterHint}
          >
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {language === "en" ? state.labelEn : state.labelHi}
              </option>
            ))}
          </select>
        </div>

        {(searchQuery || selectedCategory || selectedState) && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {filteredSchemes.length} {language === "en" ? "schemes found" : "योजनाएं मिलीं"}
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              {t.clearFilters}
            </button>
          </div>
        )}
      </div>

      {filteredSchemes.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            const info = categoryInfo[scheme.category];
            
            return (
              <Link
                key={scheme.id}
                href={`/schemes/${scheme.id}`}
                className="scheme-card group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`badge-category ${info?.color || 'bg-gray-100 text-gray-700'}`}>
                    {language === "en" ? info?.nameEn : info?.nameHi}
                  </span>
                  {scheme.level === "central" ? (
                    <span className="text-xs text-muted-foreground">🇮🇳 All India</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">🏛️ {scheme.states[0]}</span>
                  )}
                </div>
                
                <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {language === "en" ? scheme.name : scheme.name_hi}
                </h2>
                
                <p className="text-sm text-muted-foreground mb-4">
                  {language === "en" ? scheme.benefit : scheme.benefit_hi}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-foreground shrink-0">{t.eligibility}</span>
                    <span className="text-muted-foreground line-clamp-1">
                      {language === "en" ? scheme.eligibility_text : scheme.eligibility_text_hi}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-foreground shrink-0">{t.required}</span>
                    <span className="text-muted-foreground line-clamp-1">
                      {(language === "en" ? scheme.documents : scheme.documents_hi).slice(0, 2).join(", ")}
                      {scheme.documents.length > 2 && "..."}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t flex items-center justify-between">
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    {t.viewDetails}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-secondary/50 rounded-2xl">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-muted-foreground mb-4">{t.noResults}</p>
          <button onClick={clearFilters} className="btn-primary">
            {t.clearFilters}
          </button>
        </div>
      )}

      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.notSure}</h2>
        <p className="text-muted-foreground mb-6">{t.notSureDesc}</p>
        <Link href="/checker" className="btn-primary">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.checkEligibility}
        </Link>
      </div>
    </div>
  );
}

export default function SchemesPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const categories = [...new Set(schemes.map((s) => s.category))];

  return (
    <Suspense fallback={
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.slice(0, 6).map((scheme) => (
            <div key={scheme.id} className="scheme-card animate-pulse">
              <div className="h-4 bg-muted rounded w-1/3 mb-3"></div>
              <div className="h-6 bg-muted rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-4"></div>
            </div>
          ))}
        </div>
      </div>
    }>
      <SchemesContent />
    </Suspense>
  );
}
