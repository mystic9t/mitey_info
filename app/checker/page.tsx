"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import schemes from "@/data/schemes.json";
import { Scheme } from "@/types/scheme";

const translations = {
  en: {
    title: "Check Your Eligibility",
    subtitle: "Answer a few simple questions to find schemes you qualify for",
    ageLabel: "Your Age",
    agePlaceholder: "Enter your age",
    occupationLabel: "Occupation",
    occupationPlaceholder: "Select occupation",
    incomeLabel: "Annual Family Income",
    incomePlaceholder: "Select income range",
    genderLabel: "Gender",
    genderPlaceholder: "Select gender",
    landLabel: "Land Holding (Hectares)",
    landPlaceholder: "Select land holding",
    checkButton: "Find Matching Schemes",
    checkingButton: "Checking...",
    foundTitle: "Found {count} scheme{plural} for you",
    noMatchTitle: "No matching schemes found",
    foundSubtitle: "Based on your profile, you may be eligible for these schemes:",
    noMatchSubtitle: "Based on your current profile, we couldn't find matching schemes. Try adjusting your criteria or browse all schemes.",
    checkAgain: "Check Again",
    browseAll: "Browse All Schemes",
    viewDetails: "View Details",
  },
  hi: {
    title: "अपनी पात्रता जांचें",
    subtitle: "जिन योजनाओं के लिए आप पात्र हैं, उन्हें खोजने के लिए कुछ सरल प्रश्नों के उत्तर दें",
    ageLabel: "आपकी आयु",
    agePlaceholder: "अपनी आयु दर्ज करें",
    occupationLabel: "पेशा",
    occupationPlaceholder: "पेशा चुनें",
    incomeLabel: "वार्षिक पारिवारिक आय",
    incomePlaceholder: "आय सीमा चुनें",
    genderLabel: "लिंग",
    genderPlaceholder: "लिंग चुनें",
    landLabel: "भूमि धारण (हेक्टेयर)",
    landPlaceholder: "भूमि धारण चुनें",
    checkButton: "मिलान योजनाएं खोजें",
    checkingButton: "जांच रहा है...",
    foundTitle: "आपके लिए {count} योजना{plural} मिली",
    noMatchTitle: "कोई मिलान योजना नहीं मिली",
    foundSubtitle: "आपकी प्रोफाइल के आधार पर, आप इन योजनाओं के लिए पात्र हो सकते हैं:",
    noMatchSubtitle: "आपकी वर्तमान प्रोफाइल के आधार पर, हमें मिलान योजनाएं नहीं मिलीं। अपने मानदंड समायोजित करें या सभी योजनाएं ब्राउज़ करें।",
    checkAgain: "फिर से जांचें",
    browseAll: "सभी योजनाएं देखें",
    viewDetails: "विवरण देखें",
  },
};

const occupations = {
  en: [
    { value: "farmer", label: "Farmer" },
    { value: "worker", label: "Laborer" },
    { value: "employee", label: "Salaried Employee" },
    { value: "self-employed", label: "Self Employed" },
    { value: "student", label: "Student" },
    { value: "unemployed", label: "Unemployed" },
    { value: "retired", label: "Retired" },
  ],
  hi: [
    { value: "farmer", label: "किसान" },
    { value: "worker", label: "मजदूर" },
    { value: "employee", label: "नौकरीपेशा" },
    { value: "self-employed", label: "स्वरोजगार" },
    { value: "student", label: "छात्र" },
    { value: "unemployed", label: "बेरोजगार" },
    { value: "retired", label: "सेवानिवृत्त" },
  ],
};

const incomeRanges = {
  en: [
    { value: "0", label: "Below ₹1 lakh" },
    { value: "100000", label: "₹1-2 lakh" },
    { value: "200000", label: "₹2-3 lakh" },
    { value: "300000", label: "₹3-5 lakh" },
    { value: "500000", label: "₹5-10 lakh" },
    { value: "1000000", label: "₹10-18 lakh" },
    { value: "1800000", label: "Above ₹18 lakh" },
  ],
  hi: [
    { value: "0", label: "₹1 लाख से कम" },
    { value: "100000", label: "₹1-2 लाख" },
    { value: "200000", label: "₹2-3 लाख" },
    { value: "300000", label: "₹3-5 लाख" },
    { value: "500000", label: "₹5-10 लाख" },
    { value: "1000000", label: "₹10-18 लाख" },
    { value: "1800000", label: "₹18 लाख से अधिक" },
  ],
};

const genderOptions = {
  en: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ],
  hi: [
    { value: "male", label: "पुरुष" },
    { value: "female", label: "महिला" },
  ],
};

