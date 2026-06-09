# 🚀 GUIA DE DEPLOY - AXIS CORE™

**v1.0.0** • Deploy passo a passo

---

## ⚡ Resumo Executivo

Este guia levará você de um repositório vazio ao **AXIS CORE™ funcionando em produção** em aproximadamente **2 horas**.

**Resultado esperado:**
```
✅ Frontend: https://plataforma-axis-core.vercel.app
✅ Backend: https://axis-api-xxxxx.onrender.com
✅ Database: Supabase online com 15 tabelas + RLS
✅ Email: Resend API integrada
✅ Pagamentos: Stripe webhooks ativas
✅ Push: Expo notificações funcionando
```

---

## 📋 Pré-requisitos

- ✅ Git instalado
- ✅ Node.js 18+ instalado
- ✅ Python 3.12+ instalado
- ✅ Conta Supabase criada
- ✅ Conta Vercel criada
- ✅ Conta Render criada
- ✅ Conta Stripe criada

---

## 🏗️ FASE 1: SUPABASE (30 min)

### 1. Execute migrations
No Supabase Dashboard → SQL Editor → New Query

**Executar os scripts SQL de:**
- `infra/supabase/migrations/001_initial_schema.sql`
- `infra/supabase/migrations/002_seed_realtime_storage.sql`

### 2. Habilite Realtime
Realtime → Replication → Enable para:
- ✅ profiles
- ✅ sessions
- ✅ telemetry_logs
- ✅ notifications

### 3. Crie Storage Buckets
Storage → New Bucket:
- `reports` (private)
- `avatars` (public)
- `courses` (private)

### 4. Copie credenciais
Settings → API
- Project URL
- anon key
- service_role key

---

## 🔧 FASE 2: BACKEND - RENDER (30 min)

### 1. Vá em Render
https://dashboard.render.com

### 2. New Web Service
- Connect: GitHub repo `plataforma-axis-core`
- Branch: `main`
- Runtime: `Docker`

### 3. Adicione variáveis de ambiente
```
SUPABASE_URL=https://oikylekfpmjpvqibigfw.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sb_secret_F9man...
STRIPE_SECRET_KEY=sk_test_xxxxx
RESEND_API_KEY=re_xxxxx
ENVIRONMENT=production
```

### 4. Deploy
- Clique "Deploy"
- Aguarde ~10 min
- Copie URL do backend

---

## 🎨 FASE 3: FRONTEND - VERCEL (20 min)

### 1. Vá em Vercel
https://vercel.com/dashboard

### 2. Import Project
- Selecione repositório
- Framework: Next.js
- Root Directory: `apps/frontend`

### 3. Adicione variáveis de ambiente
```
NEXT_PUBLIC_SUPABASE_URL=https://oikylekfpmjpvqibigfw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_1lwUe6IrfqTGGWginSiWdg_UBg5eKKT
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com
```

### 4. Deploy
- Clique "Deploy"
- Aguarde ~5 min
- Acesse o frontend

---

## ✅ Próximos passos

1. Criar schema SQL do Supabase
2. Implementar APIs do backend
3. Criar componentes do frontend
4. Testar integração end-to-end
5. Ativar billing Stripe
6. Deploy para produção

---

**AXIS CORE™ • v1.0.0** 🌟
