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
    gender: string | null;
    criteria?: string;
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
}
