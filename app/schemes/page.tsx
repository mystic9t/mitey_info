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
    subtitle: "Browse through all available central and state government schemes.",
    searchPlaceholder: "Search schemes...",
    allCategories: "All Categories",
    allStates: "All India + All States",
    stateFilterHint: "Filter by state government schemes",
    noResults: "No schemes found matching your criteria.",
    clearFilters: "Clear Filters",
    viewDetails: "View",
    eligibility: "Eligibility:",
    required: "Required:",
    notSure: "Not sure which schemes you qualify for?",
    notSureDesc: "Use our eligibility checker to find schemes that match your profile.",
    checkEligibility: "Check My Eligibility",
    compactView: "List",
    gridView: "Cards",
    schemesFound: "schemes",
    category: "Category",
    scheme: "Scheme",
    benefit: "Benefit",
    location: "Location",
  },
  hi: {
    title: "सभी सरकारी योजनाएं",
    subtitle: "उपलब्ध सभी केंद्र और राज्य सरकारी योजनाओं को ब्राउज़ करें।",
    searchPlaceholder: "योजनाएं खोजें...",
    allStates: "सभी भारत + सभी राज्य",
    stateFilterHint: "राज्य सरकार की योजनाओं के अनुसार फ़िल्टर करें",
    allCategories: "सभी श्रेणियां",
    noResults: "आपके मानदंड से मेल खाती कोई योजना नहीं मिली।",
    clearFilters: "फ़िल्टर साफ़ करें",
    viewDetails: "देखें",
    eligibility: "पात्रता:",
    required: "आवश्यक:",
    notSure: "नहीं पता आप किन योजनाओं के पात्र हैं?",
    notSureDesc: "अपनी प्रोफाइल से मेल खाती योजनाएं खोजने के लिए पात्रता परीक्षक उपयोग करें।",
    checkEligibility: "मेरी पात्रता जांचें",
    compactView: "सूची",
    gridView: "कार्ड",
    schemesFound: "योजनाएं",
    category: "श्रेणी",
    scheme: "योजना",
    benefit: "लाभ",
    location: "स्थान",
  },
};

const categoryInfo: Record<string, { nameEn: string; nameHi: string; color: string; borderColor: string }> = {
  agriculture: { nameEn: "Agriculture", nameHi: "कृषि", color: "bg-india-green/10 text-india-green border-india-green/30", borderColor: "bg-india-green" },
  health: { nameEn: "Health", nameHi: "स्वास्थ्य", color: "bg-red-50 text-red-700 border-red-200", borderColor: "bg-red-500" },
  housing: { nameEn: "Housing", nameHi: "आवास", color: "bg-saffron/10 text-saffron border-saffron/30", borderColor: "bg-saffron" },
  women: { nameEn: "Women & Child", nameHi: "महिला एवं बाल विकास", color: "bg-pink-50 text-pink-700 border-pink-200", borderColor: "bg-pink-500" },
  financial: { nameEn: "Financial", nameHi: "वित्तीय", color: "bg-navy/10 text-navy border-navy/30", borderColor: "bg-navy" },
  education: { nameEn: "Education", nameHi: "शिक्षा", color: "bg-purple-50 text-purple-700 border-purple-200", borderColor: "bg-purple-500" },
};

