-- ============================================
-- SUKHYA HEALTH — Supabase Database Migration
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Patients
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  full_name TEXT NOT NULL,
  age INTEGER,
  gender TEXT CHECK (gender IN ('male','female','other')),
  city TEXT,
  state TEXT,
  pincode TEXT,
  avatar_url TEXT,
  onboarding_complete BOOLEAN DEFAULT false
);

-- 2. Assessments
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  vertical TEXT NOT NULL CHECK (vertical IN ('hair','skin','weight','mens','womens')),
  responses JSONB NOT NULL,
  ai_analysis JSONB,
  severity_score INTEGER,
  recommended_plan TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','reviewed','prescribed'))
);

-- 3. Doctors
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  specialization TEXT NOT NULL,
  license_number TEXT UNIQUE NOT NULL,
  experience_years INTEGER,
  medical_council TEXT,
  avatar_url TEXT,
  signature_url TEXT,
  bio TEXT,
  is_active BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  consultation_fee NUMERIC DEFAULT 300,
  license_doc_url TEXT,
  degree_cert_url TEXT
);

-- 4. Consultations
CREATE TABLE IF NOT EXISTS consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id),
  assessment_id UUID REFERENCES assessments(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  scheduled_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  type TEXT CHECK (type IN ('async','video','chat')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','scheduled','in_progress','completed','cancelled')),
  notes TEXT,
  prescription JSONB
);

-- 5. Prescriptions
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consultation_id UUID REFERENCES consultations(id),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  medications JSONB NOT NULL,
  instructions TEXT,
  duration_months INTEGER DEFAULT 3,
  is_active BOOLEAN DEFAULT true,
  prescription_number TEXT UNIQUE
);

-- 6. Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('starter','complete')),
  vertical TEXT NOT NULL,
  razorpay_subscription_id TEXT,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','paused','cancelled','expired')),
  started_at TIMESTAMPTZ DEFAULT now(),
  next_billing_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

-- 7. Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  prescription_id UUID REFERENCES prescriptions(id),
  subscription_id UUID REFERENCES subscriptions(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing','shipped','in_transit','delivered','returned')),
  tracking_number TEXT,
  shipping_partner TEXT,
  estimated_delivery TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  amount NUMERIC
);

-- 8. Progress entries
CREATE TABLE IF NOT EXISTS progress_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  vertical TEXT NOT NULL,
  photo_urls TEXT[],
  ai_analysis JSONB,
  metrics JSONB,
  doctor_notes TEXT,
  month_number INTEGER
);

-- 9. Support messages
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  channel TEXT CHECK (channel IN ('whatsapp','web','email')),
  direction TEXT CHECK (direction IN ('inbound','outbound')),
  message TEXT NOT NULL,
  handled_by TEXT CHECK (handled_by IN ('ai','human')),
  resolved BOOLEAN DEFAULT false
);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;

-- Patients can read/update their own data
CREATE POLICY "Patients can view own profile" ON patients
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Patients can update own profile" ON patients
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Patients can view their own assessments
CREATE POLICY "Patients view own assessments" ON assessments
  FOR SELECT USING (auth.uid()::text = patient_id::text);

CREATE POLICY "Patients create assessments" ON assessments
  FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Patients can view own consultations
CREATE POLICY "Patients view own consultations" ON consultations
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- Patients can view own prescriptions
CREATE POLICY "Patients view own prescriptions" ON prescriptions
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- Patients can view own subscriptions
CREATE POLICY "Patients view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- Patients can view own orders
CREATE POLICY "Patients view own orders" ON orders
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- Patients can view/create own progress
CREATE POLICY "Patients view own progress" ON progress_entries
  FOR SELECT USING (auth.uid()::text = patient_id::text);

CREATE POLICY "Patients create progress entries" ON progress_entries
  FOR INSERT WITH CHECK (auth.uid()::text = patient_id::text);

-- Doctors are publicly viewable (only active/verified ones)
CREATE POLICY "Anyone can view active doctors" ON doctors
  FOR SELECT USING (is_active = true AND is_verified = true);

-- Anyone can register as a doctor (insert)
CREATE POLICY "Anyone can register as doctor" ON doctors
  FOR INSERT WITH CHECK (true);

-- Patients can view own support messages
CREATE POLICY "Patients view own support messages" ON support_messages
  FOR SELECT USING (auth.uid()::text = patient_id::text);

-- ============================================
-- Indexes for performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_assessments_patient ON assessments(patient_id);
CREATE INDEX IF NOT EXISTS idx_assessments_vertical ON assessments(vertical);
CREATE INDEX IF NOT EXISTS idx_consultations_patient ON consultations(patient_id);
CREATE INDEX IF NOT EXISTS idx_consultations_doctor ON consultations(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_patient ON subscriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_orders_patient ON orders(patient_id);
CREATE INDEX IF NOT EXISTS idx_progress_patient ON progress_entries(patient_id);
CREATE INDEX IF NOT EXISTS idx_support_patient ON support_messages(patient_id);
CREATE INDEX IF NOT EXISTS idx_doctors_active ON doctors(is_active, is_verified);

-- ============================================
-- Auto-generate prescription numbers
-- ============================================

CREATE OR REPLACE FUNCTION generate_prescription_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.prescription_number := 'RX-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(NEXTVAL('prescription_seq')::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS prescription_seq START 1;

CREATE TRIGGER set_prescription_number
  BEFORE INSERT ON prescriptions
  FOR EACH ROW
  WHEN (NEW.prescription_number IS NULL)
  EXECUTE FUNCTION generate_prescription_number();
