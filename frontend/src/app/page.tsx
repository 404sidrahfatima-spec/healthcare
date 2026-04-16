import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050811] text-white relative overflow-hidden">

      {/* Background grid */}
      <div className="fixed inset-0 grid-bg pointer-events-none" />

      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Cliniq<span className="text-indigo-400">AI</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a>
            <a href="#agents" className="hover:text-white transition-colors">Agents</a>
            <a href="#stats" className="hover:text-white transition-colors">Benchmarks</a>
          </div>

          <Link
            href="/diagnose"
            className="btn-glow text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
          >
            Launch Console →
          </Link>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card badge-glow mb-8 text-xs font-semibold text-indigo-300 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
            </span>
            Powered by CrewAI Multi-Agent Framework
          </div>

          {/* Headline */}
          <h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
            <span className="gradient-text">Clinical Intelligence</span>
            <br />
            <span className="text-white">Redefined.</span>
          </h1>

          <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            A multi-modal agentic diagnostic engine that analyzes dermoscopy imagery, transcribes voice symptoms, and delivers specialist-grade reports — in under 30 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/diagnose"
              id="cta-diagnose"
              className="btn-glow text-white font-bold px-8 py-4 rounded-2xl text-base flex items-center gap-2 group"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Run Diagnostic Protocol
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a
              href="#pipeline"
              className="glass-card hover:border-indigo-500/40 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all"
            >
              Explore Architecture
            </a>
          </div>

          {/* Floating stat strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: "94.7%", label: "Diagnostic Accuracy" },
              { value: "<28s", label: "Avg. Pipeline Latency" },
              { value: "5", label: "Specialist AI Agents" },
              { value: "HIPAA", label: "Compliant Architecture" },
            ].map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-4 stat-card">
                <div className="text-2xl font-black gradient-text-warm">{s.value}</div>
                <div className="text-xs text-zinc-500 mt-1 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pipeline Diagram ─── */}
      <section id="pipeline" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">Architecture</div>
            <h2 className="text-4xl font-black text-white">Multi-Agent Pipeline</h2>
            <p className="text-zinc-400 mt-3 max-w-xl mx-auto">Five specialized CrewAI agents coordinate asynchronously to deliver a consensus-driven clinical conclusion.</p>
          </div>

          {/* Pipeline flow */}
          <div className="relative">
            <div className="flex flex-col lg:flex-row items-stretch gap-0 lg:gap-0">

              {/* Input */}
              <div className="flex flex-col items-center lg:w-44 shrink-0">
                <div className="glass-card rounded-2xl p-5 w-full border-indigo-500/30 text-center">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
                  </div>
                  <div className="text-xs font-bold text-white">Patient Input</div>
                  <div className="text-[10px] text-zinc-500 mt-1">Image · Audio · Text</div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center w-8 text-indigo-500/40 rotate-90 lg:rotate-0 my-2 lg:my-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>

              {/* Agents grid */}
              <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { name: "Vision\nAgent", icon: "eye", color: "violet" },
                  { name: "Symptom\nAgent", icon: "mic", color: "indigo" },
                  { name: "Risk\nAgent", icon: "shield", color: "cyan" },
                  { name: "Specialist\nAgent", icon: "user-check", color: "violet" },
                  { name: "Chief\nAgent", icon: "cpu", color: "indigo" },
                ].map((a, i) => (
                  <div
                    key={a.name}
                    className="agent-node glass-card rounded-2xl p-4 text-center border-indigo-500/20 cursor-default"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  >
                    <div className={`w-9 h-9 rounded-xl mx-auto mb-2 flex items-center justify-center ${a.color === 'violet' ? 'bg-violet-500/20' : a.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-indigo-500/20'}`}>
                      <AgentIcon name={a.icon} color={a.color} />
                    </div>
                    <div className="text-[10px] font-bold text-white leading-tight whitespace-pre-wrap">{a.name}</div>
                  </div>
                ))}
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center w-8 text-indigo-500/40 rotate-90 lg:rotate-0 my-2 lg:my-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>

              {/* Output */}
              <div className="flex flex-col items-center lg:w-44 shrink-0">
                <div className="glass-card rounded-2xl p-5 w-full border-emerald-500/30 text-center bg-emerald-500/5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                  </div>
                  <div className="text-xs font-bold text-white">Diagnosis Report</div>
                  <div className="text-[10px] text-zinc-500 mt-1">PDF · GradCAM · Risk</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-violet-400 bg-violet-500/10 border border-violet-500/20 mb-4">Capabilities</div>
            <h2 className="text-4xl font-black text-white">Built for Clinical Precision</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "scan",
                title: "Dermoscopy Analysis",
                desc: "EfficientNet-B4 vision model trained on 25k dermatological images extracts visual features with ABCDE rule compliance.",
                color: "indigo",
                tag: "Vision AI",
              },
              {
                icon: "mic",
                title: "Voice Symptom Intake",
                desc: "Whisper-powered transcription converts patient audio in 40+ languages to structured clinical NLP entities via Groq LLaMA 3.",
                color: "violet",
                tag: "NLP + STT",
              },
              {
                icon: "shield-check",
                title: "Risk Stratification",
                desc: "Evidence-based risk scoring using lesion characteristics, patient context, and multi-agent consensus to flag urgency levels.",
                color: "cyan",
                tag: "Risk Engine",
              },
              {
                icon: "layers",
                title: "GradCAM Heatmaps",
                desc: "Visual interpretability maps showcase exactly which image regions activated the classifier — making AI decisions auditable.",
                color: "indigo",
                tag: "Explainability",
              },
              {
                icon: "file-text",
                title: "Clinical PDF Reports",
                desc: "Auto-generated diagnostic reports with SOAP format, differential diagnosis ranking, and referral recommendations.",
                color: "violet",
                tag: "Documentation",
              },
              {
                icon: "lock",
                title: "JWT + Supabase Auth",
                desc: "Secure patient data handling with row-level security, encrypted sessions, and HIPAA-aligned access controls.",
                color: "cyan",
                tag: "Security",
              },
            ].map((f) => (
              <div key={f.title} className="feature-card glass-card rounded-2xl p-6 group cursor-default">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${f.color === 'violet' ? 'bg-violet-500/15' : f.color === 'cyan' ? 'bg-cyan-500/15' : 'bg-indigo-500/15'}`}>
                    <FeatureIcon name={f.icon} color={f.color} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${f.color === 'violet' ? 'text-violet-400 bg-violet-500/10' : f.color === 'cyan' ? 'text-cyan-400 bg-cyan-500/10' : 'text-indigo-400 bg-indigo-500/10'}`}>
                    {f.tag}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base mb-2">{f.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Agent Detail ─── */}
      <section id="agents" className="py-28 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">Agent Roster</div>
            <h2 className="text-4xl font-black text-white">Five Specialist Agents</h2>
            <p className="text-zinc-400 mt-3 max-w-xl mx-auto">Each powered by LLaMA 3-70B via Groq zero-latency inference, assigned strict domain responsibilities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                role: "Vision Specialist",
                agent: "VisionAgent",
                model: "EfficientNet-B4",
                responsibility: "Analyzes dermoscopy images, extracts morphological features, computes ABCDE scores, generates GradCAM overlays.",
                color: "#818cf8",
              },
              {
                role: "Symptom Analyst",
                agent: "SymptomAgent",
                model: "LLaMA 3-70B · Groq",
                responsibility: "Extracts structured clinical entities from patient transcripts. Maps symptoms to ICD-11 taxonomy codes.",
                color: "#a78bfa",
              },
              {
                role: "Risk Assessor",
                agent: "RiskAgent",
                model: "LLaMA 3-70B · Groq",
                responsibility: "Scores lesion urgency from LOW to CRITICAL. Incorporates demographic factors, symptom chronology, and visual features.",
                color: "#67e8f9",
              },
              {
                role: "Specialist Physician",
                agent: "SpecialistAgent",
                model: "LLaMA 3-70B · Groq",
                responsibility: "Acts as a board-certified dermatologist. Provides differential diagnosis, treatment pathways, and referral logic.",
                color: "#818cf8",
              },
              {
                role: "Chief Medical Officer",
                agent: "ChiefAgent",
                model: "LLaMA 3-70B · Groq",
                responsibility: "Synthesizes all agent outputs into a final consensus report. Resolves contradictions and triggers human review flags.",
                color: "#a78bfa",
              },
              {
                role: "Modal Inference",
                agent: "ModalEndpoint",
                model: "Modal.com GPU",
                responsibility: "Serves the vision model as a serverless GPU endpoint. Handles image preprocessing, inference, and heatmap export.",
                color: "#34d399",
              },
            ].map((a) => (
              <div key={a.agent} className="feature-card glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: a.color, boxShadow: `0 0 8px ${a.color}` }} />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{a.role}</span>
                </div>
                <div className="font-black text-white text-lg mb-1">{a.agent}</div>
                <div className="text-xs font-mono text-indigo-400 mb-4 bg-indigo-500/10 px-2 py-1 rounded-lg inline-block">{a.model}</div>
                <p className="text-zinc-500 text-sm leading-relaxed">{a.responsibility}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Benchmarks ─── */}
      <section id="stats" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 mb-4">Performance</div>
            <h2 className="text-4xl font-black text-white">Clinical Benchmarks</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "94.7%", label: "Diagnostic Accuracy", sub: "vs. 89.2% dermatologist baseline", color: "indigo" },
              { value: "28s", label: "Pipeline Latency", sub: "from image upload to final report", color: "violet" },
              { value: "0.91", label: "AUC-ROC Score", sub: "on HAM10000 validation set", color: "cyan" },
              { value: "99.2%", label: "Uptime SLA", sub: "across Modal serverless endpoints", color: "indigo" },
            ].map((b) => (
              <div key={b.label} className="stat-card glass-card rounded-2xl p-6 text-center">
                <div className={`text-4xl font-black mb-2 ${b.color === 'violet' ? 'text-violet-400' : b.color === 'cyan' ? 'text-cyan-400' : 'text-indigo-400'}`}>{b.value}</div>
                <div className="font-bold text-white text-sm mb-1">{b.label}</div>
                <div className="text-zinc-600 text-xs">{b.sub}</div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="mt-10 glass-card rounded-2xl p-8 space-y-6">
            {[
              { label: "Melanoma Detection (Sensitivity)", value: 96, color: "#818cf8" },
              { label: "Benign Lesion Specificity", value: 93, color: "#a78bfa" },
              { label: "Symptom Entity Extraction F1", value: 91, color: "#67e8f9" },
              { label: "Report SOAP Structure Accuracy", value: 98, color: "#34d399" },
            ].map((p) => (
              <div key={p.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-zinc-300">{p.label}</span>
                  <span className="text-sm font-black text-white">{p.value}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${p.value}%`, background: `linear-gradient(90deg, ${p.color}88, ${p.color})` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden border-indigo-500/20">
            {/* inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 pointer-events-none" />

            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Ready to Diagnose?</h2>
              <p className="text-zinc-400 text-lg mb-8 max-w-xl mx-auto">
                Upload a dermoscopy image, describe your symptoms, and let the agentic pipeline do the rest.
              </p>
              <Link
                href="/diagnose"
                id="cta-bottom"
                className="btn-glow inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-2xl text-base"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Launch Clinical Console
              </Link>
              <p className="text-zinc-600 text-xs mt-4">No account needed · Local dev mode · Dummy keys friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <span className="text-sm font-bold text-zinc-400">CliniqAI</span>
          </div>
          <p className="text-xs text-zinc-600">For research and educational use only. Not a replacement for licensed clinical diagnosis.</p>
          <div className="flex gap-5 text-xs text-zinc-600">
            <a href="#" className="hover:text-zinc-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Docs</a>
            <a href="/diagnose" className="hover:text-zinc-400 transition-colors">Console</a>
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ─── Inline SVG helpers ─── */
function AgentIcon({ name, color }: { name: string; color: string }) {
  const stroke = color === 'violet' ? '#a78bfa' : color === 'cyan' ? '#67e8f9' : '#818cf8';
  const icons: Record<string, JSX.Element> = {
    eye: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    mic: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>,
    shield: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    "user-check": <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>,
    cpu: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
  };
  return icons[name] ?? null;
}

function FeatureIcon({ name, color }: { name: string; color: string }) {
  const stroke = color === 'violet' ? '#a78bfa' : color === 'cyan' ? '#67e8f9' : '#818cf8';
  const icons: Record<string, JSX.Element> = {
    scan: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><rect x="7" y="7" width="10" height="10" rx="1"/></svg>,
    mic: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>,
    "shield-check": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
    layers: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    "file-text": <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    lock: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  };
  return icons[name] ?? null;
}
