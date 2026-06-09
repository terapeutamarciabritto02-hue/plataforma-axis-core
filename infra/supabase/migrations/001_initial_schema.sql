-- ================================================
-- AXIS CORE™ - Initial Schema
-- 15 tabelas + RLS + Índices
-- ================================================

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================
-- 1. PROFILES (Usuários)
-- ================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'client',
  tenant_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR 
         (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- ================================================
-- 2. TENANTS (Espaços Terapêuticos)
-- ================================================
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  description TEXT,
  logo_url TEXT,
  plan TEXT NOT NULL DEFAULT 'starter',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tenant members can view"
  ON public.tenants FOR SELECT
  USING (owner_id = auth.uid());

-- ================================================
-- 3. THERAPISTS
-- ================================================
CREATE TABLE IF NOT EXISTS public.therapists (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  crn TEXT UNIQUE,
  specialization TEXT,
  bio TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists can view their profile"
  ON public.therapists FOR SELECT
  USING (id = auth.uid() OR 
         (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- ================================================
-- 4. CLIENTS
-- ================================================
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE SET NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  health_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients see own data"
  ON public.clients FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Therapists see their clients"
  ON public.clients FOR SELECT
  USING (therapist_id = auth.uid());

-- ================================================
-- 5. STUDENTS
-- ================================================
CREATE TABLE IF NOT EXISTS public.students (
  id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active'
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students see own data"
  ON public.students FOR SELECT
  USING (id = auth.uid());

-- ================================================
-- 6. SESSIONS
-- ================================================
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients see their sessions"
  ON public.sessions FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Therapists see their sessions"
  ON public.sessions FOR SELECT
  USING (therapist_id = auth.uid());

-- ================================================
-- 7. REPORTS
-- ================================================
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE,
  content JSONB,
  pdf_url TEXT,
  signature_hash TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients see their reports"
  ON public.reports FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Therapists see their reports"
  ON public.reports FOR SELECT
  USING (therapist_id = auth.uid());

-- ================================================
-- 8. AXIS_TABLES (8 Mesas do Engine)
-- ================================================
CREATE TABLE IF NOT EXISTS public.axis_tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  base_frequency FLOAT,
  description TEXT,
  config JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed das 8 mesas
INSERT INTO public.axis_tables (slug, name, base_frequency, description) VALUES
  ('hado-quantum', 'Mesa Hado Quantum', 440, 'Frequência quântica base'),
  ('frequencies', 'Mesa de Frequências', 528, 'Frequências Solfeggio'),
  ('chakras', 'Mesa de Chakras', 396, 'Sistema de chakras 7 níveis'),
  ('radionica', 'Máquina Radiônica', 0, 'Radiônica configurável'),
  ('multidimensional', 'Mesa Multidimensional', 528, 'Tratamento multidimensional'),
  ('ancestral', 'Mesa Ancestral', 0, 'Memória ancestral'),
  ('prosperidade', 'Mesa Prosperidade', 0, 'Frequência de abundância'),
  ('relacionamentos', 'Mesa Relacionamentos', 0, 'Harmonia de relacionamentos')
ON CONFLICT DO NOTHING;

ALTER TABLE public.axis_tables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view"
  ON public.axis_tables FOR SELECT
  USING (TRUE);

-- ================================================
-- 9. AXIS_PROTOCOLS
-- ================================================
CREATE TABLE IF NOT EXISTS public.axis_protocols (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  table_id UUID REFERENCES public.axis_tables(id),
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE,
  protocol_data JSONB,
  duration_seconds INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.axis_protocols ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists see their protocols"
  ON public.axis_protocols FOR SELECT
  USING (therapist_id = auth.uid());

-- ================================================
-- 10. COURSES
-- ================================================
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID REFERENCES public.therapists(id),
  cover_image_url TEXT,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published courses"
  ON public.courses FOR SELECT
  USING (status = 'published');

-- ================================================
-- 11. COURSE_MODULES
-- ================================================
CREATE TABLE IF NOT EXISTS public.course_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  order_index INTEGER,
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public modules"
  ON public.course_modules FOR SELECT
  USING (TRUE);

-- ================================================
-- 12. TELEMETRY_LOGS
-- ================================================
CREATE TABLE IF NOT EXISTS public.telemetry_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  metric_type TEXT,
  value FLOAT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.telemetry_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists see their telemetry"
  ON public.telemetry_logs FOR SELECT
  USING (session_id IN (
    SELECT id FROM public.sessions WHERE therapist_id = auth.uid()
  ));

-- ================================================
-- 13. BIOMETRY_LOGS
-- ================================================
CREATE TABLE IF NOT EXISTS public.biometry_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  bpm INTEGER,
  hrv_rmssd FLOAT,
  coherence FLOAT,
  stress_index FLOAT,
  signal_quality TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.biometry_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Therapists see biometry"
  ON public.biometry_logs FOR SELECT
  USING (session_id IN (
    SELECT id FROM public.sessions WHERE therapist_id = auth.uid()
  ));

-- ================================================
-- 14. NOTIFICATIONS
-- ================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see their notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

-- ================================================
-- 15. AUDIT_LOGS
-- ================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id TEXT,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins see audit logs"
  ON public.audit_logs FOR SELECT
  USING ((SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- ================================================
-- ÍNDICES
-- ================================================
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_tenant_id ON public.profiles(tenant_id);
CREATE INDEX idx_sessions_client_id ON public.sessions(client_id);
CREATE INDEX idx_sessions_therapist_id ON public.sessions(therapist_id);
CREATE INDEX idx_sessions_scheduled_at ON public.sessions(scheduled_at);
CREATE INDEX idx_reports_session_id ON public.reports(session_id);
CREATE INDEX idx_telemetry_session_id ON public.telemetry_logs(session_id);
CREATE INDEX idx_biometry_session_id ON public.biometry_logs(session_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_audit_user_id ON public.audit_logs(user_id);

-- ================================================
-- TRIGGERS
-- ================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON public.sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ================================================
-- Fim do Schema
-- ================================================
