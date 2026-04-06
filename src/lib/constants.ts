import { QuizQuestion, PricingPlan } from "./types";

export const VERTICALS = {
  hair: {
    label: "Hair Regrowth",
    tagline: "Clinically-proven treatments for thicker, fuller hair",
    icon: "✦",
    color: "#2D6A4F",
    available: true,
  },
  skin: {
    label: "Skin & Dermatology",
    tagline: "Clear, radiant skin prescribed by dermatologists",
    icon: "◈",
    color: "#40916C",
    available: true,
  },
  weight: {
    label: "Weight Management",
    tagline: "Doctor-guided weight loss that actually works",
    icon: "◉",
    color: "#52B788",
    available: false,
  },
  mens: {
    label: "Men's Health",
    tagline: "Discreet solutions for men's wellness concerns",
    icon: "▣",
    color: "#D4A853",
    available: false,
  },
  womens: {
    label: "Women's Health",
    tagline: "Holistic care for PCOS, hormones & more",
    icon: "❋",
    color: "#D4A853",
    available: false,
  },
} as const;

export const PRICING: PricingPlan[] = [
  {
    name: "Starter",
    plan: "starter",
    price: 999,
    originalPrice: 1499,
    vertical: "hair",
    features: [
      "Doctor consultation",
      "Personalized treatment plan",
      "FDA-approved medications",
      "Free shipping across India",
      "WhatsApp support",
      "Monthly check-ins",
    ],
  },
  {
    name: "Complete",
    plan: "complete",
    price: 1499,
    originalPrice: 2499,
    vertical: "hair",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Advanced prescription options",
      "AI photo progress analysis",
      "Personalized nutrition plan",
      "Video consultations",
      "Priority WhatsApp support",
      "90-day money-back guarantee",
    ],
  },
  {
    name: "Starter",
    plan: "starter",
    price: 799,
    originalPrice: 1199,
    vertical: "skin",
    features: [
      "Dermatologist consultation",
      "Custom skincare prescription",
      "Prescription medications",
      "Free shipping across India",
      "WhatsApp support",
      "Monthly skin check-ins",
    ],
  },
  {
    name: "Complete",
    plan: "complete",
    price: 1199,
    originalPrice: 1999,
    vertical: "skin",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Advanced treatments (Tretinoin, etc.)",
      "AI skin progress analysis",
      "Complete skincare routine plan",
      "Video consultations",
      "Priority WhatsApp support",
      "90-day money-back guarantee",
    ],
  },
];

export const HAIR_QUIZ: QuizQuestion[] = [
  {
    id: "hair_concern",
    question: "What's your primary hair concern?",
    type: "single",
    options: [
      "Receding hairline",
      "Thinning on top (crown)",
      "Overall thinning",
      "Patchy hair loss",
      "Just want to prevent future loss",
    ],
    required: true,
  },
  {
    id: "hair_duration",
    question: "How long have you been experiencing hair loss?",
    type: "single",
    options: [
      "Less than 6 months",
      "6-12 months",
      "1-3 years",
      "3-5 years",
      "More than 5 years",
    ],
    required: true,
  },
  {
    id: "hair_family",
    question: "Does hair loss run in your family?",
    type: "single",
    options: [
      "Yes, father's side",
      "Yes, mother's side",
      "Yes, both sides",
      "No",
      "Not sure",
    ],
    required: true,
  },
  {
    id: "hair_treatments",
    question: "Have you tried any hair loss treatments before?",
    type: "multiple",
    options: [
      "Minoxidil (Rogaine/generic)",
      "Finasteride (Propecia/generic)",
      "Hair oils / Ayurvedic remedies",
      "Hair transplant consultation",
      "PRP therapy",
      "None",
    ],
    required: true,
  },
  {
    id: "hair_age",
    question: "What's your age?",
    type: "single",
    options: ["18-24", "25-30", "31-35", "36-40", "41-50", "50+"],
    required: true,
  },
  {
    id: "hair_lifestyle",
    question: "How would you describe your lifestyle?",
    type: "single",
    options: [
      "Sedentary (mostly sitting)",
      "Lightly active",
      "Moderately active",
      "Very active / athletic",
    ],
    required: true,
  },
  {
    id: "hair_stress",
    question: "How would you rate your stress level?",
    type: "scale",
    options: ["1", "2", "3", "4", "5"],
    required: true,
    helpText: "1 = Very relaxed, 5 = Extremely stressed",
  },
  {
    id: "hair_medical",
    question: "Do you have any existing medical conditions?",
    type: "multiple",
    options: [
      "Thyroid issues",
      "Diabetes",
      "High blood pressure",
      "Skin conditions (eczema, psoriasis)",
      "Hormonal imbalances",
      "None of the above",
    ],
    required: true,
  },
  {
    id: "hair_medications",
    question: "Are you currently taking any medications?",
    type: "text",
    required: false,
    helpText: "List any current medications, or type 'None'",
  },
  {
    id: "hair_goal",
    question: "What's your primary goal?",
    type: "single",
    options: [
      "Stop further hair loss",
      "Regrow lost hair",
      "Both — stop loss and regrow",
      "Improve hair thickness/quality",
    ],
    required: true,
  },
];

