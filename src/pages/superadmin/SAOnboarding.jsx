import { useState } from 'react';
import { INDUSTRY_LABELS } from './superadminData';

const inp = { width:'100%', padding:'10px 12px', background:'#1e2028', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:9, color:'#f0ede6', fontSize:13.5, fontFamily:'var(--font-body)', outline:'none', marginBottom:0 };
const label = { fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.35)', display:'block', marginBottom:6 };

const STEPS = ['Client details', 'Tier & access', 'Review & send'];

export default function SAOnboarding() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    company:'', contactName:'', contactEmail:'', contactPhone:'',
    industry:'fibre_rollout', tier:'pro', monthlyRate:2500,
    sendWelcomeEmail: true, createDemoProject: true, notes:'',
  });
  const f = (k,v) => setForm(p=>({...p,[k]:v}));

  const handleSend = () => { setSent(true); };

  if (sent) return (
    <div style={{ padding:'80px 36px', maxWidth:600, color:'#f0ede6', textAlign:'center' }}>
      <div style={{ fontSize:56, marginBottom:20 }}>✅</div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:700, color:'#f0ede6', marginBottom:10 }}>Client onboarded!</div>
      <div style={{ fontSize:15, color:'rgba(240,237,230,0.5)', lineHeight:1.7, marginBottom:32 }}>
        <strong style={{ color:'rgba(240,237,230,0.8)' }}>{form.company}</strong> has been set up on SiteFlow.<br/>
        A welcome email with login instructions has been queued for <strong style={{ color:'rgba(240,237,230,0.8)' }}>{form.contactEmail}</strong>.
      </div>
      <div style={{ display:'flex', gap:12, justifyContent:'center' }}>
        <button onClick={() => { setSent(false); setStep(0); setForm({ company:'', contactName:'', contactEmail:'', contactPhone:'', industry:'fibre_rollout', tier:'pro', monthlyRate:2500, sendWelcomeEmail:true, createDemoProject:true, notes:'' }); }} style={{ padding:'11px 24px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:600, fontFamily:'var(--font-body)' }}>Onboard another client</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding:'32px 36px', maxWidth:680, color:'#f0ede6' }}>
      <div style={{ marginBottom:32 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'#f0ede6', letterSpacing:'-0.02em' }}>Onboard New Client</div>
        <div style={{ fontSize:13, color:'rgba(240,237,230,0.4)', marginTop:3 }}>Set up a new tenant account and send their welcome email</div>
      </div>

      {/* Step indicator */}
      <div style={{ display:'flex', gap:0, marginBottom:32, background:'#161820', borderRadius:12, padding:4, border:'0.5px solid rgba(255,255,255,0.07)' }}>
        {STEPS.map((s,i) => (
          <div key={s} style={{ flex:1, padding:'10px', textAlign:'center', borderRadius:9, background: step===i ? '#7c3aed' : 'transparent', cursor: i<step ? 'pointer' : 'default', transition:'all 0.15s' }} onClick={() => i<step && setStep(i)}>
            <div style={{ fontSize:11, fontWeight:700, color: step===i ? '#fff' : i<step ? '#a78bfa' : 'rgba(240,237,230,0.3)' }}>{i+1}. {s}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, padding:28 }}>

        {/* Step 1 */}
        {step === 0 && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={label}>Company name *</label>
                <input style={inp} value={form.company} onChange={e=>f('company',e.target.value)} placeholder="e.g. Khumalo Civil Works"/>
              </div>
              <div>
                <label style={label}>Contact person *</label>
                <input style={inp} value={form.contactName} onChange={e=>f('contactName',e.target.value)} placeholder="Full name"/>
              </div>
              <div>
                <label style={label}>Contact email *</label>
                <input type="email" style={inp} value={form.contactEmail} onChange={e=>f('contactEmail',e.target.value)} placeholder="email@company.co.za"/>
              </div>
              <div>
                <label style={label}>Phone</label>
                <input style={inp} value={form.contactPhone} onChange={e=>f('contactPhone',e.target.value)} placeholder="071 234 5678"/>
              </div>
              <div>
                <label style={label}>Industry</label>
                <select style={inp} value={form.industry} onChange={e=>f('industry',e.target.value)}>
                  {Object.entries(INDUSTRY_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop:20, display:'flex', justifyContent:'flex-end' }}>
              <button disabled={!form.company||!form.contactEmail} onClick={() => setStep(1)} style={{ padding:'10px 24px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)', opacity: (!form.company||!form.contactEmail)?0.5:1 }}>
                Next →
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <>
            <div style={{ marginBottom:20 }}>
              <label style={label}>Subscription tier</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                {[
                  { key:'demo',     title:'Demo',     price:'Free',       desc:'Limited access, sample data only' },
                  { key:'pro',      title:'Pro',       price:'R2,500/mo',  desc:'Full tracking, up to 20 subcontractors' },
                  { key:'tailored', title:'Tailored',  price:'Custom',     desc:'Enterprise, multi-project, custom SLA' },
                ].map(t => (
                  <div key={t.key} onClick={() => { f('tier',t.key); f('monthlyRate', t.key==='demo'?0:t.key==='pro'?2500:8500); }} style={{ padding:'16px', border:`1.5px solid ${form.tier===t.key?'#7c3aed':'rgba(255,255,255,0.08)'}`, borderRadius:12, cursor:'pointer', background: form.tier===t.key?'rgba(124,58,237,0.12)':'transparent', transition:'all 0.15s' }}>
                    <div style={{ fontWeight:600, color:'#f0ede6', marginBottom:4 }}>{t.title}</div>
                    <div style={{ fontSize:13, color:'#a78bfa', fontWeight:700, marginBottom:6 }}>{t.price}</div>
                    <div style={{ fontSize:12, color:'rgba(240,237,230,0.4)', lineHeight:1.4 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {form.tier === 'tailored' && (
              <div style={{ marginBottom:16 }}>
                <label style={label}>Custom monthly rate (R)</label>
                <input type="number" style={inp} value={form.monthlyRate} onChange={e=>f('monthlyRate',Number(e.target.value))}/>
              </div>
            )}

            <div style={{ marginBottom:16 }}>
              <label style={label}>Setup options</label>
              {[
                ['sendWelcomeEmail','Send welcome email with login instructions'],
                ['createDemoProject','Create a demo project with sample data'],
              ].map(([key,lbl]) => (
                <label key={key} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', marginBottom:10, fontSize:13, color:'rgba(240,237,230,0.6)' }}>
                  <input type="checkbox" checked={form[key]} onChange={e=>f(key,e.target.checked)} style={{ accentColor:'#7c3aed', width:16, height:16 }}/>
                  {lbl}
                </label>
              ))}
            </div>

            <div style={{ marginBottom:0 }}>
              <label style={label}>Internal notes</label>
              <textarea style={{ ...inp, resize:'vertical', minHeight:80 }} value={form.notes} onChange={e=>f('notes',e.target.value)} placeholder="How did they find us? Any special requirements?"/>
            </div>

            <div style={{ marginTop:20, display:'flex', justifyContent:'space-between' }}>
              <button onClick={() => setStep(0)} style={{ padding:'10px 20px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:9, color:'rgba(240,237,230,0.5)', cursor:'pointer', fontSize:13, fontFamily:'var(--font-body)' }}>← Back</button>
              <button onClick={() => setStep(2)} style={{ padding:'10px 24px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)' }}>Review →</button>
            </div>
          </>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.3)', marginBottom:16 }}>Review before sending</div>
            {[
              ['Company', form.company],
              ['Contact', form.contactName],
              ['Email', form.contactEmail],
              ['Phone', form.contactPhone || '—'],
              ['Industry', INDUSTRY_LABELS[form.industry]],
              ['Tier', form.tier.charAt(0).toUpperCase()+form.tier.slice(1)],
              ['Monthly rate', form.monthlyRate>0 ? `R ${form.monthlyRate.toLocaleString()}` : 'Free'],
              ['Welcome email', form.sendWelcomeEmail ? 'Yes — will be sent' : 'No'],
              ['Demo project', form.createDemoProject ? 'Yes — will be created' : 'No'],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'0.5px solid rgba(255,255,255,0.05)', fontSize:13 }}>
                <span style={{ color:'rgba(240,237,230,0.4)' }}>{k}</span>
                <span style={{ color:'rgba(240,237,230,0.85)', fontWeight:500 }}>{v}</span>
              </div>
            ))}

            {/* Preview welcome email */}
            {form.sendWelcomeEmail && (
              <div style={{ marginTop:20, background:'rgba(124,58,237,0.08)', border:'0.5px solid rgba(124,58,237,0.2)', borderRadius:10, padding:16 }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(124,58,237,0.7)', marginBottom:10 }}>Welcome email preview</div>
                <div style={{ fontSize:13, color:'rgba(240,237,230,0.55)', lineHeight:1.7 }}>
                  <strong style={{ color:'rgba(240,237,230,0.8)' }}>To:</strong> {form.contactEmail}<br/>
                  <strong style={{ color:'rgba(240,237,230,0.8)' }}>Subject:</strong> Welcome to SiteFlow — your workspace is ready<br/><br/>
                  Hi {form.contactName?.split(' ')[0] || 'there'},<br/><br/>
                  Your SiteFlow workspace has been set up for <strong style={{ color:'rgba(240,237,230,0.7)' }}>{form.company}</strong>.<br/>
                  Log in at <span style={{ color:'#a78bfa' }}>app.siteflow.co.za</span> with this email address.<br/><br/>
                  Your temporary password will be in a separate email.<br/>
                  — The SiteFlow team
                </div>
              </div>
            )}

            <div style={{ marginTop:24, display:'flex', justifyContent:'space-between' }}>
              <button onClick={() => setStep(1)} style={{ padding:'10px 20px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:9, color:'rgba(240,237,230,0.5)', cursor:'pointer', fontSize:13, fontFamily:'var(--font-body)' }}>← Back</button>
              <button onClick={handleSend} style={{ padding:'11px 28px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:14, fontWeight:600, fontFamily:'var(--font-body)' }}>
                ✓ Create account & send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
