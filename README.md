# AXIS CORE™ — Mobile App
### React Native · Expo SDK 52 · iOS + Android

---

## Stack Técnico

| Camada | Tecnologia |
|---|---|
| Framework | Expo SDK 52 + Expo Router v4 |
| UI | NativeWind v4 (Tailwind para RN) |
| Animações | React Native Reanimated 3 |
| Gestos | React Native Gesture Handler |
| Câmera/PPG | React Native Vision Camera v4 |
| Gráficos SVG | React Native SVG + Skia |
| Auth | Supabase JS + Expo SecureStore |
| State | Zustand + MMKV (persistência) |
| Haptics | Expo Haptics |
| Build | EAS Build (Expo Application Services) |

---

## Arquitetura de Arquivos

```
axis-core-mobile/
├── app/
│   ├── _layout.tsx              # Root layout + auth gate
│   ├── auth/
│   │   └── login.tsx            # Login + demo roles
│   ├── (tabs)/
│   │   ├── _layout.tsx          # Tab navigator por role
│   │   ├── index.tsx            # Dashboard (todos os roles)
│   │   ├── sessions.tsx         # Terapeuta: sessões
│   │   ├── engine.tsx           # Terapeuta: engine AXIS™
│   │   ├── clients.tsx          # Terapeuta: clientes
│   │   ├── ai.tsx               # Terapeuta: IA supervisora
│   │   ├── chakras.tsx          # Cliente: campo energético
│   │   ├── history.tsx          # Cliente: histórico
│   │   ├── schedule.tsx         # Cliente: agendamento
│   │   ├── reports.tsx          # Cliente: relatórios
│   │   ├── courses.tsx          # Aluno: cursos
│   │   ├── progress.tsx         # Aluno: progressão
│   │   └── certs.tsx            # Aluno: certificados
│   └── session/
│       └── live.tsx             # Sessão ao vivo + PPG + Engine
├── lib/
│   ├── supabase/
│   │   └── client.ts            # Supabase + SecureStore adapter
│   ├── store/
│   │   └── auth.ts              # Zustand + MMKV auth store
│   └── ppg/
│       └── engine.ts            # PPG signal processor
├── components/                   # Componentes reutilizáveis
├── app.json                      # Expo config
├── eas.json                      # EAS Build config
├── babel.config.js               # Babel + NativeWind
├── metro.config.js               # Metro + NativeWind
├── tailwind.config.js            # Tailwind tokens
└── global.css                    # NativeWind entry
```

---

## Setup Local

### Pré-requisitos
- Node.js >= 20
- pnpm ou npm
- Expo CLI: `npm install -g expo-cli eas-cli`
- Para iOS: Xcode + Simulator
- Para Android: Android Studio + Emulator

### 1. Instalar dependências

```bash
cd axis-core-mobile
npm install
```

### 2. Configurar Supabase

Crie o arquivo `.env.local`:
```bash
EXPO_PUBLIC_SUPABASE_URL=EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON=sb_publishable_1lwUe6IrfqTGGWginSiWdg_UBg5eKKT
```

### 3. Rodar em desenvolvimento

```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Expo Go (mais simples, sem Vision Camera)
npx expo start
```

---

## Build com EAS

### Development Build (físico)
```bash
eas build --platform ios --profile development
eas build --platform android --profile development
```

### Preview (APK direto)
```bash
eas build --platform android --profile preview
```

### Produção (App Store / Play Store)
```bash
# Configurar credenciais primeiro
eas credentials

# Build produção
eas build --platform all --profile production

# Submit
eas submit --platform ios
eas submit --platform android
```

---

## Funcionalidades por Role

### Admin
- Overview com KPIs e activity feed
- System health em tempo real

### Terapeuta ✦ COMPLETO
- Dashboard com sessões do dia
- **Sessão Ao Vivo**: PPG biometria via câmera + engine + chakras + IA
- Engine AXIS™: 8 mesas com controle MQTT
- Clientes: lista com busca + expandir detalhes
- IA Supervisora: 4 modos (análise, protocolo, relatório, recomendações)

### Cliente
- Dashboard com próxima sessão e chakras
- Campo energético: mandala SVG + barras por chakra
- Histórico: trend de coerência + detalhe expandido
- Agendamento: wizard 4 etapas (data → horário → mesa → confirmar)
- Relatórios: download PDF + compartilhar

### Aluno
- Cursos: lista com módulos expandíveis, next module destacado
- Progressão: streak semanal, gráfico mensal, trilha de aprendizado
- Certificados: visualização + PDF + compartilhar (Share API nativa)

---

## PPG Biometria (Sessão Ao Vivo)

A tela `session/live.tsx` usa:

1. **React Native Vision Camera** para acesso à câmera frontal
2. **PPGEngineJS** (lib/ppg/engine.ts) para processar frames
3. Extrai canal verde (G) de ROI central 80×80px
4. Calcula BPM via detecção de picos
5. Calcula RMSSD (HRV), coerência cardíaca e índice de stress
6. Renderiza waveform em SVG via react-native-svg
7. **Fallback demo**: simula sinal PPG se câmera não disponível

**Como usar:**
- Abra a sessão ao vivo
- Ative a câmera
- Posicione o dedo indicador sobre a câmera frontal **cobrindo completamente a lente**
- Aguarde 15-30 segundos para estabilização do sinal
- O indicador ROI ficará verde quando o sinal estiver bom

---

## Navegação por Role

O router detecta o role automaticamente após login:

```
admin     → tabs: Overview, Tenants, Terapeutas, Auditoria, Sistema
therapist → tabs: Dashboard, Sessões, Engine, Clientes, IA
client    → tabs: Início, Campo, Histórico, Agendar, Relatórios
student   → tabs: Biblioteca, Meus Cursos, Progressão, Certificados
```

---

## Haptics

Todos os toques incluem feedback tátil:
- `selectionAsync()` — navegação entre abas/itens
- `impactAsync(Light)` — ações secundárias
- `impactAsync(Medium)` — ações primárias (iniciar sessão, engine)
- `notificationAsync(Success)` — confirmações
- `notificationAsync(Error)` — erros

---

## Estéticas por Role

| Role | Background | Accent | Tipografia |
|---|---|---|---|
| Admin | #040507 (terminal preto) | #00ff80 (verde) | Share Tech Mono |
| Terapeuta | #06080f (dark navy) | #a5b4fc (indigo) | DM Mono + Syne |
| Cliente | #07060f (dark violet) | #b49dff (violeta) | Cormorant Garamond |
| Aluno | #f5f0e8 (pergaminho) | #c4962a (dourado) | Cinzel + Libre Baskerville |

---

> **Disclaimer:** Ferramenta complementar de desenvolvimento pessoal e terapêutico. Não substitui acompanhamento médico, psicológico ou profissional de saúde licenciado.