export const SKIN_QUIZ: QuizQuestion[] = [
  {
    id: "skin_concern",
    question: "What's your primary skin concern?",
    type: "single",
    options: [
      "Acne / breakouts",
      "Pigmentation / dark spots",
      "Anti-aging / wrinkles",
      "Dry / dehydrated skin",
      "Oily skin / large pores",
      "Rosacea / redness",
    ],
    required: true,
  },
  {
    id: "skin_duration",
    question: "How long have you had this concern?",
    type: "single",
    options: [
      "Less than 3 months",
      "3-6 months",
      "6-12 months",
      "1-3 years",
      "More than 3 years",
    ],
    required: true,
  },
  {
    id: "skin_type",
    question: "What's your skin type?",
    type: "single",
    options: ["Oily", "Dry", "Combination", "Normal", "Sensitive", "Not sure"],
    required: true,
  },
  {
    id: "skin_routine",
    question: "What does your current skincare routine look like?",
    type: "single",
    options: [
      "No routine at all",
      "Just face wash",
      "Basic — cleanser + moisturizer",
      "Moderate — cleanser + serums + moisturizer + SPF",
      "Extensive — multiple steps",
    ],
    required: true,
  },
  {
    id: "skin_treatments",
    question: "Have you tried prescription treatments before?",
    type: "multiple",
    options: [
      "Tretinoin / Retinoids",
      "Benzoyl peroxide",
      "Adapalene (Differin)",
      "Antibiotics (oral/topical)",
      "Chemical peels",
      "None",
    ],
    required: true,
  },
  {
    id: "skin_age",
    question: "What's your age?",
    type: "single",
    options: ["18-24", "25-30", "31-35", "36-40", "41-50", "50+"],
    required: true,
  },
  {
    id: "skin_allergies",
    question: "Do you have any known skin allergies?",
    type: "text",
    required: false,
    helpText: "List any allergies or type 'None'",
  },
  {
    id: "skin_goal",
    question: "What's your primary goal?",
    type: "single",
    options: [
      "Clear skin / no breakouts",
      "Even skin tone",
      "Youthful, firm skin",
      "Healthy, glowing skin",
      "Control oiliness",
    ],
    required: true,
  },
];

export const QUIZ_MAP: Record<string, QuizQuestion[]> = {
  hair: HAIR_QUIZ,
  skin: SKIN_QUIZ,
};

export const PHARMACY_SOURCES = [
  {
    name: "Tata 1mg",
    domain: "1mg.com",
    logo: "https://www.1mg.com/images/tata_1mg_logo.svg",
    searchUrl: "https://www.1mg.com/search/all?name=",
  },
  {
    name: "PharmEasy",
    domain: "pharmeasy.in",
    logo: "https://assets.pharmeasy.in/web-assets/dist/1663a86c.svg",
    searchUrl: "https://pharmeasy.in/search/all?name=",
  },
  {
    name: "Netmeds",
    domain: "netmeds.com",
    logo: "https://www.netmeds.com/assets/version1/images/netmeds-logo.png",
    searchUrl: "https://www.netmeds.com/catalogsearch/result?q=",
  },
  {
    name: "Apollo Pharmacy",
    domain: "apollopharmacy.in",
    logo: "https://images.apollo247.in/images/pharmacyImages/apolloLogo.png",
    searchUrl: "https://www.apollopharmacy.in/search-medicines/",
  },
  {
    name: "MedPlus",
    domain: "medplusmart.com",
    logo: "https://www.medplusmart.com/assets/images/medplus-logo.png",
    searchUrl: "https://www.medplusmart.com/searchProduct.mart?searchKey=",
  },
];

