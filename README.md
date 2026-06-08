# AXIS CORE™ — Monorepo

Plataforma terapêutica multidimensional. Stack: Next.js 15 + FastAPI + Supabase + MQTT.

---

## Pré-requisitos

- Node.js >= 20
- pnpm >= 9 (`npm install -g pnpm`)
- Python 3.12
- Docker + Docker Compose
- Conta Supabase (gratuita em supabase.com)

---

## Setup em 5 passos

### 1. Clone e instale dependências

```bash
git clone https://github.com/seu-usuario/axis-core.git
cd axis-core
pnpm install
```

### 2. Configure variáveis de ambiente

```bash
cp .env.example apps/frontend/.env.local
cp .env.example apps/backend/.env
```

Edite os dois arquivos com suas credenciais Supabase.

### 3. Execute o schema no Supabase

No Supabase Dashboard → SQL Editor → New Query:

```
Cole o conteúdo de: infra/supabase/migrations/001_initial_schema.sql
```

Clique em **Run**.

### 4. Suba os serviços de infraestrutura

```bash
cd infra
docker-compose up -d
```

Isso inicia:
- MQTT broker (EMQX) em `localhost:1883`
- Redis em `localhost:6379`
- Backend FastAPI em `localhost:8000`

### 5. Inicie o frontend

```bash
cd apps/frontend
pnpm dev
```

Acesse: `http://localhost:3000`

---

## Estrutura do Projeto

```
axis-core/
├── apps/
│   ├── frontend/        Next.js 15 + TypeScript + Tailwind
│   └── backend/         FastAPI + Python 3.12
├── packages/
│   ├── core/            Tipos TypeScript compartilhados
│   ├── engine/          AxisEngine modular (JSON tables)
│   └── shared/          Utilitários comuns
├── infra/
│   ├── docker-compose.yml
│   └── supabase/migrations/
└── docs/
```

---

## API

Com o backend rodando, acesse a documentação em:

```
http://localhost:8000/docs
```

Endpoints principais:

| Método | Endpoint                        | Descrição               |
|--------|---------------------------------|-------------------------|
| POST   | `/api/v1/auth/signup`           | Criar conta             |
| POST   | `/api/v1/auth/signin`           | Login                   |
| GET    | `/api/v1/users/me`              | Perfil próprio          |
| GET    | `/api/v1/clients/`              | Listar clientes         |
| POST   | `/api/v1/sessions/`             | Criar sessão            |
| POST   | `/api/v1/sessions/{id}/start`   | Iniciar sessão          |
| POST   | `/api/v1/engine/command`        | Comando MQTT para mesa  |
| WS     | `/ws/session/{id}`              | Stream em tempo real    |

---

## Deploy

| Camada   | Plataforma     | Comando/Config             |
|----------|----------------|----------------------------|
| Frontend | Vercel         | `vercel --prod`            |
| Backend  | Render         | `render.yaml` na raiz      |
| Banco    | Supabase       | SQL migration executado    |
| MQTT     | EMQX Cloud     | Variáveis MQTT no `.env`   |
| Cache    | Upstash Redis  | `REDIS_URL` no `.env`      |

---

## AxisEngine — Adicionar nova mesa

Crie um arquivo JSON em `packages/engine/src/tables/`:

```json
{
  "id": "table-minha-mesa-v1",
  "slug": "minha-mesa",
  "name": "Minha Mesa",
  "type": "frequencies",
  "version": "1.0.0",
  "description": "Descrição da mesa",
  "author": "Seu nome",
  "parameters": [...],
  "default_steps": [...],
  "mqtt_topics": { "start": "axis/minha-mesa/start", ... },
  "capabilities": { "realtime": true, "physical_device": false, ... }
}
```

Registre em `packages/engine/src/index.ts`:
```typescript
import('./tables/minha-mesa.json')
```

---

## Aviso

> Ferramenta complementar de desenvolvimento pessoal. Não substitui acompanhamento médico, psicológico ou profissional de saúde licenciado.
