"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import schemes from "@/data/schemes.json";
import { Scheme, EligibilityMatch } from "@/types/scheme";

const translations = {
  en: {
    title: "Check Your Eligibility",
    subtitle: "Answer a few simple questions to find schemes you qualify for",
    ageLabel: "Age Group",
    agePlaceholder: "Select age group",
    genderLabel: "Gender",
    genderPlaceholder: "Select gender",
    occupationLabel: "Occupation",
    occupationPlaceholder: "Select occupation",
    incomeLabel: "Annual Family Income",
    incomePlaceholder: "Select income range",
    casteLabel: "Social Category",
    castePlaceholder: "Select category",
    locationLabel: "Location Type",
    locationPlaceholder: "Select location type",
    bplLabel: "BPL/SECC Status",
    bplPlaceholder: "Select status",
    disabilityLabel: "Disability Status",
    disabilityPlaceholder: "Select status",
    maritalLabel: "Marital Status",
    maritalPlaceholder: "Select status",
    houseLabel: "House Ownership",
    housePlaceholder: "Select ownership status",
    employmentSectorLabel: "Employment Sector",
    employmentSectorPlaceholder: "Select employment sector",
    checkButton: "Find Matching Schemes",
    checkingButton: "Checking...",
    foundTitle: "Found {count} scheme{plural} for you",
    noMatchTitle: "No matching schemes found",
    foundSubtitle: "Based on your profile, you may be eligible for these schemes:",
    noMatchSubtitle: "Based on your current profile, we couldn't find matching schemes. Try adjusting your criteria or browse all schemes.",
    checkAgain: "Check Again",
    browseAll: "Browse All Schemes",
    viewDetails: "View Details",
    confidenceLabel: "Match Confidence",
    highConfidence: "Highly Likely Eligible",
    mediumConfidence: "May Be Eligible",
    otherOption: "Other / Not Sure",
    matchedCriteria: "Matched Criteria",
    partialCriteria: "Partial Match",
    missingCriteria: "Requirements Not Met",
    whyEligible: "Why you may be eligible",
  },
  hi: {
    title: "अपनी पात्रता जांचें",
    subtitle: "जिन योजनाओं के लिए आप पात्र हैं, उन्हें खोजने के लिए कुछ सरल प्रश्नों के उत्तर दें",
    ageLabel: "आयु वर्ग",
    agePlaceholder: "आयु वर्ग चुनें",
    genderLabel: "लिंग",
    genderPlaceholder: "लिंग चुनें",
    occupationLabel: "पेशा",
    occupationPlaceholder: "पेशा चुनें",
    incomeLabel: "वार्षिक पारिवारिक आय",
    incomePlaceholder: "आय सीमा चुनें",
    casteLabel: "सामाजिक श्रेणी",
    castePlaceholder: "श्रेणी चुनें",
    locationLabel: "स्थान का प्रकार",
    locationPlaceholder: "स्थान का प्रकार चुनें",
    bplLabel: "बीपीएल/एसईसीसी स्थिति",
    bplPlaceholder: "स्थिति चुनें",
    disabilityLabel: "विकलांगता स्थिति",
    disabilityPlaceholder: "स्थिति चुनें",
    maritalLabel: "वैवाहिक स्थिति",
    maritalPlaceholder: "स्थिति चुनें",
    houseLabel: "घर की स्वामित्व",
    housePlaceholder: "स्वामित्व स्थिति चुनें",
    employmentSectorLabel: "रोजगार क्षेत्र",
    employmentSectorPlaceholder: "रोजगार क्षेत्र चुनें",
    checkButton: "मिलान योजनाएं खोजें",
    checkingButton: "जांच रहा है...",
    foundTitle: "आपके लिए {count} योजना{plural} मिली",
    noMatchTitle: "कोई मिलान योजना नहीं मिली",
    foundSubtitle: "आपकी प्रोफाइल के आधार पर, आप इन योजनाओं के लिए पात्र हो सकते हैं:",
    noMatchSubtitle: "आपकी वर्तमान प्रोफाइल के आधार पर, हमें मिलान योजनाएं नहीं मिलीं। अपने मानदंड समायोजित करें या सभी योजनाएं ब्राउज़ करें।",
    checkAgain: "फिर से जांचें",
    browseAll: "सभी योजनाएं देखें",
    viewDetails: "विवरण देखें",
    confidenceLabel: "मिलान विश्वास",
    highConfidence: "अत्यधिक संभावित पात्र",
    mediumConfidence: "संभावित पात्र",
    otherOption: "अन्य / पता नहीं",
    matchedCriteria: "मेल खाते मानदंड",
    partialCriteria: "आंशिक मेल",
    missingCriteria: "आवश्यकताएं पूरी नहीं",
    whyEligible: "पात्रता का कारण",
  },
};

