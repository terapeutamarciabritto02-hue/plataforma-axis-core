// components/billing/PricingPage.jsx
// Página de planos e preços com checkout Stripe integrado

import { useState } from "react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: 97,
    period: "mês",
    trial: "14 dias grátis",
    color: "#06b6d4",
    glyph: "◇",
    features: [
      "1 terapeuta",
      "Até 20 clientes",
      "50 sessões / mês",
      "Engine AXIS™ — 5 mesas",
      "Relatórios PDF básicos",
      "Suporte por email",
    ],
    limits: { therapists:1, clients:20, sessions:50 },
  },
  {
    id: "pro",
    name: "Pro",
    price: 297,
    period: "mês",
    trial: "14 dias grátis",
    color: "#a5b4fc",
    glyph: "◈",
    highlighted: true,
    features: [
      "Até 5 terapeutas",
      "Até 100 clientes",
      "300 sessões / mês",
      "Engine AXIS™ — 8 mesas",
      "IA Supervisora (500 calls/mês)",
      "PPG Biometria",
      "PDF profissionais + assinatura digital",
      "Push notifications",
      "Suporte prioritário",
    ],
    limits: { therapists:5, clients:100, sessions:300 },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 897,
    period: "mês",
    trial: "14 dias grátis",
    color: "#c8a97e",
    glyph: "✦",
    features: [
      "Terapeutas ilimitados",
      "Clientes ilimitados",
      "Sessões ilimitadas",
      "Todas as mesas + personalizadas",
      "IA ilimitada",
      "White-label disponível",
      "SLA 99.9%",
      "Suporte dedicado",
      "Integração custom ESP32",
      "Treinamento da equipe",
    ],
    limits: { therapists:999, clients:9999, sessions:9999 },
  },
];

const FAQ = [
  { q:"Posso cancelar a qualquer momento?",                 a:"Sim. O cancelamento é feito pelo portal do cliente Stripe e vale ao final do período já pago. Sem multas." },
  { q:"O que acontece ao fim do trial de 14 dias?",        a:"Você escolhe um plano para continuar. Se não escolher, a conta entra em modo leitura (sem novas sessões)." },
  { q:"Posso mudar de plano depois?",                      a:"Sim, upgrade ou downgrade a qualquer momento pelo painel de configurações." },
  { q:"Os dados ficam seguros?",                           a:"Sim. Banco PostgreSQL com RLS, autenticação Supabase, dados criptografados em repouso e em trânsito." },
  { q:"O app mobile está incluído?",                       a:"Sim. iOS e Android incluídos em todos os planos sem custo adicional." },
  { q:"Posso ter minha própria marca (white-label)?",      a:"Disponível no plano Enterprise. Inclui domínio próprio, logo customizada e remoção da marca AXIS CORE™." },
];