export const TESTIMONIALS = [
  {
    name: "Arjun M.",
    age: 28,
    city: "Bangalore",
    vertical: "hair",
    quote:
      "I was skeptical about online treatment, but Sukhya's doctor was incredibly thorough. 3 months in and my barber noticed the difference before I did!",
    months: 3,
    rating: 5,
  },
  {
    name: "Rahul K.",
    age: 32,
    city: "Mumbai",
    vertical: "hair",
    quote:
      "The convenience is unmatched. Doctor consultation from my couch, medicines at my door. My hairline has visibly improved in 4 months.",
    months: 4,
    rating: 5,
  },
  {
    name: "Priya S.",
    age: 26,
    city: "Delhi",
    vertical: "skin",
    quote:
      "Finally, a platform that doesn't just sell products but actually gets you a real dermatologist. My acne has cleared up significantly.",
    months: 2,
    rating: 5,
  },
  {
    name: "Vikram T.",
    age: 35,
    city: "Hyderabad",
    vertical: "hair",
    quote:
      "I tried everything — oils, shampoos, PRP. Sukhya's prescribed Finasteride + Minoxidil combo with proper doctor monitoring finally worked.",
    months: 6,
    rating: 5,
  },
];

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Take the Assessment",
    description:
      "Answer a few questions about your concerns. Our AI pre-screens your responses to match you with the right specialist.",
    icon: "clipboard",
    time: "2 mins",
  },
  {
    step: 2,
    title: "Doctor Consultation",
    description:
      "A licensed dermatologist reviews your assessment, asks follow-ups if needed, and creates your personalized treatment plan.",
    icon: "stethoscope",
    time: "24-48 hrs",
  },
  {
    step: 3,
    title: "Get Your Prescription",
    description:
      "Your doctor writes a signed e-prescription. Choose your preferred pharmacy and order medications at the best price.",
    icon: "pill",
    time: "Same day",
  },
  {
    step: 4,
    title: "Track Your Progress",
    description:
      "Upload monthly progress photos, get AI-powered analysis, and regular doctor check-ins to adjust your treatment.",
    icon: "trending-up",
    time: "Ongoing",
  },
];

export const STATS = [
  { value: "50,000+", label: "Happy patients" },
  { value: "200+", label: "Licensed doctors" },
  { value: "4.8/5", label: "Average rating" },
  { value: "94%", label: "See results in 90 days" },
];

export const FAQ = [
  {
    q: "Is Sukhya a pharmacy? Do you sell medicines?",
    a: "No. Sukhya is a telehealth platform that connects you with licensed doctors. Your doctor writes the prescription, and you choose from trusted pharmacies (1mg, PharmEasy, Apollo, etc.) to purchase your medicines. We are the bridge, not the pharmacy.",
  },
  {
    q: "How do the doctor consultations work?",
    a: "After you complete our health assessment, a licensed doctor reviews your case within 24-48 hours. They may ask follow-up questions via chat. Once satisfied, they create your personalized treatment plan and e-prescription.",
  },
  {
    q: "Are the doctors really licensed?",
    a: "Absolutely. Every doctor on Sukhya is verified with the Indian Medical Council or respective State Medical Council. Their license numbers are displayed on their profiles.",
  },
  {
    q: "What medications are commonly prescribed for hair loss?",
    a: "Our doctors commonly prescribe FDA-approved treatments like Minoxidil (topical) and Finasteride (oral) based on individual assessment. The specific prescription depends entirely on your doctor's clinical judgment.",
  },
  {
    q: "Is it safe to consult a doctor online?",
    a: "Yes. Telemedicine is regulated by the Government of India under the Telemedicine Practice Guidelines (2020). Our platform follows all regulatory requirements for online consultations.",
  },
  {
    q: "What if I'm not happy with my treatment?",
    a: "Complete plan members get a 90-day money-back guarantee. If you don't see improvement and have followed the treatment plan, we'll refund your subscription. Individual results may vary.",
  },
  {
    q: "How long before I see results?",
    a: "Most patients begin to see initial results within 2-3 months, with significant improvement by 4-6 months. Hair growth treatments typically show the best results at the 6-12 month mark. Individual results vary.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, you can cancel anytime from your dashboard. There are no lock-in contracts. However, consistent treatment is key to seeing results, so we recommend committing for at least 3 months.",
  },
];
