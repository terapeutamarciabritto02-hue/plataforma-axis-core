# AXIS CORE™ — Ecossistema Completo
## Documento de Especificação e Desenvolvimento
### v1.0.0 · Marcia Britto RQH · M-50340-MT-Brasil

---

## PROMPT MESTRE — Para recriar ou continuar o sistema

Use este prompt em qualquer sessão com Claude para continuar o desenvolvimento:

```
Você é um engenheiro de software sênior especializado em plataformas SaaS.
Estou desenvolvendo o AXIS CORE™ — uma plataforma terapêutica multidimensional.

STACK TÉCNICO:
- Frontend: Next.js 15 + TypeScript + Tailwind + Shadcn UI (deploy: Vercel)
- Backend: FastAPI + Python 3.12 + Docker (deploy: Render)
- Banco: Supabase PostgreSQL + Row Level Security + 15 tabelas
- Mobile: React Native + Expo SDK 52 + Expo Router v4 (iOS + Android)
- Realtime: Supabase WebSocket + MQTT (EMQX Cloud)
- Cache: Redis (Upstash)
- IA: Claude API (Anthropic) — modelo claude-sonnet-4
- Email: Resend API
- Pagamentos: Stripe (3 planos: Starter R$97, Pro R$297, Enterprise R$897)
- Push: Expo Notifications
- PDF: WeasyPrint (server-side)

ROLES DO SISTEMA (RBAC):
- admin: visão global, todos os tenants
- therapist: seus clientes, sessões, engine, IA
- client: seus relatórios, chakras, histórico, agendamento
- student: cursos, módulos, certificados

MÓDULOS IMPLEMENTADOS:
1. Auth + RBAC (Supabase Auth + RLS)
2. Engine AXIS™ (8 mesas: hado-quantum, frequencies, chakras, radionica,
   multidimensional, ancestral, prosperidade, relacionamentos)
3. PPG Biometria via webcam (BPM, HRV RMSSD, coerência cardíaca, stress)
4. Sessão ao vivo (PPG + Engine + Chakras + IA simultâneos)
5. Geração de PDF com assinatura digital SHA-256
6. Email transacional (6 templates via Resend)
7. Push notifications (Expo + triggers Supabase pg_net)
8. Stripe billing (checkout, portal, webhooks, plan_guard middleware)
9. App mobile completo iOS + Android
10. Academia (cursos, módulos, certificados)

REGISTRO PROFISSIONAL: Marcia Britto RQH · M-50340-MT-Brasil

PALETA DE CORES:
- Azul mirtilo principal: #5b8dee
- Azul médio: #4a7fd4
- Fundo escuro: #050508
- Cores semânticas dos chakras mantidas

Preciso de: [DESCREVA O QUE PRECISA AQUI]
```

---

## ARQUITETURA DO SISTEMA

```
axis-core/
├── apps/
│   ├── frontend/          Next.js 15 — interface web
│   └── backend/           FastAPI Python — API REST
├── packages/
│   ├── core/              TypeScript types compartilhados
│   └── engine/            AxisEngine — configuração JSON das 8 mesas
├── infra/
│   └── supabase/
│       ├── migrations/
│       │   ├── 001_initial_schema.sql    ← schema completo + RLS
│       │   └── 002_seed_realtime.sql     ← seed + storage + triggers
│       └── functions/                    ← Edge Functions (futuro)
└── mobile/                Expo React Native iOS + Android
```

---

## BANCO DE DADOS — 15 TABELAS

| Tabela | Descrição |
|---|---|
| `profiles` | Usuários (admin, therapist, client, student) |
| `tenants` | Espaços terapêuticos (multi-tenant) |
| `therapists` | Perfil expandido do terapeuta |
| `clients` | Clientes vinculados ao terapeuta |
| `students` | Alunos da academia |
| `sessions` | Sessões terapêuticas |
| `reports` | Relatórios PDF das sessões |
| `axis_tables` | Configuração das 8 mesas do Engine |
| `axis_protocols` | Protocolos salvos por mesa |
| `courses` | Cursos da academia |
| `course_modules` | Módulos de cada curso |
| `telemetry_logs` | Dados biométricos das sessões |
| `biometry_logs` | Logs PPG brutos |
| `notifications` | Notificações in-app |
| `audit_logs` | Auditoria completa de ações |