export default function PricingPage({ currentPlan = null, tenantId = null }) {
  const [loading, setLoading]   = useState(null);
  const [annual, setAnnual]     = useState(false);
  const [openFaq, setOpenFaq]   = useState(null);

  async function handleCheckout(planId) {
    setLoading(planId);
    try {
      const res = await fetch(`/api/backend/v1/billing/checkout/${planId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const { checkout_url } = await res.json();
      window.location.href = checkout_url;
    } catch(e) {
      alert("Erro ao criar checkout: " + e.message);
    } finally {
      setLoading(null);
    }
  }

  const discount = annual ? 0.83 : 1; // 17% de desconto anual

  return (
    <div style={{ minHeight:"100vh", background:"#08090f", color:"#fff", fontFamily:"system-ui,sans-serif", padding:"48px 24px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#08090f}
        @keyframes shimmer{0%,100%{opacity:1}50%{opacity:0.6}}
      `}</style>

      {/* Header */}
      <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", marginBottom:56 }}>
        <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:"0.2em", marginBottom:12 }}>
          AXIS CORE™ · PLANOS
        </p>
        <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(32px,5vw,52px)", fontWeight:800, letterSpacing:"-0.02em", marginBottom:12 }}>
          Escolha seu plano
        </h1>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", marginBottom:28 }}>
          14 dias grátis em todos os planos. Sem cartão de crédito para começar.
        </p>

        {/* Annual toggle */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.05)", borderRadius:99, border:"1px solid rgba(255,255,255,0.08)", padding:"8px 20px" }}>
          <span style={{ fontSize:12, color: annual?"rgba(255,255,255,0.4)":"#fff", fontFamily:"'DM Mono',monospace" }}>Mensal</span>
          <button onClick={()=>setAnnual(a=>!a)} style={{
            width:44, height:24, borderRadius:12, border:"none", cursor:"pointer", position:"relative",
            background: annual ? "#a5b4fc" : "rgba(255,255,255,0.15)", transition:"all 0.25s",
          }}>
            <div style={{ width:18, height:18, borderRadius:9, background:"#fff", position:"absolute", top:3, left: annual?23:3, transition:"left 0.25s" }}/>
          </button>
          <span style={{ fontSize:12, color: annual?"#fff":"rgba(255,255,255,0.4)", fontFamily:"'DM Mono',monospace" }}>
            Anual <span style={{ color:"#4ade80", marginLeft:4 }}>−17%</span>
          </span>
        </div>
      </div>

      {/* Plans grid */}
      <div style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:64 }}>
        {PLANS.map(plan => {
          const price = Math.round(plan.price * discount);
          const isCurrent = currentPlan === plan.id;
          const isLoading = loading === plan.id;
          return (
            <div key={plan.id} style={{
              background: plan.highlighted ? "rgba(165,180,252,0.06)" : "rgba(15,17,26,0.8)",
              border: `1px solid ${plan.highlighted ? plan.color+"44" : "rgba(255,255,255,0.07)"}`,
              borderRadius:16, padding:"28px 24px", position:"relative",
              boxShadow: plan.highlighted ? `0 0 40px ${plan.color}18` : "none",
            }}>
              {/* Most popular badge */}
              {plan.highlighted && (
                <div style={{ position:"absolute", top:-12, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#6366f1,#a5b4fc)", borderRadius:99, padding:"4px 16px" }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#fff", letterSpacing:"0.1em" }}>MAIS POPULAR</span>
                </div>
              )}

              {/* Plan header */}
              <div style={{ marginBottom:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ fontSize:22, color:plan.color }}>{plan.glyph}</span>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, color:"#fff" }}>{plan.name}</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:4 }}>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, color:plan.color }}>
                    R${price}
                  </span>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>/{plan.period}</span>
                </div>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#4ade80", letterSpacing:"0.06em" }}>{plan.trial}</span>
              </div>

              {/* Features */}
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                    <span style={{ color:plan.color, fontSize:12, marginTop:1, flexShrink:0 }}>✓</span>
                    <span style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.4 }}>{f}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => !isCurrent && handleCheckout(plan.id)}
                disabled={isCurrent || isLoading}
                style={{
                  width:"100%", padding:"13px", borderRadius:10, border:"none", cursor: isCurrent?"default":"pointer",
                  background: isCurrent?"rgba(255,255,255,0.08)":plan.highlighted?`linear-gradient(135deg,#6366f1,${plan.color})`:`${plan.color}22`,
                  color: isCurrent?"rgba(255,255,255,0.35)":plan.highlighted?"#fff":plan.color,
                  fontFamily:"'DM Mono',monospace", fontSize:12, letterSpacing:"0.1em",
                  transition:"all 0.2s", opacity:isLoading?0.7:1,
                }}
              >
                {isLoading ? "Aguarde..." : isCurrent ? "PLANO ATUAL" : "COMEÇAR AGORA →"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Comparison table */}
      <div style={{ maxWidth:900, margin:"0 auto 64px" }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:700, textAlign:"center", marginBottom:28 }}>
          Comparativo completo
        </h2>
        <div style={{ background:"rgba(15,17,26,0.8)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, overflow:"hidden" }}>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", background:"rgba(255,255,255,0.03)", padding:"12px 20px" }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"rgba(255,255,255,0.4)" }}>RECURSO</span>
            {PLANS.map(p => <span key={p.id} style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:p.color, textAlign:"center" }}>{p.name.toUpperCase()}</span>)}
          </div>
          {[
            ["Terapeutas",       "1",        "5",       "Ilimitado"],
            ["Clientes",         "20",       "100",     "Ilimitado"],
            ["Sessões/mês",      "50",       "300",     "Ilimitado"],
            ["Mesas Engine",     "5",        "8",       "8 + Custom"],
            ["IA Supervisora",   "—",        "500/mês", "Ilimitado"],
            ["PPG Biometria",    "—",        "✓",       "✓"],
            ["PDF Profissional", "Básico",   "Completo","Completo"],
            ["Push Notifications","—",       "✓",       "✓"],
            ["App Mobile",       "✓",        "✓",       "✓"],
            ["Suporte",          "Email",    "Prioritário","Dedicado"],
            ["White-label",      "—",        "—",       "✓"],
            ["SLA",              "—",        "99.5%",   "99.9%"],
          ].map(([feature, ...values], i) => (
            <div key={feature} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", padding:"12px 20px", borderTop:"1px solid rgba(255,255,255,0.05)", background:i%2===0?"transparent":"rgba(255,255,255,0.01)" }}>
              <span style={{ fontSize:13, color:"rgba(255,255,255,0.7)" }}>{feature}</span>
              {values.map((v, j) => (
                <span key={j} style={{ fontSize:12, color:v==="—"?"rgba(255,255,255,0.2)":v==="✓"?PLANS[j].color:"rgba(255,255,255,0.65)", textAlign:"center", fontFamily:v==="—"||v==="✓"?"inherit":"'DM Mono',monospace" }}>
                  {v}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth:680, margin:"0 auto 64px" }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:700, textAlign:"center", marginBottom:28 }}>
          Perguntas frequentes
        </h2>
        {FAQ.map((item, i) => (
          <div key={i} style={{ borderBottom:"1px solid rgba(255,255,255,0.07)", overflow:"hidden" }}>
            <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
              style={{ width:"100%", padding:"16px 0", background:"none", border:"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16 }}>
              <span style={{ fontSize:14, color:"#fff", textAlign:"left", fontWeight:"600" }}>{item.q}</span>
              <span style={{ color:"rgba(255,255,255,0.4)", fontSize:16, flexShrink:0, transition:"transform 0.2s", transform:openFaq===i?"rotate(180deg)":"none" }}>▾</span>
            </button>
            {openFaq===i && (
              <div style={{ paddingBottom:16 }}>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.7 }}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer disclaimer */}
      <p style={{ textAlign:"center", fontSize:11, color:"rgba(255,255,255,0.2)", maxWidth:600, margin:"0 auto", lineHeight:1.7, fontFamily:"'DM Mono',monospace" }}>
        Todos os planos incluem período de teste gratuito de 14 dias. Cobrança em BRL.
        Ferramenta complementar de desenvolvimento pessoal. Não substitui acompanhamento médico licenciado.
      </p>
    </div>
  );
}
