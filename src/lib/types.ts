export interface Patient {
  id: string;
  created_at: string;
  email: string;
  phone?: string;
  full_name: string;
  age?: number;
  gender?: "male" | "female" | "other";
  city?: string;
  state?: string;
  pincode?: string;
  avatar_url?: string;
  onboarding_complete: boolean;
}

export type Vertical = "hair" | "skin" | "weight" | "mens" | "womens";

export interface Assessment {
  id: string;
  patient_id: string;
  created_at: string;
  vertical: Vertical;
  responses: Record<string, string>;
  ai_analysis?: AIAnalysis;
  severity_score?: number;
  recommended_plan?: string;
  status: "pending" | "reviewed" | "prescribed";
}

export interface AIAnalysis {
  severity_score: number;
  severity_label: "mild" | "moderate" | "severe";
  key_concerns: string[];
  recommended_plan: "starter" | "complete";
  summary: string;
  doctor_notes: string;
  suggested_treatments: string[];
  lifestyle_recommendations: string[];
  urgency: "routine" | "soon" | "urgent";
}

export interface Doctor {
  id: string;
  full_name: string;
  specialization: string;
  license_number: string;
  experience_years?: number;
  medical_council?: string;
  avatar_url?: string;
  bio?: string;
  is_active: boolean;
  consultation_fee: number;
}

export interface Consultation {
  id: string;
  patient_id: string;
  doctor_id: string;
  assessment_id?: string;
  created_at: string;
  scheduled_at?: string;
  completed_at?: string;
  type: "async" | "video" | "chat";
  status: "pending" | "scheduled" | "in_progress" | "completed" | "cancelled";
  notes?: string;
  prescription?: PrescriptionData;
}

export interface PrescriptionData {
  medications: Medication[];
  instructions: string;
  duration_months: number;
  diet_advice?: string;
  follow_up_date?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  consultation_id: string;
  patient_id: string;
  doctor_id: string;
  created_at: string;
  medications: Medication[];
  instructions: string;
  duration_months: number;
  is_active: boolean;
}

export interface Subscription {
  id: string;
  patient_id: string;
  plan: "starter" | "complete";
  vertical: Vertical;
  razorpay_subscription_id?: string;
  amount: number;
  status: "active" | "paused" | "cancelled" | "expired";
  started_at: string;
  next_billing_at?: string;
  cancelled_at?: string;
}

export interface Order {
  id: string;
  patient_id: string;
  prescription_id: string;
  subscription_id?: string;
  created_at: string;
  status: "processing" | "shipped" | "in_transit" | "delivered" | "returned";
  tracking_number?: string;
  shipping_partner?: string;
  estimated_delivery?: string;
  delivered_at?: string;
  amount?: number;
}

export interface ProgressEntry {
  id: string;
  patient_id: string;
  created_at: string;
  vertical: Vertical;
  photo_urls: string[];
  ai_analysis?: ProgressAnalysis;
  metrics?: Record<string, number>;
  doctor_notes?: string;
  month_number: number;
}

export interface ProgressAnalysis {
  progress_score: number;
  progress_label: string;
  observations: string[];
  recommendations: string[];
  encourage_message: string;
  flag_for_doctor: boolean;
  flag_reason?: string;
}

export interface SupportMessage {
  id: string;
  patient_id: string;
  created_at: string;
  channel: "whatsapp" | "web" | "email";
  direction: "inbound" | "outbound";
  message: string;
  handled_by: "ai" | "human";
  resolved: boolean;
}

export interface PharmacyLink {
  pharmacy: string;
  url: string;
  logo: string;
  estimated_price?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: "single" | "multiple" | "text" | "scale" | "photo";
  options?: string[];
  required: boolean;
  helpText?: string;
}

export interface PricingPlan {
  name: string;
  plan: "starter" | "complete";
  price: number;
  originalPrice?: number;
  features: string[];
  highlighted?: boolean;
  vertical: Vertical;
}
