<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AXIS CORE™ — Plataforma Terapêutica Multidimensional</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Bebas+Neue&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet" />

  <style>
    /* ─── RESET & TOKENS ─────────────────────────────────── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --ink:        #0a0b0e;
      --ink-2:      #0f1118;
      --ink-3:      #161822;
      --white:      #f0ece4;
      --white-dim:  rgba(240,236,228,0.55);
      --white-faint:rgba(240,236,228,0.18);
      --white-ghost:rgba(240,236,228,0.07);
      --gold:       #c8a97e;
      --gold-dim:   rgba(200,169,126,0.35);
      --gold-faint: rgba(200,169,126,0.12);
      --mono: 'DM Mono', monospace;
      --serif: 'Cormorant Garamond', serif;
      --display: 'Bebas Neue', sans-serif;
    }

    html { scroll-behavior: smooth; font-size: 16px; }

    body {
      background: var(--ink);
      color: var(--white);
      font-family: var(--serif);
      overflow-x: hidden;
      cursor: none;
    }

    /* ─── CUSTOM CURSOR ──────────────────────────────────── */
    #cursor {
      position: fixed; top: 0; left: 0; z-index: 9999;
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--gold);
      pointer-events: none;
      transform: translate(-50%,-50%);
      transition: transform 0.1s ease, width 0.25s ease, height 0.25s ease, background 0.25s ease;
      mix-blend-mode: difference;
    }
    #cursor-ring {
      position: fixed; top: 0; left: 0; z-index: 9998;
      width: 32px; height: 32px; border-radius: 50%;
      border: 1px solid var(--gold-dim);
      pointer-events: none;
      transform: translate(-50%,-50%);
      transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), width 0.35s ease, height 0.35s ease, border-color 0.3s ease;
    }
    body:has(a:hover) #cursor-ring,
    body:has(button:hover) #cursor-ring { width: 52px; height: 52px; border-color: var(--gold); }

    /* ─── SCROLLBAR ──────────────────────────────────────── */
    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: var(--ink); }
    ::-webkit-scrollbar-thumb { background: var(--gold-dim); }

    /* ─── NOISE OVERLAY ──────────────────────────────────── */
    body::before {
      content: '';
      position: fixed; inset: 0; z-index: 1000; pointer-events: none;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    /* ─── NAV ────────────────────────────────────────────── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 24px 48px;
      border-bottom: 1px solid transparent;
      transition: border-color 0.4s, background 0.4s, padding 0.4s;
    }
    nav.scrolled {
      border-color: var(--white-ghost);
      background: rgba(10,11,14,0.92);
      backdrop-filter: blur(20px);
      padding: 16px 48px;
    }

    .nav-logo {
      display: flex; align-items: baseline; gap: 6px; text-decoration: none;
    }
    .nav-logo-axis {
      font-family: var(--display);
      font-size: 22px; letter-spacing: 0.15em;
      color: var(--gold);
    }
    .nav-logo-core {
      font-family: var(--mono);
      font-size: 11px; color: var(--white-dim);
      letter-spacing: 0.2em;
    }

    .nav-links {
      display: flex; align-items: center; gap: 40px;
      list-style: none;
    }
    .nav-links a {
      font-family: var(--mono);
      font-size: 11px; letter-spacing: 0.12em;
      color: var(--white-dim);
      text-decoration: none;
      text-transform: uppercase;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--white); }

    .nav-cta {
      font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em;
      text-transform: uppercase; text-decoration: none;
      padding: 10px 24px;
      border: 1px solid var(--gold-dim);
      color: var(--gold);
      transition: all 0.25s;
      position: relative; overflow: hidden;
    }
    .nav-cta::before {
      content: ''; position: absolute; inset: 0;
      background: var(--gold); transform: scaleX(0); transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
      z-index: -1;
    }
    .nav-cta:hover { color: var(--ink); border-color: var(--gold); }
    .nav-cta:hover::before { transform: scaleX(1); }

    /* ─── HERO ───────────────────────────────────────────── */
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
      overflow: hidden;
    }

    /* Vertical rule */
    .hero::after {
      content: '';
      position: absolute;
      top: 0; bottom: 0;
      left: 50%; width: 1px;
      background: linear-gradient(to bottom, transparent, var(--white-ghost) 20%, var(--white-ghost) 80%, transparent);
      pointer-events: none;
    }

    .hero-left {
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 0 64px 80px;
      position: relative; z-index: 2;
    }

    .hero-eyebrow {
      font-family: var(--mono); font-size: 10px; letter-spacing: 0.22em;
      text-transform: uppercase; color: var(--gold);
      margin-bottom: 28px;
      display: flex; align-items: center; gap: 12px;
      opacity: 0; animation: fadeUp 0.8s 0.3s forwards;
    }
    .hero-eyebrow::before {
      content: ''; width: 28px; height: 1px; background: var(--gold);
    }

    .hero-title {
      font-family: var(--display);
      font-size: clamp(72px, 9vw, 136px);
      line-height: 0.9;
      letter-spacing: -0.01em;
      color: var(--white);
      margin-bottom: 32px;
      opacity: 0; animation: fadeUp 0.9s 0.5s forwards;
    }
    .hero-title em {
      display: block;
      font-style: normal;
      color: var(--gold);
      -webkit-text-stroke: 0px;
    }

    .hero-subtitle {
      font-family: var(--serif);
      font-size: 18px; font-weight: 300;
      color: var(--white-dim); line-height: 1.75;
      max-width: 380px; margin-bottom: 48px;
      opacity: 0; animation: fadeUp 0.9s 0.7s forwards;
    }

    .hero-actions {
      display: flex; align-items: center; gap: 28px;
      opacity: 0; animation: fadeUp 0.9s 0.9s forwards;
    }

    .btn-primary {
      font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em;
      text-transform: uppercase; text-decoration: none;
      padding: 14px 36px;
      background: var(--gold); color: var(--ink);
      font-weight: 400;
      transition: all 0.25s;
      position: relative; overflow: hidden;
    }
    .btn-primary:hover { background: var(--white); }

    .btn-ghost {
      font-family: var(--mono); font-size: 12px; letter-spacing: 0.1em;
      text-transform: uppercase; text-decoration: none;
      color: var(--white-dim);
      display: flex; align-items: center; gap: 8px;
      transition: color 0.2s;
    }
    .btn-ghost:hover { color: var(--white); }
    .btn-ghost svg { transition: transform 0.2s; }
    .btn-ghost:hover svg { transform: translateX(4px); }

    /* Hero right */
    .hero-right {
      display: flex; flex-direction: column; justify-content: center;
      padding: 120px 64px 80px;
      position: relative;
    }

    /* Circular diagram */
    .diagram-wrap {
      position: relative;
      width: 320px; height: 320px;
      margin: 0 auto 48px;
      opacity: 0; animation: fadeIn 1.2s 1s forwards;
    }
    .diagram-wrap svg { width: 100%; height: 100%; }

    .hero-stats {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 1px; background: var(--white-ghost);
      border: 1px solid var(--white-ghost);
      opacity: 0; animation: fadeUp 0.9s 1.1s forwards;
    }
    .stat-cell {
      background: var(--ink); padding: 20px 22px;
    }
    .stat-value {
      font-family: var(--display);
      font-size: 38px; color: var(--gold); line-height: 1;
      margin-bottom: 4px;
    }
    .stat-label {
      font-family: var(--mono); font-size: 10px;
      letter-spacing: 0.12em; color: var(--white-faint);
      text-transform: uppercase;
    }

    /* ─── SECTION BASE ───────────────────────────────────── */
    section { position: relative; overflow: hidden; }

    .section-rule {
      width: 100%; height: 1px;
      background: linear-gradient(to right, transparent, var(--white-ghost) 30%, var(--white-ghost) 70%, transparent);
    }

    /* ─── MARQUEE ────────────────────────────────────────── */
    .marquee-wrap {
      background: var(--ink-2);
      border-top: 1px solid var(--white-ghost);
      border-bottom: 1px solid var(--white-ghost);
      padding: 16px 0; overflow: hidden;
    }
    .marquee-track {
      display: flex; gap: 0;
      animation: marquee 24s linear infinite;
      white-space: nowrap;
    }
    .marquee-item {
      display: inline-flex; align-items: center; gap: 20px;
      padding: 0 32px;
      font-family: var(--mono); font-size: 11px;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--white-faint);
    }
    .marquee-dot {
      width: 4px; height: 4px; border-radius: 50%;
      background: var(--gold); opacity: 0.6; flex-shrink: 0;
    }
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }

    /* ─── FEATURES ───────────────────────────────────────── */
    .features {
      padding: 120px 48px;
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 80px;
      max-width: 1200px; margin: 0 auto;
    }

    .features-label {
      font-family: var(--mono); font-size: 10px;
      letter-spacing: 0.2em; color: var(--gold);
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .features-heading {
      font-family: var(--serif); font-size: 38px;
      font-weight: 300; line-height: 1.2;
      color: var(--white);
    }
    .features-heading em {
      font-style: italic; color: var(--gold);
    }

    .features-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1px;
      background: var(--white-ghost);
      border: 1px solid var(--white-ghost);
    }
    .feature-card {
      background: var(--ink);
      padding: 36px 32px;
      position: relative;
      transition: background 0.3s;
    }
    .feature-card:hover { background: var(--ink-3); }

    .feature-num {
      font-family: var(--display); font-size: 13px;
      color: var(--gold); letter-spacing: 0.1em;
      margin-bottom: 20px; display: block;
    }
    .feature-title {
      font-family: var(--serif); font-size: 22px;
      font-weight: 400; color: var(--white);
      margin-bottom: 12px; line-height: 1.3;
    }
    .feature-desc {
      font-family: var(--mono); font-size: 11.5px;
      line-height: 1.8; color: var(--white-faint);
    }
    .feature-tag {
      position: absolute; top: 20px; right: 20px;
      font-family: var(--mono); font-size: 9px;
      letter-spacing: 0.12em; text-transform: uppercase;
      padding: 4px 8px;
      border: 1px solid var(--white-ghost);
      color: var(--white-faint);
    }

    /* ─── ARCHITECTURE ───────────────────────────────────── */
    .arch-section {
      padding: 100px 48px;
      max-width: 1200px; margin: 0 auto;
    }
    .arch-header {
      display: flex; justify-content: space-between;
      align-items: flex-end; margin-bottom: 60px;
    }
    .arch-title {
      font-family: var(--display); font-size: clamp(40px, 5vw, 72px);
      line-height: 0.9; color: var(--white);
    }
    .arch-note {
      font-family: var(--mono); font-size: 11px;
      color: var(--white-faint); line-height: 1.7;
      max-width: 260px; text-align: right;
    }

    .arch-layers {
      display: flex; flex-direction: column; gap: 1px;
    }
    .arch-layer {
      display: grid; grid-template-columns: 200px 1fr;
      background: var(--white-ghost);
      transition: all 0.3s;
    }
    .arch-layer:hover .arch-layer-body { background: var(--ink-3); }

    .arch-layer-label {
      background: var(--ink-2);
      padding: 24px 28px;
      display: flex; flex-direction: column; justify-content: center;
      border-right: 1px solid var(--white-ghost);
    }
    .arch-layer-name {
      font-family: var(--display); font-size: 14px;
      letter-spacing: 0.1em; color: var(--gold);
      margin-bottom: 6px;
    }
    .arch-layer-tech {
      font-family: var(--mono); font-size: 10px;
      color: var(--white-faint); letter-spacing: 0.08em;
    }
    .arch-layer-body {
      background: var(--ink);
      padding: 22px 32px;
      display: flex; align-items: center;
      gap: 10px; flex-wrap: wrap;
      transition: background 0.3s;
    }
    .arch-chip {
      font-family: var(--mono); font-size: 11px;
      padding: 6px 12px;
      border: 1px solid var(--white-ghost);
      color: var(--white-dim);
      letter-spacing: 0.06em;
      transition: all 0.2s;
    }
    .arch-layer:hover .arch-chip {
      border-color: var(--gold-dim);
      color: var(--white);
    }

    /* ─── MESAS ──────────────────────────────────────────── */
    .mesas-section {
      padding: 100px 48px;
      max-width: 1200px; margin: 0 auto;
    }
    .mesas-header {
      margin-bottom: 56px;
    }
    .mesas-eyebrow {
      font-family: var(--mono); font-size: 10px;
      letter-spacing: 0.2em; color: var(--gold);
      text-transform: uppercase; margin-bottom: 16px;
    }
    .mesas-title {
      font-family: var(--serif); font-size: clamp(32px, 4vw, 52px);
      font-weight: 300; color: var(--white); line-height: 1.2;
    }

    .mesas-list {
      display: flex; flex-direction: column; gap: 1px;
      border: 1px solid var(--white-ghost);
    }
    .mesa-row {
      display: grid;
      grid-template-columns: 56px 1fr 1fr auto;
      align-items: center;
      background: var(--ink);
      padding: 0;
      transition: background 0.25s;
      cursor: default;
    }
    .mesa-row:hover { background: var(--ink-3); }
    .mesa-row + .mesa-row { border-top: 1px solid var(--white-ghost); }

    .mesa-num {
      font-family: var(--display); font-size: 12px;
      color: var(--white-faint); letter-spacing: 0.1em;
      padding: 24px 0 24px 24px;
      border-right: 1px solid var(--white-ghost);
      text-align: center;
    }
    .mesa-info { padding: 24px 28px; }
    .mesa-name {
      font-family: var(--serif); font-size: 18px;
      color: var(--white); margin-bottom: 4px;
    }
    .mesa-slug {
      font-family: var(--mono); font-size: 10px;
      color: var(--white-faint); letter-spacing: 0.1em;
    }
    .mesa-caps {
      padding: 24px 28px;
      display: flex; gap: 8px; flex-wrap: wrap;
    }
    .mesa-cap {
      font-family: var(--mono); font-size: 10px;
      padding: 3px 9px; letter-spacing: 0.08em;
      border: 1px solid;
    }
    .mesa-cap.on  { border-color: var(--gold-dim); color: var(--gold); }
    .mesa-cap.off { border-color: var(--white-ghost); color: var(--white-faint); }

    .mesa-arrow {
      padding: 24px 24px 24px 0;
      font-size: 14px; color: var(--white-faint);
      transition: all 0.2s;
    }
    .mesa-row:hover .mesa-arrow { color: var(--gold); transform: translateX(4px); }

    /* ─── DISCLAIMER ─────────────────────────────────────── */
    .disclaimer-section {
      padding: 80px 48px;
      max-width: 800px; margin: 0 auto;
      text-align: center;
    }
    .disclaimer-icon {
      font-size: 22px; color: var(--gold-dim); margin-bottom: 20px;
    }
    .disclaimer-text {
      font-family: var(--serif); font-size: 16px;
      font-style: italic; font-weight: 300;
      color: var(--white-faint); line-height: 1.9;
    }

    /* ─── FOOTER ─────────────────────────────────────────── */
    footer {
      border-top: 1px solid var(--white-ghost);
      padding: 48px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .footer-logo {
      font-family: var(--display); font-size: 18px;
      letter-spacing: 0.15em; color: var(--gold);
    }
    .footer-meta {
      font-family: var(--mono); font-size: 10px;
      letter-spacing: 0.1em; color: var(--white-faint);
      text-align: right; line-height: 1.8;
    }
    .footer-links {
      display: flex; gap: 32px; list-style: none;
    }
    .footer-links a {
      font-family: var(--mono); font-size: 10px;
      letter-spacing: 0.12em; text-transform: uppercase;
      text-decoration: none; color: var(--white-faint);
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--gold); }

    /* ─── KEYFRAMES ──────────────────────────────────────── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes spinSlow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes spinReverse {
      from { transform: rotate(0deg); }
      to   { transform: rotate(-360deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.35; }
    }

    /* ─── SCROLL REVEAL ──────────────────────────────────── */
    .reveal {
      opacity: 0; transform: translateY(28px);
      transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ─── RESPONSIVE ─────────────────────────────────────── */
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .hero::after { display: none; }
      .hero-left { padding: 100px 32px 60px; }
      .hero-right { padding: 40px 32px 80px; }
      .features { grid-template-columns: 1fr; padding: 80px 32px; }
      .features-grid { grid-template-columns: 1fr; }
      .arch-header { flex-direction: column; align-items: flex-start; gap: 20px; }
      .arch-note { text-align: left; }
      .arch-layer { grid-template-columns: 140px 1fr; }
      .mesa-row { grid-template-columns: 40px 1fr auto; }
      .mesa-caps { display: none; }
      nav { padding: 20px 24px; }
      .nav-links { display: none; }
      footer { flex-direction: column; gap: 24px; text-align: center; }
      .footer-meta { text-align: center; }
    }
  </style>