**RLS habilitado em todas as tabelas.**
**Isolamento por tenant garantido.**

---

## ARQUIVOS ENTREGUES

### Frontend Web (JSX)

| Arquivo | Descrição |
|---|---|
| `axis-core-landing.html` | Landing page institucional — paleta azul mirtilo |
| `AxisCoreFinal.jsx` | **App unificado** — auth + roteamento por role + todos os painéis |
| `AxisCoreAdmin.jsx` | Painel Admin — NOC-style verde terminal, 8 seções |
| `AxisCoreClient.jsx` | Painel Cliente — violeta orgânico, chakras, histórico, agendamento |
| `AxisCoreStudent.jsx` | Painel Aluno — pergaminho dourado, cursos, certificados |
| `AxisBiometry.jsx` | Monitor PPG standalone — waveform, BPM, HRV, coerência |
| `AxisLiveSession.jsx` | Sessão ao vivo — PPG + Engine + Chakras + IA integrados |
| `AxisEngineIndex.jsx` | Index interativo das 8 mesas do Engine |

### Backend Python

| Arquivo | Descrição |
|---|---|
| `axis-core-fase1.tar.gz` | Monorepo completo — FastAPI + Next.js + SQL (77 arquivos) |
| `email_service.py` | 6 templates HTML + Resend API |
| `pdf_service.py` | WeasyPrint + assinatura SHA-256 + upload Supabase |
| `push_and_stripe.py` | Push notifications + Stripe billing completo |

### Banco de Dados SQL

| Arquivo | Descrição |
|---|---|
| `001_initial_schema.sql` | Schema completo — 15 tabelas + RLS + índices |
| `002_seed_realtime_storage.sql` | Seed + Realtime + Storage buckets + triggers |

### Mobile

| Arquivo | Descrição |
|---|---|
| `axis-core-mobile.tar.gz` | App Expo completo — 28 arquivos — iOS + Android |

### Infraestrutura

| Arquivo | Descrição |
|---|---|
| `realtime.ts` | Hooks Supabase Realtime (sessões, telemetria, notificações) |
| `DEPLOY_GUIDE.md` | Guia deploy 10 passos do zero ao ar |
| `PricingPage.jsx` | Página de planos e preços com checkout Stripe |

---

## ENGINE AXIS™ — 8 MESAS

| Mesa | Slug | Frequência base |
|---|---|---|
| Mesa Hado Quantum | `hado-quantum` | 440 Hz |
| Mesa de Frequências | `frequencies` | 528 Hz |
| Mesa de Chakras | `chakras` | 396–963 Hz |
| Máquina Radiônica | `radionica` | configurável |
| Mesa Multidimensional | `multidimensional` | 528 Hz |
| Mesa Ancestral | `ancestral` | configurável |
| Mesa Prosperidade | `prosperidade` | configurável |
| Mesa Relacionamentos | `relacionamentos` | configurável |

**Controle via MQTT:** tópico `axis/{slug}/{start|stop|status|data}`
**Hardware:** ESP32 conectado via MQTT/TLS porta 8883

---

## PPG BIOMETRIA

**Como funciona:**
1. Câmera frontal (webcam ou celular) captura frames a 30fps
2. Extrai canal verde (G) de ROI central 80×80px
3. Algoritmo detecta picos do sinal fotopletismográfico
4. Calcula BPM via intervalos RR médios
5. Calcula RMSSD (variabilidade da frequência cardíaca)
6. Deriva coerência cardíaca e índice de stress

**Métricas produzidas:**
- BPM (batimentos por minuto)
- HRV RMSSD (ms) — variabilidade
- Coerência cardíaca (%) — 0-99
- Índice de stress (%) — 0-100

**Qualidade do sinal:** good / poor / idle

---

## PLANOS STRIPE

