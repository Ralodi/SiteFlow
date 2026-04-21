import { useNavigate } from 'react-router-dom';

const s = {
  hero: { padding:'clamp(80px,12vw,140px) clamp(20px,5vw,60px) clamp(60px,8vw,100px)', maxWidth:1140, margin:'0 auto', position:'relative' },
  eyebrow: { display:'inline-flex', alignItems:'center', gap:8, padding:'5px 14px', background:'rgba(232,160,32,0.1)', border:'0.5px solid rgba(232,160,32,0.3)', borderRadius:20, fontSize:12, fontWeight:500, color:'var(--amber)', marginBottom:28 },
  h1: { fontFamily:'var(--font-display)', fontSize:'clamp(2.6rem,6vw,5rem)', fontWeight:800, color:'#f0ede6', letterSpacing:'-0.03em', lineHeight:1.05, marginBottom:24 },
  sub: { fontSize:'clamp(1rem,2vw,1.15rem)', color:'rgba(240,237,230,0.55)', maxWidth:560, marginBottom:40, lineHeight:1.7 },
  btnPrimary: { padding:'12px 28px', background:'var(--amber)', color:'#0e0f0c', border:'none', borderRadius:9, fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)' },
  btnOutline: { padding:'12px 28px', background:'transparent', color:'rgba(240,237,230,0.7)', border:'0.5px solid rgba(255,255,255,0.18)', borderRadius:9, fontSize:15, fontWeight:500, cursor:'pointer', fontFamily:'var(--font-body)' },
  sectionLabel: { display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--amber)', marginBottom:16 },
  h2: { fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#f0ede6', letterSpacing:'-0.02em', lineHeight:1.1 },
};

const features = [
  { icon:'📍', title:'Site & Zone Tracking', desc:'Monitor progress across every zone in real time. See what\'s done, in progress, and blocked.', tag:null },
  { icon:'👷', title:'Subcontractor Management', desc:'Assign zones, track performance, manage 15+ teams, and reconcile materials per team.', tag:null },
  { icon:'📸', title:'Proof-of-Work Uploads', desc:'Field teams submit geotagged photo evidence with every work log. Full audit trail.', tag:null },
  { icon:'🗺️', title:'GPS Field Tracking', desc:'Location-tagged installations and activations. Know exactly where every piece of work happened.', tag:null },
  { icon:'📦', title:'Material Tracking', desc:'Track materials from warehouse issuance to field installation. Reconcile stock and flag discrepancies.', tag:null },
  { icon:'📊', title:'Automated Reporting', desc:'Generate structured progress reports for clients, municipalities, and tenders in seconds.', tag:null },
  { icon:'🚚', title:'Supplier Delivery Tracking', desc:'Monitor supplier deliveries against orders. Know what\'s arrived and what\'s delayed.', tag:'Coming soon' },
  { icon:'💳', title:'Payment Tracking', desc:'Track contractor payment schedules against agreed rates and verified work submissions.', tag:'Coming soon' },
];

const industries = [
  { icon:'📡', name:'Fibre Rollout', sub:'Poles, cable, activations' },
  { icon:'🛣️', name:'Road Construction', sub:'Segments, layers, inspection' },
  { icon:'🏗️', name:'Paving Installation', sub:'Blocks, zones, completion' },
  { icon:'🔧', name:'Plumbing Infrastructure', sub:'Pipes, connections, testing' },
  { icon:'🏛️', name:'Municipal Deployment', sub:'Tender reporting, compliance' },
  { icon:'⚡', name:'Utility Installation', sub:'Networks, phases, handover' },
  { icon:'⛏️', name:'Trenching Operations', sub:'Meters, depth, backfill' },
];

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ color:'#f0ede6' }}>
      {/* Hero */}
      <div style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 0.5px,transparent 0.5px),linear-gradient(90deg,rgba(255,255,255,0.025) 0.5px,transparent 0.5px)', backgroundSize:'60px 60px', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:-200, left:'50%', transform:'translateX(-50%)', width:800, height:600, background:'radial-gradient(ellipse at center,rgba(232,160,32,0.1) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={s.hero}>
          <div style={s.eyebrow}><span style={{ width:6, height:6, background:'var(--amber)', borderRadius:'50%' }}/> Infrastructure project tracking, reimagined</div>
          <h1 style={s.h1}>Track Every Site.<br/><span style={{ color:'var(--amber)' }}>Deliver</span> Every Project.</h1>
          <p style={s.sub}>A real-time infrastructure rollout tracking platform for contractors managing multiple sites, subcontractors, materials, and reporting — across every industry.</p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:56 }}>
            <button style={s.btnPrimary} onClick={() => navigate('/contact')}>Start Demo &nbsp;→</button>
            <button style={s.btnOutline} onClick={() => navigate('/contact')}>Request Access</button>
          </div>
          <div style={{ display:'flex', gap:40, flexWrap:'wrap', paddingTop:40, borderTop:'0.5px solid rgba(255,255,255,0.08)' }}>
            {[['15+','Subcontractors per project'],['6','Industries supported'],['100%','Field-to-dashboard visibility'],['Real-time','Progress tracking']].map(([num,label]) => (
              <div key={num}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:700, color:'#f0ede6', lineHeight:1 }}>{num}</div>
                <div style={{ fontSize:13, color:'rgba(240,237,230,0.4)', marginTop:4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ background:'#161712', borderTop:'0.5px solid rgba(255,255,255,0.06)', borderBottom:'0.5px solid rgba(255,255,255,0.06)', padding:'13px 0', overflow:'hidden', whiteSpace:'nowrap' }}>
        <style>{`@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`}</style>
        <div style={{ display:'inline-flex', animation:'ticker 26s linear infinite' }}>
          {[...Array(2)].map((_,i) => industries.map(ind => (
            <span key={`${i}-${ind.name}`} style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'0 28px', fontSize:13, fontWeight:500, color:'rgba(240,237,230,0.35)' }}>
              {ind.icon} {ind.name} <span style={{ color:'var(--amber)', fontSize:16 }}>·</span>
            </span>
          )))}
        </div>
      </div>

      {/* Problem / Solution */}
      <section style={{ background:'#161712', padding:'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1140, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
          <div>
            <div style={s.sectionLabel}><span style={{ width:24, height:1, background:'var(--amber)', display:'inline-block' }}/>The Problem</div>
            <h2 style={s.h2}>Infrastructure projects are running blind</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:14, marginTop:28 }}>
              {[
                ['📍','No site visibility','Contractors have no real-time view of what\'s happening across zones at any given moment.'],
                ['👷','Subcontractor chaos','Tracking 10–15 subcontractors with spreadsheets causes delays, errors, and disputes.'],
                ['📦','Material leakage','Materials leave the warehouse with no reliable tracking of what was used, where, and by whom.'],
                ['📊','Reporting delays','Generating progress reports for clients and tenders takes days instead of seconds.'],
              ].map(([icon,title,desc]) => (
                <div key={title} style={{ display:'flex', gap:14, padding:18, background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:10 }}>
                  <div style={{ width:36, height:36, background:'rgba(232,160,32,0.1)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, marginBottom:4, color:'#f0ede6' }}>{title}</div>
                    <div style={{ fontSize:13, color:'rgba(240,237,230,0.5)', lineHeight:1.5 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={s.sectionLabel}><span style={{ width:24, height:1, background:'var(--amber)', display:'inline-block' }}/>The Solution</div>
            <h2 style={s.h2}>One platform for your entire operation</h2>
            <p style={{ marginTop:16, marginBottom:28, fontSize:'1.05rem', color:'rgba(240,237,230,0.5)', lineHeight:1.7 }}>SiteFlow connects your warehouse, field teams, subcontractors, and management — giving you live visibility from material issuance to final delivery.</p>
            {[
              ['✅','Real-time tracking across all project zones','Every unit of work tracked live as teams work in the field.'],
              ['✅','Proof-of-work with geotagged photo uploads','Disputes resolved with timestamped evidence, not memory.'],
              ['✅','One-click reports for clients and tenders','Structured progress reports generated instantly from field data.'],
            ].map(([ic,title,desc]) => (
              <div key={title} style={{ display:'flex', gap:14, padding:18, background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:10, marginBottom:12 }}>
                <div style={{ fontSize:20, flexShrink:0 }}>{ic}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, marginBottom:4, color:'#f0ede6' }}>{title}</div>
                  <div style={{ fontSize:13, color:'rgba(240,237,230,0.5)' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding:'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={s.sectionLabel}><span style={{ width:24, height:1, background:'var(--amber)', display:'inline-block' }}/>Core Features</div>
          <h2 style={s.h2}>Everything your project operation needs</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16, marginTop:40 }}>
            {features.map(f => (
              <div key={f.title} style={{ background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, padding:24, transition:'border-color 0.2s' }}>
                <div style={{ width:44, height:44, background:'rgba(232,160,32,0.1)', border:'0.5px solid rgba(232,160,32,0.2)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, marginBottom:16 }}>{f.icon}</div>
                <div style={{ fontSize:15, fontWeight:600, marginBottom:8, color:'#f0ede6' }}>{f.title}</div>
                <div style={{ fontSize:13, color:'rgba(240,237,230,0.5)', lineHeight:1.6 }}>{f.desc}</div>
                {f.tag && <div style={{ marginTop:12, display:'inline-block', fontSize:11, padding:'3px 10px', borderRadius:20, background:'rgba(232,160,32,0.06)', color:'rgba(232,160,32,0.5)', border:'0.5px solid rgba(232,160,32,0.15)' }}>{f.tag}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section style={{ background:'#161712', padding:'clamp(60px,8vw,100px) clamp(20px,5vw,60px)' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={s.sectionLabel}><span style={{ width:24, height:1, background:'var(--amber)', display:'inline-block' }}/>Industries</div>
          <h2 style={s.h2}>Built for infrastructure teams in the field</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:12, marginTop:40 }}>
            {industries.map(ind => (
              <div key={ind.name} style={{ background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:10, padding:'20px 18px', display:'flex', alignItems:'center', gap:14 }}>
                <div style={{ fontSize:22 }}>{ind.icon}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:500, color:'#f0ede6' }}>{ind.name}</div>
                  <div style={{ fontSize:12, color:'rgba(240,237,230,0.35)', marginTop:2 }}>{ind.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 0%,rgba(232,160,32,0.07) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={s.sectionLabel}><span style={{ width:24, height:1, background:'var(--amber)', display:'inline-block' }}/>Get started</div>
          <h2 style={s.h2}>Ready to see your sites clearly?</h2>
          <p style={{ color:'rgba(240,237,230,0.5)', maxWidth:440, margin:'16px auto 36px', fontSize:'1.05rem' }}>Join infrastructure contractors already managing their projects with SiteFlow.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button style={s.btnPrimary} onClick={() => navigate('/contact')}>Start Demo →</button>
            <button style={s.btnOutline} onClick={() => navigate('/pricing')}>View Pricing</button>
          </div>
        </div>
      </section>
    </div>
  );
}