</head>
<body>

  <!-- Cursor -->
  <div id="cursor"></div>
  <div id="cursor-ring"></div>

  <!-- NAV -->
  <nav id="nav">
    <a href="#" class="nav-logo">
      <span class="nav-logo-axis">AXIS</span>
      <span class="nav-logo-core">CORE™</span>
    </a>
    <ul class="nav-links">
      <li><a href="#features">Plataforma</a></li>
      <li><a href="#arch">Arquitetura</a></li>
      <li><a href="#mesas">Engine</a></li>
    </ul>
    <a href="#" class="nav-cta">Acessar</a>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <!-- Background grid lines -->
    <div style="
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
      background-image:
        linear-gradient(to right, rgba(240,236,228,0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(240,236,228,0.03) 1px, transparent 1px);
      background-size: 80px 80px;
    "></div>

    <!-- Radial ambient -->
    <div style="
      position: absolute; bottom: -100px; left: -100px;
      width: 600px; height: 600px; border-radius: 50%;
      background: radial-gradient(circle, rgba(200,169,126,0.06) 0%, transparent 60%);
      pointer-events: none;
    "></div>

    <div class="hero-left">
      <div class="hero-eyebrow">Plataforma Enterprise · v1.0</div>

      <h1 class="hero-title">
        AXIS<br/>
        <em>CORE</em><br/>
        ™
      </h1>

      <p class="hero-subtitle">
        Infraestrutura terapêutica modular — sessões em tempo real,
        engine extensível por JSON, biometria e dispositivos físicos
        sob uma arquitetura enterprise.
      </p>

      <div class="hero-actions">
        <a href="#" class="btn-primary">Entrar na Plataforma</a>
        <a href="#arch" class="btn-ghost">
          Ver Arquitetura
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>

    <div class="hero-right">
      <!-- Circular diagram SVG -->
      <div class="diagram-wrap">
        <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer ring rotating -->
          <g style="transform-origin:160px 160px; animation: spinSlow 40s linear infinite;">
            <circle cx="160" cy="160" r="148" stroke="rgba(200,169,126,0.12)" stroke-width="1"/>
            <!-- Tick marks -->
            <g stroke="rgba(200,169,126,0.25)" stroke-width="1">
              <line x1="160" y1="12"  x2="160" y2="26"/>
              <line x1="160" y1="294" x2="160" y2="308"/>
              <line x1="12"  y1="160" x2="26"  y2="160"/>
              <line x1="294" y1="160" x2="308" y2="160"/>
              <line x1="65"  y1="34"  x2="72"  y2="46"/>
              <line x1="248" y1="274" x2="255" y2="286"/>
              <line x1="34"  y1="255" x2="46"  y2="248"/>
              <line x1="274" y1="65"  x2="286" y2="72"/>
            </g>
          </g>

          <!-- Middle ring counter -->
          <g style="transform-origin:160px 160px; animation: spinReverse 25s linear infinite;">
            <circle cx="160" cy="160" r="108" stroke="rgba(200,169,126,0.08)" stroke-width="1" stroke-dasharray="4 8"/>
          </g>

          <!-- Inner ring static -->
          <circle cx="160" cy="160" r="68" stroke="rgba(200,169,126,0.2)" stroke-width="1"/>

          <!-- Center -->
          <circle cx="160" cy="160" r="4" fill="#c8a97e"/>
          <circle cx="160" cy="160" r="28" stroke="rgba(200,169,126,0.3)" stroke-width="1"
            style="animation: pulse 3s ease-in-out infinite;"/>

          <!-- Axis lines -->
          <line x1="92" y1="160" x2="228" y2="160" stroke="rgba(200,169,126,0.15)" stroke-width="1"/>
          <line x1="160" y1="92"  x2="160" y2="228" stroke="rgba(200,169,126,0.15)" stroke-width="1"/>

          <!-- Node dots on inner ring -->
          <circle cx="160" cy="92"  r="3" fill="rgba(200,169,126,0.5)"/>
          <circle cx="228" cy="160" r="3" fill="rgba(200,169,126,0.5)"/>
          <circle cx="160" cy="228" r="3" fill="rgba(200,169,126,0.5)"/>
          <circle cx="92"  cy="160" r="3" fill="rgba(200,169,126,0.5)"/>

          <!-- Diagonal nodes on middle ring -->
          <circle cx="236" cy="84"  r="2.5" fill="rgba(200,169,126,0.35)"
            style="transform-origin:160px 160px; animation: spinReverse 25s linear infinite;"/>
          <circle cx="84"  cy="236" r="2.5" fill="rgba(200,169,126,0.35)"
            style="transform-origin:160px 160px; animation: spinReverse 25s linear infinite;"/>

          <!-- Labels -->
          <text x="160" y="72" text-anchor="middle"
            font-family="'DM Mono', monospace" font-size="9" fill="rgba(200,169,126,0.6)" letter-spacing="0.12em">
            FRONTEND
          </text>
          <text x="248" y="165" text-anchor="start"
            font-family="'DM Mono', monospace" font-size="9" fill="rgba(200,169,126,0.6)" letter-spacing="0.12em">
            MQTT
          </text>
          <text x="160" y="248" text-anchor="middle"
            font-family="'DM Mono', monospace" font-size="9" fill="rgba(200,169,126,0.6)" letter-spacing="0.12em">
            BACKEND
          </text>
          <text x="72" y="165" text-anchor="end"
            font-family="'DM Mono', monospace" font-size="9" fill="rgba(200,169,126,0.6)" letter-spacing="0.12em">
            DATA
          </text>

          <!-- Center label -->
          <text x="160" y="155" text-anchor="middle"
            font-family="'Bebas Neue', sans-serif" font-size="13" fill="#c8a97e" letter-spacing="0.2em">
            AXIS
          </text>
          <text x="160" y="169" text-anchor="middle"
            font-family="'DM Mono', monospace" font-size="8" fill="rgba(200,169,126,0.5)" letter-spacing="0.15em">
            ENGINE
          </text>
        </svg>
      </div>

      <!-- Stats -->
      <div class="hero-stats">
        <div class="stat-cell">
          <div class="stat-value">5</div>
          <div class="stat-label">Mesas / Engine</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">4</div>
          <div class="stat-label">Perfis RBAC</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">WS</div>
          <div class="stat-label">Tempo Real</div>
        </div>
        <div class="stat-cell">
          <div class="stat-value">E2E</div>
          <div class="stat-label">Multi-Tenant</div>
        </div>
      </div>
    </div>
  </section>

  <!-- MARQUEE -->
  <div class="marquee-wrap">
    <div class="marquee-track" id="marquee">
      <!-- duplicated for seamless loop -->
    </div>
  </div>

  <!-- FEATURES -->
  <section class="features" id="features">
    <div>
      <div class="features-label reveal">Fundação Técnica</div>
      <h2 class="features-heading reveal">Uma plataforma<br/><em>desenhada</em><br/>para escalar.</h2>
    </div>

    <div class="features-grid reveal">
      <div class="feature-card">
        <span class="feature-tag">CORE</span>
        <span class="feature-num">01</span>
        <h3 class="feature-title">Sessões em Tempo Real</h3>
        <p class="feature-desc">WebSocket persistente por sessão. Broadcast isolado por tenant. Reconexão automática com backoff exponencial.</p>
      </div>
      <div class="feature-card">
        <span class="feature-tag">ENGINE</span>
        <span class="feature-num">02</span>
        <h3 class="feature-title">AxisEngine Modular</h3>
        <p class="feature-desc">Mesas definidas em JSON. Registry singleton extensível. Loader com validação de schema. Novos módulos sem deploy.</p>
      </div>
      <div class="feature-card">
        <span class="feature-tag">INFRA</span>
        <span class="feature-num">03</span>
        <h3 class="feature-title">Dispositivos Físicos</h3>
        <p class="feature-desc">Comunicação MQTT com ESP32. Tópicos por mesa. Status em tempo real. Suporte a múltiplos dispositivos por tenant.</p>
      </div>
      <div class="feature-card">
        <span class="feature-tag">DATA</span>
        <span class="feature-num">04</span>
        <h3 class="feature-title">Multi-Tenancy + RLS</h3>
        <p class="feature-desc">Isolamento por tenant no banco de dados. Row Level Security no Supabase. Cada terapeuta opera em namespace isolado.</p>
      </div>
      <div class="feature-card">
        <span class="feature-tag">AUTH</span>
        <span class="feature-num">05</span>
        <h3 class="feature-title">RBAC Granular</h3>
        <p class="feature-desc">Quatro perfis: Admin, Terapeuta, Cliente, Aluno. Permissões por recurso e ação. Middleware automático no frontend.</p>
      </div>
      <div class="feature-card">
        <span class="feature-tag">OPS</span>
        <span class="feature-num">06</span>
        <h3 class="feature-title">Deploy Contínuo</h3>
        <p class="feature-desc">Vercel + Render + Supabase. Docker multi-stage. Turborepo monorepo. CI/CD automático a cada push.</p>
      </div>
    </div>
  </section>

  <div class="section-rule"></div>

  <!-- ARCHITECTURE -->
  <div style="background: var(--ink-2); padding: 1px 0;">
  <section class="arch-section" id="arch">
    <div class="arch-header reveal">
      <h2 class="arch-title">STACK<br/>TÉCNICO</h2>
      <p class="arch-note">
        Arquitetura separada por camadas.<br/>
        Cada serviço com responsabilidade única<br/>
        e deploy independente.
      </p>
    </div>

    <div class="arch-layers reveal">
      <div class="arch-layer">
        <div class="arch-layer-label">
          <div class="arch-layer-name">FRONTEND</div>
          <div class="arch-layer-tech">Vercel · Edge</div>
        </div>
        <div class="arch-layer-body">
          <span class="arch-chip">Next.js 15</span>
          <span class="arch-chip">TypeScript</span>
          <span class="arch-chip">Tailwind CSS</span>
          <span class="arch-chip">Shadcn UI</span>
          <span class="arch-chip">Zustand</span>
          <span class="arch-chip">WebSocket Client</span>
        </div>
      </div>
      <div class="arch-layer">
        <div class="arch-layer-label">
          <div class="arch-layer-name">BACKEND</div>
          <div class="arch-layer-tech">Render · Docker</div>
        </div>
        <div class="arch-layer-body">
          <span class="arch-chip">FastAPI</span>
          <span class="arch-chip">Python 3.12</span>
          <span class="arch-chip">Pydantic v2</span>
          <span class="arch-chip">WebSockets</span>
          <span class="arch-chip">aiomqtt</span>
          <span class="arch-chip">Celery</span>
        </div>
      </div>
      <div class="arch-layer">
        <div class="arch-layer-label">
          <div class="arch-layer-name">DADOS</div>
          <div class="arch-layer-tech">Supabase</div>
        </div>
        <div class="arch-layer-body">
          <span class="arch-chip">PostgreSQL</span>
          <span class="arch-chip">Row Level Security</span>
          <span class="arch-chip">Supabase Auth</span>
          <span class="arch-chip">Supabase Storage</span>
          <span class="arch-chip">Redis · Upstash</span>
        </div>
      </div>
      <div class="arch-layer">
        <div class="arch-layer-label">
          <div class="arch-layer-name">FÍSICO</div>
          <div class="arch-layer-tech">EMQX · ESP32</div>
        </div>
        <div class="arch-layer-body">
          <span class="arch-chip">MQTT v5</span>
          <span class="arch-chip">EMQX Cloud</span>
          <span class="arch-chip">ESP32</span>
          <span class="arch-chip">Sensores HRV</span>
          <span class="arch-chip">LEDs Frequenciais</span>
        </div>
      </div>
      <div class="arch-layer">
        <div class="arch-layer-label">
          <div class="arch-layer-name">ENGINE</div>
          <div class="arch-layer-tech">Turborepo · packages/</div>
        </div>
        <div class="arch-layer-body">
          <span class="arch-chip">AxisTableRegistry</span>
          <span class="arch-chip">AxisTableLoader</span>
          <span class="arch-chip">JSON-driven</span>
          <span class="arch-chip">@axis/core types</span>
          <span class="arch-chip">5 mesas nativas</span>
        </div>
      </div>
    </div>
  </section>
  </div>

  <div class="section-rule"></div>

  <!-- MESAS -->
  <section class="mesas-section" id="mesas">
    <div class="mesas-header reveal">
      <div class="mesas-eyebrow">AxisEngine · 5 Módulos</div>
      <h2 class="mesas-title">Mesas carregáveis<br/>por configuração JSON.</h2>
    </div>

    <div class="mesas-list reveal">
      <div class="mesa-row">
        <div class="mesa-num">01</div>
        <div class="mesa-info">
          <div class="mesa-name">Mesa Hado Quantum</div>
          <div class="mesa-slug">axis/hado · hado_quantum</div>
        </div>
        <div class="mesa-caps">
          <span class="mesa-cap on">Realtime</span>
          <span class="mesa-cap on">Físico</span>
          <span class="mesa-cap off">Biometria</span>
          <span class="mesa-cap off">Multi-user</span>
        </div>
        <div class="mesa-arrow">→</div>
      </div>
      <div class="mesa-row">
        <div class="mesa-num">02</div>
        <div class="mesa-info">
          <div class="mesa-name">Mesa Multidimensional</div>
          <div class="mesa-slug">axis/multi · multidimensional</div>
        </div>
        <div class="mesa-caps">
          <span class="mesa-cap on">Realtime</span>
          <span class="mesa-cap on">Físico</span>
          <span class="mesa-cap on">Biometria</span>
          <span class="mesa-cap on">Multi-user</span>
        </div>
        <div class="mesa-arrow">→</div>
      </div>
      <div class="mesa-row">
        <div class="mesa-num">03</div>
        <div class="mesa-info">
          <div class="mesa-name">Máquina Radiônica</div>
          <div class="mesa-slug">axis/radionica · radionica</div>
        </div>
        <div class="mesa-caps">
          <span class="mesa-cap off">Realtime</span>
          <span class="mesa-cap on">Físico</span>
          <span class="mesa-cap off">Biometria</span>
          <span class="mesa-cap off">Multi-user</span>
        </div>
        <div class="mesa-arrow">→</div>
      </div>
      <div class="mesa-row">
        <div class="mesa-num">04</div>
        <div class="mesa-info">
          <div class="mesa-name">Mesa de Chakras</div>
          <div class="mesa-slug">axis/chakras · chakras</div>
        </div>
        <div class="mesa-caps">
          <span class="mesa-cap on">Realtime</span>
          <span class="mesa-cap on">Físico</span>
          <span class="mesa-cap on">Biometria</span>
          <span class="mesa-cap off">Multi-user</span>
        </div>
        <div class="mesa-arrow">→</div>
      </div>
      <div class="mesa-row">
        <div class="mesa-num">05</div>
        <div class="mesa-info">
          <div class="mesa-name">Mesa de Frequências</div>
          <div class="mesa-slug">axis/frequencies · frequencies</div>
        </div>
        <div class="mesa-caps">
          <span class="mesa-cap on">Realtime</span>
          <span class="mesa-cap on">Físico</span>
          <span class="mesa-cap on">Biometria</span>
          <span class="mesa-cap off">Multi-user</span>
        </div>
        <div class="mesa-arrow">→</div>
      </div>
    </div>
  </section>

  <div class="section-rule"></div>

  <!-- DISCLAIMER -->
  <section class="disclaimer-section">
    <div class="disclaimer-icon">⊹</div>
    <p class="disclaimer-text reveal">
      "Ferramenta complementar de desenvolvimento pessoal e terapêutico.<br/>
      Não substitui acompanhamento médico, psicológico<br/>
      ou profissional de saúde licenciado."
    </p>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-logo">AXIS CORE™</div>
    <ul class="footer-links">
      <li><a href="#">Documentação</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">Engine</a></li>
      <li><a href="#">Deploy</a></li>
    </ul>
    <div class="footer-meta">
      v1.0.0 · Fase 1<br/>
      Next.js 15 + FastAPI + Supabase
    </div>
  </footer>

  <script>
    // ── Cursor ──────────────────────────────────────────────
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    })();

    // ── Nav scroll ──────────────────────────────────────────
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Marquee content ─────────────────────────────────────
    const items = [
      'Next.js 15','FastAPI','Supabase','MQTT','WebSocket',
      'Multi-Tenancy','RBAC','AxisEngine','Turborepo',
      'PostgreSQL','Redis','ESP32','TypeScript','Python 3.12',
      'Docker','Vercel','Render','Real-Time','Row Level Security',
    ];
    const track = document.getElementById('marquee');
    const full  = [...items, ...items].map(t =>
      `<span class="marquee-item"><span class="marquee-dot"></span>${t}</span>`
    ).join('');
    track.innerHTML = full;

    // ── Scroll reveal ───────────────────────────────────────
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>
</body>
</html>