| Plano | Preço | Terapeutas | Clientes | Sessões/mês |
|---|---|---|---|---|
| Starter | R$97/mês | 1 | 20 | 50 |
| Pro | R$297/mês | 5 | 100 | 300 |
| Enterprise | R$897/mês | ilimitado | ilimitado | ilimitado |

**Trial:** 14 dias grátis em todos os planos.

---

## VARIÁVEIS DE AMBIENTE

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-key

# Backend
ENVIRONMENT=production
BACKEND_SECRET_KEY=gere-com-openssl-rand-hex-32
ALLOWED_ORIGINS=https://seudominio.com

# Email
RESEND_API_KEY=re_xxxx

# Push
EXPO_PUSH_TOKEN=ExponentPushToken[xxxx]

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

# MQTT
MQTT_BROKER_URL=seu-broker.emqxsl.com
MQTT_PORT=8883
MQTT_USERNAME=axis_core
MQTT_PASSWORD=sua-senha

# Redis
REDIS_URL=rediss://xxxx.upstash.io:6380
```

---

## DEPLOY — ORDEM CORRETA

**1. Supabase (banco)**
- Criar projeto em supabase.com
- Executar `001_initial_schema.sql`
- Executar `002_seed_realtime_storage.sql`
- Habilitar Realtime nas tabelas
- Criar buckets Storage (reports, avatars, courses)

**2. Backend (Render)**
- Conectar repositório GitHub
- Runtime: Docker
- Adicionar variáveis de ambiente
- URL: `https://axis-api.onrender.com`

**3. Frontend (Vercel)**
- Importar repositório GitHub
- Framework: Next.js
- Adicionar variáveis `NEXT_PUBLIC_*`
- URL: `https://axiscore.app`

**4. Mobile (EAS)**
```bash
cd axis-core-mobile
npm install
eas build --platform android --profile preview
```

---

## CHAKRAS — CORES SEMÂNTICAS (não alterar)

| Chakra | Cor | Frequência |
|---|---|---|
| Coronário | #ec4899 | 963 Hz |
| Frontal | #8b5cf6 | 852 Hz |
| Laríngeo | #3b82f6 | 741 Hz |
| Cardíaco | #22c55e | 639 Hz |
| Plexo Solar | #eab308 | 528 Hz |
| Sacral | #f97316 | 417 Hz |
| Raiz | #ef4444 | 396 Hz |

---

## ESTÉTICAS DOS PAINÉIS

| Painel | Fundo | Accent | Tipografia |
|---|---|---|---|
| Admin | #040507 terminal preto | #00ff80 verde | Share Tech Mono |
| Terapeuta | #06080f dark navy | #5b8dee azul | DM Mono + Syne |
| Cliente | #07060f dark violet | #b49dff violeta | Cormorant Garamond |
| Aluno | #f5f0e8 pergaminho | #5b8dee azul | Cinzel + Libre Baskerville |
| Landing | #050508 preto | #5b8dee azul mirtilo | Cinzel + DM Mono |

---

## O QUE FALTA PARA PRODUÇÃO REAL

| Item | Prioridade | Complexidade |
|---|---|---|
| Testes automatizados (pytest + Jest) | Alta | Média |
| CI/CD GitHub Actions | Alta | Baixa |
| Monitoring (Sentry) | Média | Baixa |
| Analytics (PostHog) | Média | Baixa |
| Google Calendar sync | Média | Média |
| Certificação A1 assinatura digital | Alta | Alta |
| Multi-idioma (pt/en/es) | Baixa | Média |
| Hardware ESP32 firmware | Alta | Alta |

---

## CONTATO E REGISTRO

**Marcia Britto**
Terapeuta Quântica Registrada e Certificada
RQH · M-50340-MT-Brasil
Practitioner Multidimensional

---

> **Disclaimer obrigatório em todos os módulos:**
> "Ferramenta complementar de desenvolvimento pessoal e terapêutico.
> Não substitui acompanhamento médico, psicológico ou profissional
> de saúde licenciado."

---

**AXIS CORE™ · v1.0.0 · Ecossistema Completo**
