export interface EligibilityCriterion {
  field: string;
  value: unknown;
  weight: number;
  required: boolean;
}

export interface Scheme {
  id: string;
  name: string;
  name_hi: string;
  category: string;
  category_hi: string;
  benefit: string;
  benefit_hi: string;
  description: string;
  description_hi: string;
  eligibility: {
    occupation: string[] | null;
    landholding_max: number | null;
    income_max: number | null;
    age_min: number | null;
    age_max: number | null;
    gender: string | null;
    caste: string[] | null;
    location_type: string[] | null;
    bpl_status: boolean | null;
    disability: boolean | null;
    marital_status: string | null;
    employment_sector: string | null;
    has_pucca_house: boolean | null;
    weights?: Record<string, number>;
  };
  eligibility_text: string;
  eligibility_text_hi: string;
  documents: string[];
  documents_hi: string[];
  application_steps: string[];
  application_steps_hi: string[];
  official_link: string;
  helpline: string;
  states: string[];
  deadline: string;
  level: "central" | "state";
  status: "active" | "closed" | "expiring_soon" | "information_outdated";
  portal_last_updated: string;
  govt_last_updated: string | null;
  scheme_expiry_date: string | null;
}

export interface EligibilityMatch {
  scheme: Scheme;
  confidence: number;
  matchedCriteria: string[];
  partialCriteria: string[];
  missingCriteria: string[];
}
