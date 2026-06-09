-- ================================================
-- AXIS CORE™ - Realtime + Storage + Triggers
-- ================================================

-- ================================================
-- REALTIME PUBLICATION
-- ================================================

-- Habilitar Realtime para tabelas críticas
ALTER PUBLICATION supabase_realtime ADD TABLE public.sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.telemetry_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.biometry_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ================================================
-- STORAGE BUCKETS
-- ================================================

-- Criar buckets (execute manualmente no Supabase dashboard)
-- Bucket 1: reports (private)
-- Bucket 2: avatars (public)
-- Bucket 3: courses (private)

-- ================================================
-- RLS POLICIES PARA STORAGE
-- ================================================

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    auth.role() = 'authenticated'
  );

CREATE POLICY "Public can read avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can view their own reports"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'reports' AND
    (auth.uid()::text = (storage.foldername(name))[1] OR
     (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin')
  );

CREATE POLICY "Therapists can upload reports"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'reports' AND
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'therapist'
  );

-- ================================================
-- SEED DATA
-- ================================================

-- Inserir status iniciais
INSERT INTO public.axis_tables (slug, name, base_frequency, description) 
VALUES
  ('hado-quantum', 'Mesa Hado Quantum', 440, 'Frequência quântica base'),
  ('frequencies', 'Mesa de Frequências', 528, 'Frequências Solfeggio'),
  ('chakras', 'Mesa de Chakras', 396, 'Sistema de chakras 7 níveis'),
  ('radionica', 'Máquina Radiônica', 0, 'Radiônica configurável'),
  ('multidimensional', 'Mesa Multidimensional', 528, 'Tratamento multidimensional'),
  ('ancestral', 'Mesa Ancestral', 0, 'Memória ancestral'),
  ('prosperidade', 'Mesa Prosperidade', 0, 'Frequência de abundância'),
  ('relacionamentos', 'Mesa Relacionamentos', 0, 'Harmonia de relacionamentos')
ON CONFLICT (slug) DO NOTHING;

-- ================================================
-- FUNÇÃO PARA CRIAR AUDITORIA
-- ================================================

CREATE OR REPLACE FUNCTION log_audit_action()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    resource_type,
    resource_id,
    changes
  ) VALUES (
    auth.uid(),
    TG_ARGV[0],
    TG_TABLE_NAME,
    NEW.id::text,
    jsonb_build_object('old', row_to_json(OLD), 'new', row_to_json(NEW))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- TRIGGERS DE AUDITORIA
-- ================================================

CREATE TRIGGER audit_sessions_insert
  AFTER INSERT ON public.sessions
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_action('INSERT');

CREATE TRIGGER audit_sessions_update
  AFTER UPDATE ON public.sessions
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_action('UPDATE');

CREATE TRIGGER audit_reports_insert
  AFTER INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION log_audit_action('INSERT');

-- ================================================
-- FUNÇÃO PARA NOTIFICAÇÕES
-- ================================================

CREATE OR REPLACE FUNCTION notify_session_created()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (
    user_id,
    title,
    message,
    type
  ) VALUES (
    NEW.client_id,
    'Nova Sessão Agendada',
    'Sua sessão foi agendada para ' || NEW.scheduled_at::text,
    'session_created'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_session_created
  AFTER INSERT ON public.sessions
  FOR EACH ROW
  EXECUTE FUNCTION notify_session_created();

-- ================================================
-- FUNÇÃO PARA NOTIFICAÇÕES DE RELATÓRIO
-- ================================================

CREATE OR REPLACE FUNCTION notify_report_ready()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.notifications (
    user_id,
    title,
    message,
    type
  ) VALUES (
    NEW.client_id,
    'Seu Relatório está Pronto',
    'O relatório da sua última sessão foi gerado',
    'report_ready'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_notify_report_ready
  AFTER INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION notify_report_ready();

-- ================================================
-- FUNÇÃO PARA ATUALIZAR TENANT ID
-- ================================================

CREATE OR REPLACE FUNCTION set_tenant_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tenant_id IS NULL THEN
    NEW.tenant_id := (
      SELECT tenant_id FROM public.therapists WHERE id = NEW.therapist_id LIMIT 1
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_tenant_sessions
  BEFORE INSERT ON public.sessions
  FOR EACH ROW
  EXECUTE FUNCTION set_tenant_id();

-- ================================================
-- ÍNDICES ADICIONAIS
-- ================================================

CREATE INDEX idx_sessions_tenant_id ON public.sessions(tenant_id);
CREATE INDEX idx_sessions_status ON public.sessions(status);
CREATE INDEX idx_reports_client_id ON public.reports(client_id);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at DESC);
CREATE INDEX idx_audit_created_at ON public.audit_logs(created_at DESC);

-- ================================================
-- VIEWS ÚTEIS
-- ================================================

-- View: Sessões ativas
CREATE OR REPLACE VIEW active_sessions AS
SELECT 
  s.id,
  s.client_id,
  s.therapist_id,
  s.session_type,
  s.scheduled_at,
  s.status,
  p.full_name as client_name,
  t.id as therapist_id_ref
FROM public.sessions s
LEFT JOIN public.clients c ON s.client_id = c.id
LEFT JOIN public.profiles p ON c.id = p.id
LEFT JOIN public.therapists t ON s.therapist_id = t.id
WHERE s.status IN ('scheduled', 'in_progress');

-- View: Estatísticas do terapeuta
CREATE OR REPLACE VIEW therapist_stats AS
SELECT 
  t.id,
  p.full_name,
  COUNT(DISTINCT s.id) as total_sessions,
  COUNT(DISTINCT c.id) as total_clients,
  COUNT(DISTINCT CASE WHEN s.status = 'completed' THEN s.id END) as completed_sessions
FROM public.therapists t
LEFT JOIN public.profiles p ON t.id = p.id
LEFT JOIN public.sessions s ON t.id = s.therapist_id
LEFT JOIN public.clients c ON t.id = c.therapist_id
GROUP BY t.id, p.full_name;

-- ================================================
-- Fim da Configuração Realtime + Storage
-- ================================================