const landOptions = {
  en: [
    { value: "0", label: "No land" },
    { value: "1", label: "Less than 1 hectare" },
    { value: "2", label: "1-2 hectares" },
    { value: "5", label: "More than 2 hectares" },
  ],
  hi: [
    { value: "0", label: "कोई भूमि नहीं" },
    { value: "1", label: "1 हेक्टेयर से कम" },
    { value: "2", label: "1-2 हेक्टेयर" },
    { value: "5", label: "2 हेक्टेयर से अधिक" },
  ],
};

export default function CheckerPage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    age: "",
    occupation: "",
    income: "",
    gender: "",
    landholding: "",
  });
  const [results, setResults] = useState<Scheme[] | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkEligibility = () => {
    setIsChecking(true);
    
    const age = parseInt(formData.age) || 0;
    const income = parseInt(formData.income) || 0;
    const occupation = formData.occupation;
    const gender = formData.gender;
    const landholding = parseFloat(formData.landholding) || 0;

    const matched = (schemes as Scheme[]).filter((scheme) => {
      if (scheme.eligibility.age_min && age < scheme.eligibility.age_min) {
        return false;
      }

      if (scheme.eligibility.occupation && 
          scheme.eligibility.occupation.length > 0 &&
          !scheme.eligibility.occupation.includes(occupation)) {
        return false;
      }

      if (scheme.eligibility.income_max && income > scheme.eligibility.income_max) {
        return false;
      }

      if (scheme.eligibility.gender && scheme.eligibility.gender !== gender) {
        return false;
      }

      if (scheme.eligibility.landholding_max && landholding >= scheme.eligibility.landholding_max) {
        return false;
      }

      return true;
    });

    setResults(matched);
    setIsChecking(false);
  };

  const categoryColors: Record<string, string> = {
    agriculture: "bg-green-100 text-green-700",
    health: "bg-red-100 text-red-700",
    housing: "bg-orange-100 text-orange-700",
    women: "bg-pink-100 text-pink-700",
    financial: "bg-blue-100 text-blue-700",
    education: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {language === "en" ? "Free & Instant" : "मुफ्त और तत्काल"}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {!results ? (
        <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-foreground mb-2">{t.ageLabel}</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder={t.agePlaceholder}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">{t.genderLabel}</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="select-field"
                >
                  <option value="">{t.genderPlaceholder}</option>
                  {genderOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-foreground mb-2">{t.occupationLabel}</label>
              <select
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="select-field"
              >
                <option value="">{t.occupationPlaceholder}</option>
                {occupations[language].map((occ) => (
                  <option key={occ.value} value={occ.value}>{occ.label}</option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-foreground mb-2">{t.incomeLabel}</label>
                <select
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  className="select-field"
                >
                  <option value="">{t.incomePlaceholder}</option>
                  {incomeRanges[language].map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">{t.landLabel}</label>
                <select
                  value={formData.landholding}
                  onChange={(e) => setFormData({ ...formData, landholding: e.target.value })}
                  className="select-field"
                >
                  <option value="">{t.landPlaceholder}</option>
                  {landOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={checkEligibility}
              disabled={!formData.age || isChecking}
              className="w-full py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {isChecking ? t.checkingButton : t.checkButton}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className={`rounded-2xl p-6 ${results.length > 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-center gap-3 mb-2">
              {results.length > 0 ? (
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              )}
              <h2 className="text-xl font-bold text-foreground">
                {results.length > 0
                  ? t.foundTitle.replace("{count}", String(results.length)).replace("{plural}", results.length > 1 ? "s" : "")
                  : t.noMatchTitle}
              </h2>
            </div>
            <p className="text-muted-foreground ml-13">
              {results.length > 0 ? t.foundSubtitle : t.noMatchSubtitle}
            </p>
          </div>

          {results.length > 0 && (
            <div className="grid gap-4">
              {results.map((scheme) => (
                <Link
                  key={scheme.id}
                  href={`/schemes/${scheme.id}`}
                  className="scheme-card group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className={`badge-category ${categoryColors[scheme.category] || 'bg-gray-100 text-gray-700'}`}>
                      {scheme.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {language === "en" ? scheme.name : scheme.name_hi}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {language === "en" ? scheme.benefit : scheme.benefit_hi}
                  </p>
                  <span className="text-sm font-medium text-primary inline-flex items-center gap-1">
                    {t.viewDetails}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setResults(null)}
              className="flex-1 py-3 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              {t.checkAgain}
            </button>
            <Link
              href="/schemes"
              className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold text-center hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              {t.browseAll}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