const states = [
  { value: "", labelEn: "All India + All States", labelHi: "सभी भारत + सभी राज्य" },
  { value: "All India", labelEn: "All India (Central)", labelHi: "ऑल इंडिया (केंद्रीय)" },
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
  const [isCompact, setIsCompact] = useState(false);

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
    <div className="px-3 md:px-6 lg:px-8 space-y-4 md:space-y-6">
      <div className="text-center pt-2">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-1">{t.title}</h1>
        <p className="text-xs md:text-sm text-muted-foreground">{t.subtitle}</p>
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-2.5 md:p-3 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-1.5 md:gap-2">
            <div className="relative flex-1">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-8 pr-3 py-2 text-xs md:text-sm border rounded-md focus:ring-1 focus:ring-saffron/20 focus:border-saffron focus:outline-none"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs md:text-sm py-2 px-2.5 border rounded-md focus:ring-1 focus:ring-saffron/20 focus:border-saffron focus:outline-none bg-white min-w-0"
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
              className="text-xs md:text-sm py-2 px-2.5 border rounded-md focus:ring-1 focus:ring-saffron/20 focus:border-saffron focus:outline-none bg-white min-w-0"
            >
              {states.map((state) => (
                <option key={state.value} value={state.value}>
                  {language === "en" ? state.labelEn : state.labelHi}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-1.5 border-t">
            <p className="text-[10px] md:text-xs text-muted-foreground">
              {filteredSchemes.length} {t.schemesFound}
            </p>
            
            <div className="flex items-center gap-1.5 md:gap-2">
              <button
                onClick={() => setIsCompact(!isCompact)}
                className={`flex items-center gap-1 px-2 py-1 text-[10px] md:text-xs font-medium rounded transition-all ${
                  isCompact 
                    ? "bg-saffron text-white" 
                    : "bg-secondary text-foreground hover:bg-saffron/10"
                }`}
              >
                {isCompact ? (
                  <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                    {t.gridView}
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    {t.compactView}
                  </>
                )}
              </button>
              
              {(searchQuery || selectedCategory || selectedState) && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] md:text-xs text-saffron hover:underline"
                >
                  {t.clearFilters}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {filteredSchemes.length > 0 ? (
        isCompact ? (
          /* Compact Table View */
          <div className="overflow-x-auto -mx-3 md:mx-0">
            <table className="w-full text-xs md:text-sm">
              <thead className="bg-secondary/50 border-y">
                <tr>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground whitespace-nowrap">{t.category}</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground min-w-[180px]">{t.scheme}</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground hidden md:table-cell min-w-[200px]">{t.benefit}</th>
                  <th className="text-left py-2 px-3 font-medium text-muted-foreground whitespace-nowrap">{t.location}</th>
                  <th className="py-2 px-3 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredSchemes.map((scheme) => {
                  const info = categoryInfo[scheme.category];
                  return (
                    <tr key={scheme.id} className="hover:bg-saffron/5 transition-colors">
                      <td className="py-2 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] md:text-xs ${info?.color || 'bg-gray-100 text-gray-700'}`}>
                          {language === "en" ? info?.nameEn : info?.nameHi}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <Link 
                          href={`/schemes/${scheme.id}`}
                          className="font-medium text-foreground hover:text-saffron transition-colors line-clamp-1"
                        >
                          {language === "en" ? scheme.name : scheme.name_hi}
                        </Link>
                      </td>
                      <td className="py-2 px-3 text-muted-foreground hidden md:table-cell line-clamp-1">
                        {language === "en" ? scheme.benefit : scheme.benefit_hi}
                      </td>
                      <td className="py-2 px-3 text-muted-foreground whitespace-nowrap">
                        {scheme.level === "central" ? "🇮🇳 India" : scheme.states[0]}
                      </td>
                      <td className="py-2 px-3 text-right">
                        <Link
                          href={`/schemes/${scheme.id}`}
                          className="text-saffron hover:text-saffron/80"
                        >
                          <svg className="w-3.5 h-3.5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* Card Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {filteredSchemes.map((scheme) => {
              const info = categoryInfo[scheme.category];
              return (
                <Link
                  key={scheme.id}
                  href={`/schemes/${scheme.id}`}
                  className="relative bg-card border rounded-lg p-3 md:p-4 hover:shadow-md transition-all group overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-0.5 h-full ${info?.borderColor || 'bg-gray-400'}`} />
                  
                  <div className="flex justify-between items-start mb-1.5 gap-1">
                    <span className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded ${info?.color || 'bg-gray-100 text-gray-700'}`}>
                      {language === "en" ? info?.nameEn : info?.nameHi}
                    </span>
                    <span className="text-[10px] md:text-xs text-muted-foreground shrink-0">
                      {scheme.level === "central" ? "🇮🇳" : scheme.states[0]}
                    </span>
                  </div>
                  
                  <h3 className="text-xs md:text-sm font-semibold text-foreground mb-1 group-hover:text-saffron transition-colors line-clamp-2">
                    {language === "en" ? scheme.name : scheme.name_hi}
                  </h3>
                  
                  <p className="text-[10px] md:text-xs text-muted-foreground line-clamp-2 mb-2">
                    {language === "en" ? scheme.benefit : scheme.benefit_hi}
                  </p>
                  
                  <div className="flex items-center justify-end">
                    <span className="text-[10px] md:text-xs font-medium text-saffron flex items-center gap-0.5">
                      {t.viewDetails}
                      <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      ) : (
        <div className="text-center py-8 bg-secondary/50 rounded-lg">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-muted-foreground mb-2 text-xs md:text-sm">{t.noResults}</p>
          <button onClick={clearFilters} className="btn-primary text-xs md:text-sm px-4 py-2">
            {t.clearFilters}
          </button>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-saffron/5 to-saffron/10 border border-saffron/20 rounded-lg p-4 md:p-6 text-center mb-4">
        <h2 className="text-base md:text-lg font-bold text-foreground mb-1">{t.notSure}</h2>
        <p className="text-xs md:text-sm text-muted-foreground mb-3">{t.notSureDesc}</p>
        <Link href="/checker" className="btn-primary text-xs md:text-sm px-4 md:px-5 py-2 md:py-2.5">
          <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

  return (
    <Suspense fallback={
      <div className="px-4 space-y-4">
        <div className="text-center pt-2">
          <h1 className="text-xl font-bold text-foreground mb-1">{t.title}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {schemes.slice(0, 6).map((scheme) => (
            <div key={scheme.id} className="bg-card border rounded-lg p-3 animate-pulse">
              <div className="h-2 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-muted rounded w-2/3 mb-1"></div>
              <div className="h-2 bg-muted rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    }>
      <SchemesContent />
    </Suspense>
  );
}