const ageOptions = {
  en: [
    { value: "0-5", label: "0-5 years" },
    { value: "6-12", label: "6-12 years" },
    { value: "13-17", label: "13-17 years" },
    { value: "18-25", label: "18-25 years" },
    { value: "26-35", label: "26-35 years" },
    { value: "36-50", label: "36-50 years" },
    { value: "51-60", label: "51-60 years" },
    { value: "60+", label: "60+ years" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "0-5", label: "0-5 वर्ष" },
    { value: "6-12", label: "6-12 वर्ष" },
    { value: "13-17", label: "13-17 वर्ष" },
    { value: "18-25", label: "18-25 वर्ष" },
    { value: "26-35", label: "26-35 वर्ष" },
    { value: "36-50", label: "36-50 वर्ष" },
    { value: "51-60", label: "51-60 वर्ष" },
    { value: "60+", label: "60+ वर्ष" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const genderOptions = {
  en: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "male", label: "पुरुष" },
    { value: "female", label: "महिला" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
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
    { value: "ex-serviceman", label: "Ex-Serviceman" },
    { value: "sharecropper", label: "Sharecropper / Tenant Farmer" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "farmer", label: "किसान" },
    { value: "worker", label: "मजदूर" },
    { value: "employee", label: "नौकरीपेशा" },
    { value: "self-employed", label: "स्वरोजगार" },
    { value: "student", label: "छात्र" },
    { value: "unemployed", label: "बेरोजगार" },
    { value: "retired", label: "सेवानिवृत्त" },
    { value: "ex-serviceman", label: "भूतपूर्व सैनिक" },
    { value: "sharecropper", label: "बटाईदार / किरायेदार किसान" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const incomeRanges = {
  en: [
    { value: "0", label: "Below ₹1 lakh" },
    { value: "100000", label: "₹1-2 lakh" },
    { value: "200000", label: "₹2-3 lakh" },
    { value: "250000", label: "₹2.5-3 lakh" },
    { value: "300000", label: "₹3-5 lakh" },
    { value: "500000", label: "₹5-10 lakh" },
    { value: "1000000", label: "₹10-18 lakh" },
    { value: "1800000", label: "Above ₹18 lakh" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "0", label: "₹1 लाख से कम" },
    { value: "100000", label: "₹1-2 लाख" },
    { value: "200000", label: "₹2-3 लाख" },
    { value: "250000", label: "₹2.5-3 लाख" },
    { value: "300000", label: "₹3-5 लाख" },
    { value: "500000", label: "₹5-10 लाख" },
    { value: "1000000", label: "₹10-18 लाख" },
    { value: "1800000", label: "₹18 लाख से अधिक" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const casteOptions = {
  en: [
    { value: "general", label: "General" },
    { value: "obc", label: "OBC" },
    { value: "sc", label: "SC" },
    { value: "st", label: "ST" },
    { value: "ews", label: "EWS" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "general", label: "सामान्य" },
    { value: "obc", label: "ओबीसी" },
    { value: "sc", label: "एससी" },
    { value: "st", label: "एसटी" },
    { value: "ews", label: "ईडब्ल्यूएस" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const locationOptions = {
  en: [
    { value: "rural", label: "Rural" },
    { value: "urban", label: "Urban" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "rural", label: "ग्रामीण" },
    { value: "urban", label: "शहरी" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const bplOptions = {
  en: [
    { value: "true", label: "Yes - BPL/Eligible for SECC schemes" },
    { value: "false", label: "No - Above Poverty Line" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "true", label: "हां - बीपीएल/एसईसीसी योजनाओं के लिए पात्र" },
    { value: "false", label: "नहीं - गरीबी रेखा से ऊपर" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const disabilityOptions = {
  en: [
    { value: "true", label: "Yes - Person with Disability" },
    { value: "false", label: "No" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "true", label: "हां - दिव्यांग व्यक्ति" },
    { value: "false", label: "नहीं" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const maritalOptions = {
  en: [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "widow", label: "Widow/Widower" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "single", label: "अविवाहित" },
    { value: "married", label: "विवाहित" },
    { value: "widow", label: "विधवा/विधुर" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const houseOptions = {
  en: [
    { value: "own-pucca", label: "Own Pucca House" },
    { value: "own-kutcha", label: "Own Kutcha House" },
    { value: "rent", label: "Rented House" },
    { value: "none", label: "No House" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "own-pucca", label: "अपना पक्का घर" },
    { value: "own-kutcha", label: "अपना कच्चा घर" },
    { value: "rent", label: "किराए का घर" },
    { value: "none", label: "कोई घर नहीं" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

const employmentSectorOptions = {
  en: [
    { value: "organized", label: "Organized Sector (PF/ESI available)" },
    { value: "unorganized", label: "Unorganized Sector" },
    { value: "other", label: "Other / Not Sure" },
  ],
  hi: [
    { value: "organized", label: "संगठित क्षेत्र (पीएफ/ईएसआई उपलब्ध)" },
    { value: "unorganized", label: "असंगठित क्षेत्र" },
    { value: "other", label: "अन्य / पता नहीं" },
  ],
};

interface FormData {
  age: string;
  gender: string;
  occupation: string;
  income: string;
  caste: string;
  location: string;
  bpl: string;
  disability: string;
  marital: string;
  house: string;
  employmentSector: string;
}

function calculateConfidenceScore(
  scheme: Scheme,
  formData: FormData
): EligibilityMatch {
  let totalWeight = 0;
  let matchedWeight = 0;
  let partialWeight = 0;
  
  const matchedCriteria: string[] = [];
  const partialCriteria: string[] = [];
  const missingCriteria: string[] = [];
  
  const weights = scheme.eligibility.weights || {
    age: 15,
    gender: 10,
    occupation: 20,
    income: 25,
    caste: 10,
    location: 10,
    bpl: 10,
    disability: 5,
    marital: 5,
    house: 10,
    employmentSector: 10,
  };

  const ageValue = formData.age !== "other" ? formData.age : null;
  const income = formData.income !== "other" ? parseInt(formData.income) || 0 : null;
  const isBPL = formData.bpl === "true" ? true : formData.bpl === "false" ? false : null;
  const hasDisability = formData.disability === "true" ? true : formData.disability === "false" ? false : null;
  const hasPuccaHouse = formData.house === "own-pucca" ? true : formData.house === "none" || formData.house === "own-kutcha" ? false : null;

  // Age check
  if (scheme.eligibility.age_min !== null) {
    totalWeight += weights.age;
    if (ageValue && ageValue !== "other") {
      const ageMin = parseInt(ageValue.split("-")[0]) || 0;
      
      if (ageMin >= (scheme.eligibility.age_min || 0)) {
        if (scheme.eligibility.age_max && ageMin > scheme.eligibility.age_max) {
          partialWeight += weights.age * 0.5;
          partialCriteria.push("age");
        } else {
          matchedWeight += weights.age;
          matchedCriteria.push("age");
        }
      } else {
        missingCriteria.push("age");
      }
    } else if (formData.age === "other") {
      partialWeight += weights.age * 0.3;
      partialCriteria.push("age");
    } else {
      missingCriteria.push("age");
    }
  }

  // Gender check
  if (scheme.eligibility.gender !== null) {
    totalWeight += weights.gender;
    if (formData.gender !== "other" && formData.gender === scheme.eligibility.gender) {
      matchedWeight += weights.gender;
      matchedCriteria.push("gender");
    } else if (formData.gender === "other") {
      partialWeight += weights.gender * 0.3;
      partialCriteria.push("gender");
    } else {
      missingCriteria.push("gender");
    }
  }

// Occupation check
  if (scheme.eligibility.occupation && scheme.eligibility.occupation.length > 0) {
    totalWeight += weights.occupation;
    if (formData.occupation !== "other" && scheme.eligibility.occupation.includes(formData.occupation)) {
      matchedWeight += weights.occupation;
      matchedCriteria.push("occupation");
    } else if (formData.occupation === "other") {
      partialWeight += weights.occupation * 0.3;
      partialCriteria.push("occupation");
    } else {
      missingCriteria.push("occupation");
    }
  }

  // Income check
  if (scheme.eligibility.income_max !== null) {
    totalWeight += weights.income;
    if (income !== null && income <= scheme.eligibility.income_max) {
      matchedWeight += weights.income;
      matchedCriteria.push("income");
    } else if (formData.income === "other") {
      partialWeight += weights.income * 0.3;
      partialCriteria.push("income");
    } else {
      missingCriteria.push("income");
    }
  }

// Caste check
  if (scheme.eligibility.caste && scheme.eligibility.caste.length > 0) {
    totalWeight += weights.caste;
    if (formData.caste !== "other" && scheme.eligibility.caste.includes(formData.caste)) {
      matchedWeight += weights.caste;
      matchedCriteria.push("caste");
    } else if (formData.caste === "other") {
      partialWeight += weights.caste * 0.3;
      partialCriteria.push("caste");
    } else {
      missingCriteria.push("caste");
    }
  }

  // Location type check
  if (scheme.eligibility.location_type && scheme.eligibility.location_type.length > 0) {
    totalWeight += weights.location;
    if (formData.location !== "other" && scheme.eligibility.location_type.includes(formData.location)) {
      matchedWeight += weights.location;
      matchedCriteria.push("location");
    } else if (formData.location === "other") {
      partialWeight += weights.location * 0.3;
      partialCriteria.push("location");
    } else {
      missingCriteria.push("location");
    }
  }

  // BPL check
  if (scheme.eligibility.bpl_status !== null) {
    totalWeight += weights.bpl;
    if (isBPL !== null && isBPL === scheme.eligibility.bpl_status) {
      matchedWeight += weights.bpl;
      matchedCriteria.push("bpl");
    } else if (formData.bpl === "other") {
      partialWeight += weights.bpl * 0.3;
      partialCriteria.push("bpl");
    } else {
      missingCriteria.push("bpl");
    }
  }

  // Disability check
  if (scheme.eligibility.disability !== null) {
    totalWeight += weights.disability;
    if (hasDisability !== null && hasDisability === scheme.eligibility.disability) {
      matchedWeight += weights.disability;
      matchedCriteria.push("disability");
    } else if (formData.disability === "other") {
      partialWeight += weights.disability * 0.3;
      partialCriteria.push("disability");
    } else {
      missingCriteria.push("disability");
    }
  }

  // Marital status check
  if (scheme.eligibility.marital_status !== null) {
    totalWeight += weights.marital;
    if (formData.marital !== "other" && formData.marital === scheme.eligibility.marital_status) {
      matchedWeight += weights.marital;
      matchedCriteria.push("marital");
    } else if (formData.marital === "other") {
      partialWeight += weights.marital * 0.3;
      partialCriteria.push("marital");
    } else {
      missingCriteria.push("marital");
    }
  }

  // House ownership check
  if (scheme.eligibility.has_pucca_house !== null) {
    totalWeight += weights.house;
    if (hasPuccaHouse !== null && hasPuccaHouse === scheme.eligibility.has_pucca_house) {
      matchedWeight += weights.house;
      matchedCriteria.push("house");
    } else if (formData.house === "other") {
      partialWeight += weights.house * 0.3;
      partialCriteria.push("house");
    } else {
      missingCriteria.push("house");
    }
  }

  // Employment sector check
  if (scheme.eligibility.employment_sector !== null) {
    totalWeight += weights.employmentSector;
    if (formData.employmentSector !== "other" && formData.employmentSector === scheme.eligibility.employment_sector) {
      matchedWeight += weights.employmentSector;
      matchedCriteria.push("employmentSector");
    } else if (formData.employmentSector === "other") {
      partialWeight += weights.employmentSector * 0.3;
      partialCriteria.push("employmentSector");
    } else {
      missingCriteria.push("employmentSector");
    }
  }

  const confidence = totalWeight > 0 ? ((matchedWeight + partialWeight) / totalWeight) * 100 : 100;

  return {
    scheme,
    confidence: Math.round(confidence),
    matchedCriteria,
    partialCriteria,
    missingCriteria,
  };
}

export default function CheckerPage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    occupation: "",
    income: "",
    caste: "",
    location: "",
    bpl: "",
    disability: "",
    marital: "",
    house: "",
    employmentSector: "",
  });
  
const [results, setResults] = useState<EligibilityMatch[] | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [expandedSchemes, setExpandedSchemes] = useState<Set<string>>(new Set());

const checkEligibility = () => {
    setIsChecking(true);
    
    // Use setTimeout to allow React to process the state update before heavy computation
    setTimeout(() => {
      const allSchemes = schemes as Scheme[];
      
      const scoredSchemes: EligibilityMatch[] = [];
      
      for (const scheme of allSchemes) {
        scoredSchemes.push(calculateConfidenceScore(scheme, formData));
      }
      
      // Filter schemes with >75% confidence and sort by confidence
      const filtered = scoredSchemes
        .filter((match) => match.confidence >= 75)
        .sort((a, b) => b.confidence - a.confidence);
      
      setResults(filtered);
      setIsChecking(false);
    }, 50);
  };

  const categoryColors: Record<string, { color: string; borderColor: string }> = {
    agriculture: { color: "bg-india-green/10 text-india-green", borderColor: "bg-india-green" },
    health: { color: "bg-red-50 text-red-700", borderColor: "bg-red-500" },
    housing: { color: "bg-saffron/10 text-saffron", borderColor: "bg-saffron" },
    women: { color: "bg-pink-50 text-pink-700", borderColor: "bg-pink-500" },
    financial: { color: "bg-navy/10 text-navy", borderColor: "bg-navy" },
    education: { color: "bg-purple-50 text-purple-700", borderColor: "bg-purple-500" },
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return {
        bg: "bg-india-green",
        text: "text-white",
        label: t.highConfidence,
      };
    } else if (confidence >= 75) {
      return {
        bg: "bg-saffron",
        text: "text-white",
        label: t.mediumConfidence,
      };
    }
    return {
      bg: "bg-gray-400",
      text: "text-white",
      label: "Low Match",
    };
  };

  const toggleSchemeExpand = (schemeId: string) => {
    const newExpanded = new Set(expandedSchemes);
    if (newExpanded.has(schemeId)) {
      newExpanded.delete(schemeId);
    } else {
      newExpanded.add(schemeId);
    }
    setExpandedSchemes(newExpanded);
  };

  const getCriterionLabel = (criterion: string): string => {
    const labels: Record<string, string> = {
      age: language === "en" ? "Age" : "आयु",
      gender: language === "en" ? "Gender" : "लिंग",
      occupation: language === "en" ? "Occupation" : "पेशा",
      income: language === "en" ? "Income" : "आय",
      caste: language === "en" ? "Social Category" : "सामाजिक श्रेणी",
      location: language === "en" ? "Location" : "स्थान",
      bpl: language === "en" ? "BPL Status" : "बीपीएल स्थिति",
      disability: language === "en" ? "Disability" : "विकलांगता",
      marital: language === "en" ? "Marital Status" : "वैवाहिक स्थिति",
      house: language === "en" ? "House Ownership" : "घर की स्वामित्व",
      employmentSector: language === "en" ? "Employment Sector" : "रोजगार क्षेत्र",
    };
    return labels[criterion] || criterion;
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-saffron/10 text-saffron rounded-full text-sm font-medium mt-4 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {language === "en" ? "Free & Instant" : "मुफ्त और तत्काल"}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>

      {!results ? (
        <div className="bg-card border rounded-xl p-6 md:p-10 shadow-lg">
          <div className="space-y-5">
            {/* Row 1: Age, Gender - Basic Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold text-foreground mb-2">{t.ageLabel}</label>
                <select
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.agePlaceholder}</option>
                  {ageOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">{t.genderLabel}</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.genderPlaceholder}</option>
                  {genderOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Occupation, Employment Sector - Work Related */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold text-foreground mb-2">{t.occupationLabel}</label>
                <select
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.occupationPlaceholder}</option>
                  {occupations[language].map((occ) => (
                    <option key={occ.value} value={occ.value}>{occ.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">{t.employmentSectorLabel}</label>
                <select
                  value={formData.employmentSector}
                  onChange={(e) => setFormData({ ...formData, employmentSector: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.employmentSectorPlaceholder}</option>
                  {employmentSectorOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Income, BPL, House Ownership - Economic Status (3 columns) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block font-semibold text-foreground mb-2">{t.incomeLabel}</label>
                <select
                  value={formData.income}
                  onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.incomePlaceholder}</option>
                  {incomeRanges[language].map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">{t.bplLabel}</label>
                <select
                  value={formData.bpl}
                  onChange={(e) => setFormData({ ...formData, bpl: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.bplPlaceholder}</option>
                  {bplOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">{t.houseLabel}</label>
                <select
                  value={formData.house}
                  onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.housePlaceholder}</option>
                  {houseOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 4: Caste, Location - Social & Geographic */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold text-foreground mb-2">{t.casteLabel}</label>
                <select
                  value={formData.caste}
                  onChange={(e) => setFormData({ ...formData, caste: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.castePlaceholder}</option>
                  {casteOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">{t.locationLabel}</label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.locationPlaceholder}</option>
                  {locationOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 5: Disability, Marital Status - Personal Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold text-foreground mb-2">{t.disabilityLabel}</label>
                <select
                  value={formData.disability}
                  onChange={(e) => setFormData({ ...formData, disability: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.disabilityPlaceholder}</option>
                  {disabilityOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-2">{t.maritalLabel}</label>
                <select
                  value={formData.marital}
                  onChange={(e) => setFormData({ ...formData, marital: e.target.value })}
                  className="select-field py-3"
                >
                  <option value="">{t.maritalPlaceholder}</option>
                  {maritalOptions[language].map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

<button
              onClick={checkEligibility}
              disabled={!formData.age || isChecking}
              className="w-full py-4 bg-navy text-white rounded-lg font-semibold text-lg hover:bg-saffron transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-navy/20 mt-4"
            >
              {isChecking ? t.checkingButton : t.checkButton}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className={`rounded-2xl p-6 ${results.length > 0 ? 'bg-india-green/10 border border-india-green/30' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-center gap-3 mb-2">
              {results.length > 0 ? (
                <div className="w-10 h-10 bg-india-green rounded-full flex items-center justify-center">
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
            <div className="space-y-4">
              {results.map((match) => {
                const scheme = match.scheme;
                const catInfo = categoryColors[scheme.category] || { color: "bg-gray-100 text-gray-700", borderColor: "bg-gray-400" };
                const confidenceBadge = getConfidenceBadge(match.confidence);
                const isExpanded = expandedSchemes.has(scheme.id);
                
                return (
                  <div
                    key={scheme.id}
                    className="scheme-card group relative"
                  >
                    <div className={`absolute top-0 left-0 w-1 h-full ${catInfo.borderColor}`} />
                    
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`badge-category ${catInfo.color}`}>
                          {scheme.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${confidenceBadge.bg} ${confidenceBadge.text}`}>
                          {match.confidence}% - {confidenceBadge.label}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {language === "en" ? scheme.name : scheme.name_hi}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3">
                      {language === "en" ? scheme.benefit : scheme.benefit_hi}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <Link 
                        href={`/schemes/${scheme.id}`}
                        className="text-sm font-medium text-primary inline-flex items-center gap-1 hover:underline"
                      >
                        {t.viewDetails}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                      
                      <button
                        onClick={() => toggleSchemeExpand(scheme.id)}
                        className="text-xs text-saffron hover:underline flex items-center gap-1"
                      >
                        {t.whyEligible}
                        <svg 
                          className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Criteria Breakdown */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-border/50 space-y-3">
                        {match.matchedCriteria.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-india-green mb-1">{t.matchedCriteria}:</p>
                            <div className="flex flex-wrap gap-1">
                              {match.matchedCriteria.map((criterion) => (
                                <span key={criterion} className="text-xs px-2 py-1 bg-india-green/10 text-india-green rounded">
                                  {getCriterionLabel(criterion)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {match.partialCriteria.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-saffron mb-1">{t.partialCriteria}:</p>
                            <div className="flex flex-wrap gap-1">
                              {match.partialCriteria.map((criterion) => (
                                <span key={criterion} className="text-xs px-2 py-1 bg-saffron/10 text-saffron rounded">
                                  {getCriterionLabel(criterion)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {match.missingCriteria.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-red-500 mb-1">{t.missingCriteria}:</p>
                            <div className="flex flex-wrap gap-1">
                              {match.missingCriteria.map((criterion) => (
                                <span key={criterion} className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded">
                                  {getCriterionLabel(criterion)}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setResults(null)}
              className="flex-1 py-3 border-2 border-saffron text-saffron rounded-xl font-semibold hover:bg-saffron hover:text-white transition-colors"
            >
              {t.checkAgain}
            </button>
            <Link
              href="/schemes"
              className="flex-1 py-3 bg-navy text-white rounded-xl font-semibold text-center hover:bg-saffron transition-colors shadow-lg shadow-navy/20"
            >
              {t.browseAll}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
