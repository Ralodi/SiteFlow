import { useNavigate } from 'react-router-dom';

const dark = { background:'#0e0f0c', color:'#f0ede6', minHeight:'100vh', fontFamily:'var(--font-body)' };
const sec = { padding:'clamp(60px,8vw,100px) clamp(20px,5vw,60px)', maxWidth:1140, margin:'0 auto' };
const h2s = { fontFamily:'var(--font-display)', fontSize:'clamp(1.8rem,3.5vw,2.6rem)', fontWeight:700, color:'#f0ede6', letterSpacing:'-0.02em', lineHeight:1.1 };
const label = { display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--amber)', marginBottom:16 };
const labelBar = { width:24, height:1, background:'var(--amber)', display:'inline-block' };
const card16 = { background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, padding:24 };

/* ══════════════════════════════════════════ ABOUT ══════════════════════════════════════════ */
export function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={dark}>
      <div style={{ ...sec, paddingTop:'clamp(60px,8vw,100px)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
          <div>
            <div style={label}><span style={labelBar}/>About SiteFlow</div>
            <h1 style={{ ...h2s, fontSize:'clamp(2rem,4vw,3.2rem)', marginBottom:20 }}>Built for contractors who operate at scale</h1>
            <p style={{ fontSize:'1.05rem', color:'rgba(240,237,230,0.55)', lineHeight:1.7, marginBottom:20 }}>SiteFlow exists because infrastructure project management was being done in spreadsheets, WhatsApp groups, and paper dockets — and it was failing contractors, municipalities, and the communities they serve.</p>
            <p style={{ fontSize:'1rem', color:'rgba(240,237,230,0.45)', lineHeight:1.7, marginBottom:32 }}>We built a platform that speaks the language of the field: zones, subcontractors, poles, cable runs, trenches, segments, and activations. Not generic tasks and tickets.</p>
            <button onClick={() => navigate('/contact')} style={{ padding:'12px 28px', background:'var(--amber)', color:'#0e0f0c', border:'none', borderRadius:9, fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)' }}>Request Access →</button>
          </div>
          <div style={{ background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:16, padding:32 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.3)', marginBottom:16 }}>Platform impact</div>
            {[['15+','Subcontractors manageable per project'],['100%','Field work logged with proof of installation'],['0 hrs','Time spent compiling reports manually'],['6+','Infrastructure industries supported']].map(([num,txt]) => (
              <div key={num} style={{ display:'flex', alignItems:'center', gap:16, padding:16, background:'#252620', borderRadius:10, border:'0.5px solid rgba(255,255,255,0.06)', marginBottom:10 }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.7rem', fontWeight:700, color:'var(--amber)', minWidth:70 }}>{num}</div>
                <div style={{ fontSize:13, color:'rgba(240,237,230,0.55)' }}>{txt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Who it's for */}
        <div style={{ marginTop:80 }}>
          <div style={label}><span style={labelBar}/>Who it's for</div>
          <h2 style={h2s}>Designed for the people running the project</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:36 }}>
            {[
              ['🏗️','Main Contractors','You hold the tender. SiteFlow gives you visibility across every zone, subcontractor, and material — without chasing phone calls.'],
              ['👷','Site Supervisors','Log work from your phone, upload proof, and report progress in seconds — not at the end of the week.'],
              ['📋','Project Managers','Generate structured, professional reports that demonstrate delivery confidence and build trust with clients.'],
            ].map(([icon,title,desc]) => (
              <div key={title} style={card16}>
                <div style={{ fontSize:28, marginBottom:14 }}>{icon}</div>
                <div style={{ fontSize:15, fontWeight:600, color:'#f0ede6', marginBottom:10 }}>{title}</div>
                <div style={{ fontSize:13, color:'rgba(240,237,230,0.5)', lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginTop:80 }}>
          <div style={label}><span style={labelBar}/>Our approach</div>
          <h2 style={h2s}>Real-world operations, not generic dashboards</h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginTop:36 }}>
            {[
              ['01','Field-first design','Every feature is designed for the person logging work on their phone in the field.'],
              ['02','Industry-specific language','SiteFlow speaks your language: poles, zones, material issuance, cable runs — not generic tasks.'],
              ['03','Accountability built in','Every work log is timestamped, geotagged, and immutable. Disputes resolved with evidence.'],
              ['04','Reporting that builds trust','Clients and municipalities receive structured reports generated automatically from field data.'],
              ['05','Multi-industry adaptability','From fibre to roads to plumbing — SiteFlow adapts its modules to your project type.'],
              ['06','Built to scale','Start with one project. Grow to manage dozens of zones and multi-phase tenders.'],
            ].map(([num,title,desc]) => (
              <div key={num} style={card16}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'2.5rem', fontWeight:800, color:'var(--amber)', opacity:0.25, lineHeight:1, marginBottom:12 }}>{num}</div>
                <div style={{ fontSize:14, fontWeight:600, color:'#f0ede6', marginBottom:8 }}>{title}</div>
                <div style={{ fontSize:13, color:'rgba(240,237,230,0.5)', lineHeight:1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ PRICING ══════════════════════════════════════════ */
export function PricingPage() {
  const navigate = useNavigate();
  const tiers = [
    {
      tier:'Tier 1', name:'Demo', price:'Free to explore', sub:'Sample project data · No commitment',
      features:['Access to sample project dashboard','View demo zones and progress','Explore subcontractor tracking','See reporting templates'],
      locked:['Live project data','Field logging & photo uploads','Material tracking','Payment tracking'],
      cta:'Start Demo', ctaStyle:{ background:'transparent', border:'0.5px solid rgba(255,255,255,0.18)', color:'rgba(240,237,230,0.8)' }, featured:false,
    },
    {
      tier:'Tier 2', name:'Pro', price:'Pricing on request', sub:'Per project · Monthly subscription',
      features:['Full project tracking dashboard','Unlimited zones & sites','Subcontractor management (up to 20)','Material issuance & reconciliation','Field logging — mobile app','Proof-of-work photo uploads','Automated progress reports','PDF export for clients & tenders'],
      locked:['Supplier delivery tracking','Contractor payment scheduling'],
      cta:'Request Pro Access', ctaStyle:{ background:'var(--amber)', border:'none', color:'#0e0f0c' }, featured:true,
    },
    {
      tier:'Tier 3', name:'Tailored', price:'Custom enterprise quote', sub:'Multi-project · Full deployment support',
      features:['Everything in Pro','Multi-project dashboards','Unlimited subcontractors','Supplier delivery tracking','Contractor payment scheduling','Invoice & cashflow visibility','Weekly reporting automation','Custom onboarding & setup','Dedicated account manager'],
      locked:[],
      cta:'Talk to Us', ctaStyle:{ background:'transparent', border:'0.5px solid rgba(255,255,255,0.18)', color:'rgba(240,237,230,0.8)' }, featured:false,
    },
  ];

  return (
    <div style={dark}>
      <div style={{ ...sec, textAlign:'center', paddingBottom:40 }}>
        <div style={{ ...label, justifyContent:'center' }}><span style={labelBar}/>Pricing</div>
        <h1 style={{ ...h2s, fontSize:'clamp(2rem,4vw,3.2rem)', marginBottom:14 }}>Simple, transparent tiers</h1>
        <p style={{ color:'rgba(240,237,230,0.5)', fontSize:'1.05rem' }}>Start with a demo. Grow into full project control. Scale to enterprise.</p>
      </div>

      <div style={{ padding:'0 clamp(20px,5vw,60px) clamp(60px,8vw,100px)', maxWidth:1140, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, alignItems:'start' }}>
          {tiers.map(t => (
            <div key={t.name} style={{ background: t.featured ? 'linear-gradient(135deg,rgba(232,160,32,0.07) 0%,#1e2019 50%)' : '#1e2019', border: t.featured ? '0.5px solid rgba(232,160,32,0.4)' : '0.5px solid rgba(255,255,255,0.07)', borderRadius:16, padding:32, position:'relative' }}>
              {t.featured && <div style={{ position:'absolute', top:-12, left:'50%', transform:'translateX(-50%)', background:'var(--amber)', color:'#0e0f0c', fontSize:11, fontWeight:700, padding:'4px 14px', borderRadius:20, letterSpacing:'0.04em' }}>Most Popular</div>}
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--amber)', marginBottom:10 }}>{t.tier}</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:700, color:'#f0ede6', marginBottom:6 }}>{t.name}</div>
              <div style={{ paddingBottom:22, marginBottom:22, borderBottom:'0.5px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.1rem', fontWeight:600, color:'#f0ede6', marginBottom:4 }}>{t.price}</div>
                <div style={{ fontSize:13, color:'rgba(240,237,230,0.45)' }}>{t.sub}</div>
              </div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
                {t.features.map(f => <li key={f} style={{ display:'flex', gap:9, fontSize:13.5, color:'rgba(240,237,230,0.7)', alignItems:'flex-start' }}><span style={{ color:'var(--amber)', fontWeight:700, flexShrink:0 }}>✓</span>{f}</li>)}
                {t.locked.map(f => <li key={f} style={{ display:'flex', gap:9, fontSize:13.5, color:'rgba(240,237,230,0.25)', alignItems:'flex-start' }}><span style={{ flexShrink:0 }}>—</span>{f}</li>)}
              </ul>
              <button onClick={() => navigate('/contact')} style={{ width:'100%', padding:'12px', borderRadius:9, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)', ...t.ctaStyle }}>{t.cta} →</button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginTop:72 }}>
          <div style={label}><span style={labelBar}/>FAQ</div>
          <h2 style={h2s}>Common questions</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:28 }}>
            {[
              ['Can I start with the demo and upgrade later?','Yes. The demo gives you a real feel for the platform. When you\'re ready to go live, we migrate your data and activate your Pro subscription.'],
              ['Do my subcontractors need accounts?','Yes — each subcontractor supervisor gets a field account to log work and upload photos. Their access is limited to their own zones.'],
              ['Is the platform mobile-friendly?','The field logging interface is built mobile-first. Teams can log work and upload photos from any smartphone.'],
              ['Can reports be shared with municipalities?','Yes. Reports can be exported as PDFs or shared via read-only link with clients, municipal bodies, or tender authorities.'],
            ].map(([q,a]) => (
              <div key={q} style={card16}>
                <div style={{ fontSize:14, fontWeight:600, color:'#f0ede6', marginBottom:10 }}>{q}</div>
                <div style={{ fontSize:13, color:'rgba(240,237,230,0.5)', lineHeight:1.6 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ CONTACT ══════════════════════════════════════════ */
export function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type=submit]');
    btn.textContent = 'Submitting...'; btn.disabled = true;
    setTimeout(() => { btn.textContent = '✓ Request submitted!'; btn.style.background = '#2d7a1f'; setTimeout(() => { btn.textContent = 'Submit request →'; btn.disabled = false; btn.style.background = ''; }, 3000); }, 1000);
  };

  const inp = { width:'100%', padding:'11px 14px', background:'#252620', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:10, color:'#f0ede6', fontSize:14, fontFamily:'var(--font-body)', outline:'none', marginBottom:14 };

  return (
    <div style={dark}>
      <div style={{ ...sec, display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:60, alignItems:'start' }}>
        <div>
          <div style={label}><span style={labelBar}/>Contact</div>
          <h2 style={{ ...h2s, marginBottom:16 }}>Request access or start a demo</h2>
          <p style={{ fontSize:'1rem', color:'rgba(240,237,230,0.5)', marginBottom:32, lineHeight:1.7 }}>Tell us about your project and we'll set you up with the right tier and a personalised onboarding session.</p>
          {[['📍','South Africa','Serving contractors across Southern Africa'],['✉️','hello@siteflow.app','We respond within one business day'],['⏱️','Quick onboarding','Most projects are live within 48 hours']].map(([icon,strong,sub]) => (
            <div key={strong} style={{ display:'flex', gap:14, marginBottom:20 }}>
              <div style={{ width:36, height:36, background:'rgba(232,160,32,0.1)', border:'0.5px solid rgba(232,160,32,0.2)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:15, flexShrink:0 }}>{icon}</div>
              <div><div style={{ fontSize:14, fontWeight:500, color:'#f0ede6' }}>{strong}</div><div style={{ fontSize:13, color:'rgba(240,237,230,0.4)', marginTop:2 }}>{sub}</div></div>
            </div>
          ))}
          <div style={{ marginTop:32, padding:22, background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:12 }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--amber)', marginBottom:12 }}>What happens next</div>
            {['① We review your submission','② We schedule a short call','③ We set up your project workspace','④ You\'re live within 48 hours'].map(s => (
              <div key={s} style={{ fontSize:14, color:'rgba(240,237,230,0.5)', marginBottom:8 }}>{s}</div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:16, padding:36 }}>
          <div style={{ fontSize:15, fontWeight:600, color:'#f0ede6', marginBottom:24 }}>Contractor onboarding form</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:6 }}>Your name *</label>
              <input required style={inp} placeholder="Thabo Khumalo"/>
            </div>
            <div>
              <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:6 }}>Company *</label>
              <input required style={inp} placeholder="Khumalo Civil Works"/>
            </div>
          </div>
          <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:6 }}>Email address *</label>
          <input required type="email" style={inp} placeholder="thabo@khumalocivil.co.za"/>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:6 }}>Project type *</label>
              <select required style={{ ...inp, marginBottom:0 }}>
                <option value="">— Select industry —</option>
                {['Fibre rollout','Road construction','Paving installation','Plumbing infrastructure','Municipal deployment','Utility installation','Trenching operations','Other'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:6 }}>Number of sites</label>
              <select style={{ ...inp, marginBottom:0 }}>
                {['— Select range —','1–3 sites','4–10 sites','11–30 sites','30+ sites'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginTop:14 }}>
            <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:6 }}>Message</label>
            <textarea style={{ ...inp, resize:'vertical', minHeight:100 }} placeholder="Tell us about your project and what you need..."/>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:10 }}>Interested tier</label>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              {['Demo (free)','Pro','Tailored / Enterprise','Not sure yet'].map(t => (
                <label key={t} style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer', fontSize:14, color:'rgba(240,237,230,0.6)' }}>
                  <input type="radio" name="tier" style={{ accentColor:'var(--amber)' }}/> {t}
                </label>
              ))}
            </div>
          </div>
          <button type="submit" style={{ width:'100%', padding:'13px', background:'var(--amber)', color:'#0e0f0c', border:'none', borderRadius:9, fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)' }}>Submit request →</button>
          <p style={{ fontSize:12, color:'rgba(240,237,230,0.3)', marginTop:12, textAlign:'center' }}>We'll respond within one business day.</p>
        </form>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════ LOGIN ══════════════════════════════════════════ */
export function LoginPage() {
  const navigate = useNavigate();
  const inp = { width:'100%', padding:'11px 14px', background:'#252620', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:10, color:'#f0ede6', fontSize:14, fontFamily:'var(--font-body)', outline:'none', marginBottom:14 };

  return (
    <div style={{ ...dark, display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', position:'relative' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 30% 50%,rgba(232,160,32,0.06) 0%,transparent 60%)', pointerEvents:'none' }}/>
      <div style={{ background:'#1e2019', border:'0.5px solid rgba(255,255,255,0.09)', borderRadius:20, padding:44, width:'100%', maxWidth:420, margin:40, position:'relative', zIndex:1 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:32 }}>
          <div style={{ width:34, height:34, background:'var(--amber)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg viewBox="0 0 18 18" fill="none" width="18" height="18"><rect x="2" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c"/><rect x="10" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/><rect x="2" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c"/></svg>
          </div>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:800, color:'#f0ede6', letterSpacing:'-0.02em' }}>SiteFlow</span>
        </div>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.5rem', fontWeight:700, color:'#f0ede6', marginBottom:6 }}>Welcome back</div>
        <div style={{ fontSize:14, color:'rgba(240,237,230,0.45)', marginBottom:28 }}>Log in to your project workspace</div>
        <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:6 }}>Email</label>
        <input type="email" style={inp} placeholder="you@yourcompany.co.za"/>
        <label style={{ fontSize:11, fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(240,237,230,0.4)', display:'block', marginBottom:6 }}>Password</label>
        <input type="password" style={inp} placeholder="••••••••••"/>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <label style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer', fontSize:13, color:'rgba(240,237,230,0.5)' }}><input type="checkbox" style={{ accentColor:'var(--amber)' }}/> Remember me</label>
          <button style={{ background:'none', border:'none', color:'var(--amber)', fontSize:13, cursor:'pointer', fontFamily:'var(--font-body)', textDecoration:'underline' }}>Forgot password?</button>
        </div>
        <button onClick={() => navigate('/app')} style={{ width:'100%', padding:'13px', background:'var(--amber)', color:'#0e0f0c', border:'none', borderRadius:9, fontSize:15, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)', marginBottom:16 }}>Log in to SiteFlow →</button>
        <button onClick={() => navigate('/field')} style={{ width:'100%', padding:'13px', background:'transparent', color:'rgba(240,237,230,0.6)', border:'0.5px solid rgba(255,255,255,0.14)', borderRadius:9, fontSize:14, fontWeight:500, cursor:'pointer', fontFamily:'var(--font-body)' }}>🔧 &nbsp;Field contractor login</button>
        <div style={{ textAlign:'center', marginTop:22, fontSize:13, color:'rgba(240,237,230,0.3)' }}>
          Don't have an account? <button onClick={() => navigate('/contact')} style={{ background:'none', border:'none', color:'var(--amber)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, textDecoration:'underline' }}>Request access</button>
        </div>
      </div>
    </div>
  );
}
