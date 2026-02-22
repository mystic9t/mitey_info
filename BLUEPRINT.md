# Saral Yojana - Blueprint

## Project Summary

**Saral Yojana** (सरल योजना) is a bilingual web application that helps Indian citizens discover government schemes they qualify for. Users can browse schemes by category or answer a short questionnaire to get personalized scheme recommendations based on their eligibility profile.

**Mission**: Make government welfare schemes accessible and discoverable for every Indian citizen.

---

## Tech Stack

| Layer | Technology | Reasoning |
|-------|------------|-----------|
| Framework | Next.js 16 (App Router) | Server-side rendering, SEO, performance |
| Language | TypeScript | Type safety, maintainability |
| Styling | Tailwind CSS | Rapid UI development, responsive |
| Icons | Lucide React | Lightweight, consistent icon set |
| UI Components | Radix UI | Accessible primitives (Label, Slot) |
| Analytics | Vercel Analytics + Speed Insights | Performance monitoring |
| Package Manager | Bun | Fast installs and builds |

---

## Top-Level Folder Structure

```
mitey_info/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with header/footer
│   ├── page.tsx            # Home page (hero + categories)
│   ├── about/               # About page
│   ├── checker/            # Eligibility checker page
│   ├── schemes/
│   │   ├── page.tsx        # Scheme listing with filters
│   │   └── [id]/
│   │       ├── page.tsx    # Individual scheme detail
│   │       ├── client.tsx # Client-side interactions
│   │       └── loading.tsx
│   └── globals.css         # Tailwind + custom styles
├── components/             # Reusable UI components
│   ├── header.tsx
│   ├── footer.tsx
│   └── india-map.tsx
├── lib/
│   ├── language-context.tsx  # i18n state management
│   └── utils.ts              # cn() utility for Tailwind
├── types/
│   └── scheme.ts           # TypeScript interfaces
├── data/
│   └── schemes.json        # Static scheme data (JSON)
├── public/                 # Static assets
│   └── india-map.webp
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## Core Data Models

### Scheme
```typescript
interface Scheme {
  id: string;
  name: string;           // English name
  name_hi: string;        // Hindi name
  category: string;       // agriculture, health, housing, women, financial, education
  category_hi: string;
  benefit: string;        // English benefit description
  benefit_hi: string;     // Hindi benefit description
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
    weights?: Record<string, number>;  // Scoring weights
  };
  eligibility_text: string;
  eligibility_text_hi: string;
  documents: string[];
  documents_hi: string[];
  application_steps: string[];
  application_steps_hi: string[];
  official_link: string;
  helpline: string;
  states: string[];       // ["All India"] or specific states
  deadline: string;
  level: "central" | "state";
  status: "active" | "closed" | "expiring_soon" | "information_outdated";
  portal_last_updated: string;
  govt_last_updated: string | null;
  scheme_expiry_date: string | null;
}
```

### EligibilityMatch
```typescript
interface EligibilityMatch {
  scheme: Scheme;
  confidence: number;      // 0-100
  matchedCriteria: string[];
  partialCriteria: string[];
  missingCriteria: string[];
}
```

---

## Top 5 Features (Priority Order)

1. **Eligibility Checker** - Form with 10 profile questions that matches users to schemes with confidence scoring (>=75% threshold)

2. **Scheme Listing & Filtering** - Browse all schemes with filters by category, level (central/state), status; sort by name/relevance

3. **Scheme Detail Pages** - Full scheme information with bilingual content, documents list, application steps, official links

4. **Bilingual Support (EN/HI)** - Full Hindi translation for all UI text and scheme data; language toggle in header

5. **Category Navigation** - Homepage displays scheme categories (Agriculture, Health, Housing, Women, Financial, Education) with counts

---

## Definition of Successful Overnight Cycle

A successful overnight cycle means:

- **Build passes**: `npm run build` completes without errors
- **No console errors**: Application loads without JavaScript errors
- **Core flows work**: 
  - Homepage loads with scheme counts
  - Eligibility checker returns results
  - Scheme detail pages render
- **Responsive**: Works on mobile (320px) to desktop (1440px)
- **Bilingual**: Language toggle switches all text correctly

---

## Free External APIs / Libraries

| Purpose | Library/Service | Cost |
|---------|----------------|------|
| Icons | Lucide React | Free (MIT) |
| Analytics | Vercel Analytics | Free tier |
| Speed Insights | Vercel Speed Insights | Free tier |
| UI Primitives | Radix UI | Free (MIT) |
| India Map | Static SVG/WebP asset | N/A (bundled) |

*No external APIs required - all scheme data is stored locally in JSON.*

---

## Must NOT Build In This Cycle

1. **User authentication** - No login/signup required for MVP
2. **Backend/Database** - All data is static JSON; no server-side data fetching
3. **Scheme submission form** - Users only discover schemes, not submit new ones
4. **Email/ SMS notifications** - Out of scope
5. **State-specific filtering** - Currently schemes show "All India"; state-level filtering deferred
6. **Search functionality** - Text search across schemes not in current scope
7. **Progressive Web App (PWA)** - Not required
8. **Admin panel** - No content management system needed
9. **Analytics dashboards** - Vercel-provided metrics sufficient
10. **Multi-language beyond EN/HI** - Hindi coverage is the goal

---

## Notes

- Scheme data sourced from publicly available government scheme information
- Eligibility logic uses weighted scoring (occupation: 20%, income: 25%, etc.)
- "Other / Not Sure" answers get partial credit (30% weight) to avoid excluding uncertain users
- Threshold set at 75% confidence to show only relevant matches
- Brand colors: Saffron (#FF9933), Navy (#000080), India Green (#138808)
