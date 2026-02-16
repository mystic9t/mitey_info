"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import schemes from "@/data/schemes.json";

const translations = {
  en: {
    title: "About Saral Yojana",
    subtitle: "Helping Indians discover and access government schemes",
    mission: {
      title: "Our Mission",
      intro: "Saral Yojana is a simple, accessible web portal designed to help Indian citizens discover government schemes they may be eligible for. We believe that everyone deserves easy access to information about the benefits and support available to them.",
      list: [
        "Simple, easy-to-understand information about government schemes",
        "Quick eligibility checking without any registration",
        "Step-by-step application guidance",
        "Content in both Hindi and English",
        "Mobile-friendly access for users across India",
      ],
    },
    whatWeDo: {
      title: "What We Do",
      desc: "We gather information from official government sources and present it in a user-friendly format. Our eligibility checker helps you quickly identify schemes that match your profile based on factors like age, occupation, and income.",
    },
    notice: {
      title: "Important Notice",
      disclaimer: "Saral Yojana is an informational portal only. We are not affiliated with any government agency. All scheme information is sourced from public government websites and documents.",
      verify: "Please always verify details and apply through official government channels. Eligibility criteria, benefits, and application processes may change. We do not process applications or provide official services.",
    },
    contact: {
      title: "Contact Us",
      desc: "Have feedback or suggestions? We'd love to hear from you.",
    },
    cta: {
      title: "Ready to find schemes?",
      desc: "Check your eligibility or browse all available schemes",
      check: "Check Eligibility",
      browse: "Browse All Schemes",
    },
    stats: {
      schemes: "Government Schemes",
      categories: "Categories",
      languages: "Languages",
    },
  },
  hi: {
    title: "सरल योजना के बारे में",
    subtitle: "भारतीयों को सरकारी योजनाएं खोजने और उन तक पहुंचने में मदद करना",
    mission: {
      title: "हमारा मिशन",
      intro: "सरल योजना एक सरल, सुलभ वेब पोर्टल है जो भारतीय नागरिकों को उन सरकारी योजनाओं की खोज में मदद करने के लिए डिज़ाइन किया गया है जिनके लिए वे पात्र हो सकते हैं। हम मानते हैं कि हर किसी को उन लाभों और सहायता तक आसान पहुंच का हकदार है जो उनके लिए उपलब्ध हैं।",
      list: [
        "सरकारी योजनाओं के बारे में सरल, समझने में आसान जानकारी",
        "बिना किसी पंजीकरण के त्वरित पात्रता जांच",
        "चरण-दर-चरण आवेदन मार्गदर्शन",
        "हिंदी और अंग्रेजी दोनों में सामग्री",
        "भारत भर के उपयोगकर्ताओं के लिए मोबाइल-अनुकूल पहुंच",
      ],
    },
    whatWeDo: {
      title: "हम क्या करते हैं",
      desc: "हम आधिकारिक सरकारी स्रोतों से जानकारी एकत्र करते हैं और इसे उपयोगकर्ता-अनुकूल प्रारूप में प्रस्तुत करते हैं। हमारा पात्रता परीक्षक आपको आयु, व्यवसाय और आय जैसे कारकों के आधार पर आपकी प्रोफाइल से मेल खाती योजनाओं की त्वरित पहचान करने में मदद करता है।",
    },
    notice: {
      title: "महत्वपूर्ण सूचना",
      disclaimer: "सरल योजना केवल एक सूचना पोर्टल है। हम किसी भी सरकारी एजेंसी से संबद्ध नहीं हैं। सभी योजना जानकारी सार्वजनिक सरकारी वेबसाइटों और दस्तावेजों से प्राप्त की गई है।",
      verify: "कृपया हमेशा विवरण सत्यापित करें और आधिकारिक सरकारी चैनलों के माध्यम से आवेदन करें। पात्रता मानदंड, लाभ और आवेदन प्रक्रियाएं बदल सकती हैं। हम आवेदनों को संसाधित नहीं करते या आधिकारिक सेवाएं प्रदान नहीं करते।",
    },
    contact: {
      title: "हमसे संपर्क करें",
      desc: "प्रतिक्रिया या सुझाव हैं? हम आपसे सुनना पसंद करेंगे।",
    },
    cta: {
      title: "योजनाएं खोजने के लिए तैयार हैं?",
      desc: "अपनी पात्रता जांचें या सभी उपलब्ध योजनाएं ब्राउज़ करें",
      check: "पात्रता जांचें",
      browse: "सभी योजनाएं देखें",
    },
    stats: {
      schemes: "सरकारी योजनाएं",
      categories: "श्रेणियां",
      languages: "भाषाएं",
    },
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {language === "en" ? "Information Portal" : "सूचना पोर्टल"}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t.title}</h1>
        <p className="text-xl text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-navy to-navy/80 rounded-2xl p-6 text-white text-center shadow-lg shadow-navy/20">
          <div className="text-4xl font-bold mb-2">{schemes.length}</div>
          <div className="text-sm opacity-90">{t.stats.schemes}</div>
        </div>
        <div className="bg-gradient-to-br from-saffron to-saffron/80 rounded-2xl p-6 text-white text-center shadow-lg shadow-saffron/20">
          <div className="text-4xl font-bold mb-2">{[...new Set(schemes.map(s => s.category))].length}</div>
          <div className="text-sm opacity-90">{t.stats.categories}</div>
        </div>
        <div className="bg-gradient-to-br from-india-green to-india-green/80 rounded-2xl p-6 text-white text-center shadow-lg shadow-india-green/20">
          <div className="text-4xl font-bold mb-2">2</div>
          <div className="text-sm opacity-90">{t.stats.languages}</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.mission.title}</h2>
        <p className="text-muted-foreground">{t.mission.intro}</p>
        
        <ul className="space-y-3 mt-4">
          {t.mission.list.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.whatWeDo.title}</h2>
        <p className="text-muted-foreground">{t.whatWeDo.desc}</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.notice.title}</h2>
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 not-prose">
          <p className="text-amber-800 font-medium mb-2">{t.notice.disclaimer}</p>
          <p className="text-amber-700 text-sm">{t.notice.verify}</p>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{t.contact.title}</h2>
        <p className="text-muted-foreground">{t.contact.desc}</p>
        <p className="mt-4">
          <a
            href="mailto:feedback@mystic9t.fyi"
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            feedback@mystic9t.fyi
          </a>
        </p>
      </div>

      <div className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.cta.title}</h2>
        <p className="text-muted-foreground mb-6">{t.cta.desc}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/checker" className="btn-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.cta.check}
          </Link>
          <Link href="/schemes" className="btn-outline">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {t.cta.browse}
          </Link>
        </div>
      </div>
    </div>
  );
}
