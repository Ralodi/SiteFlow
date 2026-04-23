import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { INDUSTRY_LABELS } from './superadminData';

const inp = { width:'100%', padding:'10px 12px', background:'#1e2028', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:9, color:'#f0ede6', fontSize:13.5, fontFamily:'var(--font-body)', outline:'none' };
const lbl = { fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.35)', display:'block', marginBottom:6 };
const STEPS = ['Client details', 'Tier & access', 'Review & send'];

function generatePassword() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$';
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export default function SAOnboarding() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    company:'', contactName:'', contactEmail:'', contactPhone:'',
    industry:'fibre_rollout', tier:'pro', monthlyRate:2500,
    role:'manager', createDemoProject:true, notes:'',
  });
  const f = (k, v) => setForm(p => ({ ...p, [k]:v }));

  const handleCreate = async () => {
    setLoading(true);
    setError('');
    const tempPassword = generatePassword();
    try {
      // Use signUp — creates user and sends confirmation email
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: form.contactEmail,
        password: tempPassword,
        options: {
          data: { full_name: form.contactName, company: form.company, role: form.role }
        }
      });
      if (signUpError) throw new Error(signUpError.message);
      // Update their profile row
      if (data?.user?.id) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: form.contactName,
          company: form.company,
          role: form.role,
          phone: form.contactPhone,
        });
      }
      setResult({ tempPassword, email: form.contactEmail, userId: data?.user?.id });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (result) return (
    <div style={{ padding:'60px 36px', maxWidth:620, color:'#f0ede6' }}>
      <div style={{ fontSize:48, marginBottom:20 }}>✅</div>
      <div style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:700, marginBottom:10 }}>Client onboarded!</div>
      <div style={{ fontSize:15, color:'rgba(240,237,230,0.55)', lineHeight:1.7, marginBottom:28 }}>
        <strong style={{ color:'rgba(240,237,230,0.85)' }}>{form.company}</strong> has been created on SiteFlow.
      </div>
      <div style={{ background:'rgba(124,58,237,0.1)', border:'1px solid rgba(124,58,237,0.3)', borderRadius:14, padding:24, marginBottom:24 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#a78bfa', marginBottom:14 }}>Share these credentials with your client</div>
        <div style={{ background:'#0d0e10', borderRadius:10, padding:16, fontFamily:'monospace', fontSize:13, lineHeight:2.2 }}>
          <div>🌐 <span style={{ color:'rgba(240,237,230,0.4)' }}>URL:</span> https://site-flow-one.vercel.app/login</div>
          <div>📧 <span style={{ color:'rgba(240,237,230,0.4)' }}>Email:</span> {result.email}</div>
          <div>🔑 <span style={{ color:'rgba(240,237,230,0.4)' }}>Password:</span> <strong style={{ color:'#e8a020', fontSize:15 }}>{result.tempPassword}</strong></div>
        </div>
        <div style={{ fontSize:12, color:'rgba(240,237,230,0.35)', marginTop:12 }}>⚠️ Ask them to change password after first login. They may also receive a confirmation email from Supabase.</div>
      </div>
      <div style={{ display:'flex', gap:10 }}>
        <button onClick={() => navigator.clipboard.writeText(`SiteFlow Login Details\n\nURL: https://site-flow-one.vercel.app/login\nEmail: ${result.email}\nTemporary password: ${result.tempPassword}\n\nPlease log in and change your password.`)} style={{ padding:'10px 20px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)' }}>
          📋 Copy credentials
        </button>
        <button onClick={() => { setResult(null); setStep(0); setForm({ company:'', contactName:'', contactEmail:'', contactPhone:'', industry:'fibre_rollout', tier:'pro', monthlyRate:2500, role:'manager', createDemoProject:true, notes:'' }); setError(''); }} style={{ padding:'10px 20px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:9, color:'rgba(240,237,230,0.6)', cursor:'pointer', fontSize:13, fontFamily:'var(--font-body)' }}>
          Onboard another client
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding:'32px 36px', maxWidth:680, color:'#f0ede6' }}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, letterSpacing:'-0.02em' }}>Onboard New Client</div>
        <div style={{ fontSize:13, color:'rgba(240,237,230,0.4)', marginTop:3 }}>Create their SiteFlow account and get login credentials to share</div>
      </div>

      <div style={{ display:'flex', gap:0, marginBottom:28, background:'#161820', borderRadius:12, padding:4, border:'0.5px solid rgba(255,255,255,0.07)' }}>
        {STEPS.map((s,i) => (
          <div key={s} onClick={() => i<step && setStep(i)} style={{ flex:1, padding:'10px', textAlign:'center', borderRadius:9, background:step===i?'#7c3aed':'transparent', cursor:i<step?'pointer':'default', transition:'all 0.15s' }}>
            <div style={{ fontSize:11, fontWeight:700, color:step===i?'#fff':i<step?'#a78bfa':'rgba(240,237,230,0.3)' }}>{i+1}. {s}</div>
          </div>
        ))}
      </div>

      <div style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, padding:28 }}>

        {step===0 && (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={lbl}>Company name *</label>
                <input style={inp} value={form.company} onChange={e=>f('company',e.target.value)} placeholder="e.g. Khumalo Civil Works"/>
              </div>
              <div>
                <label style={lbl}>Contact person *</label>
                <input style={inp} value={form.contactName} onChange={e=>f('contactName',e.target.value)} placeholder="Full name"/>
              </div>
              <div>
                <label style={lbl}>Login email *</label>
                <input type="email" style={inp} value={form.contactEmail} onChange={e=>f('contactEmail',e.target.value)} placeholder="email@company.co.za"/>
              </div>
              <div>
                <label style={lbl}>Phone</label>
                <input style={inp} value={form.contactPhone} onChange={e=>f('contactPhone',e.target.value)} placeholder="071 234 5678"/>
              </div>
              <div>
                <label style={lbl}>Industry</label>
                <select style={inp} value={form.industry} onChange={e=>f('industry',e.target.value)}>
                  {Object.entries(INDUSTRY_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Their role in app</label>
                <select style={inp} value={form.role} onChange={e=>f('role',e.target.value)}>
                  <option value="manager">Manager — sees everything</option>
                  <option value="field">Field contractor — mobile only</option>
                  <option value="viewer">Viewer — read only</option>
                </select>
              </div>
            </div>
            <div style={{ marginTop:20, display:'flex', justifyContent:'flex-end' }}>
              <button disabled={!form.company||!form.contactEmail} onClick={() => setStep(1)} style={{ padding:'10px 24px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)', opacity:(!form.company||!form.contactEmail)?0.5:1 }}>
                Next →
              </button>
            </div>
          </>
        )}

        {step===1 && (
          <>
            <div style={{ marginBottom:20 }}>
              <label style={lbl}>Subscription tier</label>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                {[
                  { key:'demo',     title:'Demo',    price:'Free',      desc:'Sample data, limited access' },
                  { key:'pro',      title:'Pro',     price:'R2,500/mo', desc:'Full tracking & reporting' },
                  { key:'tailored', title:'Tailored',price:'Custom',    desc:'Enterprise & multi-project' },
                ].map(t => (
                  <div key={t.key} onClick={() => { f('tier',t.key); f('monthlyRate', t.key==='demo'?0:t.key==='pro'?2500:8500); }} style={{ padding:16, border:`1.5px solid ${form.tier===t.key?'#7c3aed':'rgba(255,255,255,0.08)'}`, borderRadius:12, cursor:'pointer', background:form.tier===t.key?'rgba(124,58,237,0.12)':'transparent' }}>
                    <div style={{ fontWeight:600, color:'#f0ede6', marginBottom:4 }}>{t.title}</div>
                    <div style={{ fontSize:13, color:'#a78bfa', fontWeight:700, marginBottom:6 }}>{t.price}</div>
                    <div style={{ fontSize:12, color:'rgba(240,237,230,0.4)', lineHeight:1.4 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            {form.tier==='tailored' && (
              <div style={{ marginBottom:16 }}>
                <label style={lbl}>Custom monthly rate (R)</label>
                <input type="number" style={inp} value={form.monthlyRate} onChange={e=>f('monthlyRate',Number(e.target.value))}/>
              </div>
            )}
            <div style={{ marginBottom:16 }}>
              <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontSize:13, color:'rgba(240,237,230,0.6)' }}>
                <input type="checkbox" checked={form.createDemoProject} onChange={e=>f('createDemoProject',e.target.checked)} style={{ accentColor:'#7c3aed', width:16, height:16 }}/>
                Pre-load demo project so they can explore immediately
              </label>
            </div>
            <div>
              <label style={lbl}>Internal notes</label>
              <textarea style={{ ...inp, resize:'vertical', minHeight:70 }} value={form.notes} onChange={e=>f('notes',e.target.value)} placeholder="How did they find us? Any special requirements?"/>
            </div>
            <div style={{ marginTop:20, display:'flex', justifyContent:'space-between' }}>
              <button onClick={() => setStep(0)} style={{ padding:'10px 20px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:9, color:'rgba(240,237,230,0.5)', cursor:'pointer', fontSize:13, fontFamily:'var(--font-body)' }}>← Back</button>
              <button onClick={() => setStep(2)} style={{ padding:'10px 24px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)' }}>Review →</button>
            </div>
          </>
        )}

        {step===2 && (
          <>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.3)', marginBottom:16 }}>Review before creating</div>
            {[
              ['Company', form.company],['Contact', form.contactName],['Login email', form.contactEmail],
              ['Phone', form.contactPhone||'—'],['Industry', INDUSTRY_LABELS[form.industry]],
              ['Tier', form.tier.charAt(0).toUpperCase()+form.tier.slice(1)],
              ['Monthly rate', form.monthlyRate>0?`R ${form.monthlyRate.toLocaleString()}`:'Free'],
              ['App role', form.role],['Demo data', form.createDemoProject?'Yes':'No'],
            ].map(([k,v]) => (
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'9px 0', borderBottom:'0.5px solid rgba(255,255,255,0.05)', fontSize:13 }}>
                <span style={{ color:'rgba(240,237,230,0.4)' }}>{k}</span>
                <span style={{ color:'rgba(240,237,230,0.85)', fontWeight:500 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop:14, background:'rgba(124,58,237,0.08)', border:'0.5px solid rgba(124,58,237,0.2)', borderRadius:10, padding:14, fontSize:13, color:'rgba(240,237,230,0.55)', lineHeight:1.7 }}>
              A temporary password will be generated. You share it directly with your client.
            </div>
            {error && (
              <div style={{ marginTop:12, background:'rgba(160,32,32,0.15)', border:'0.5px solid rgba(160,32,32,0.3)', borderRadius:9, padding:'10px 14px', fontSize:13, color:'#f87171' }}>
                ⚠️ {error}
              </div>
            )}
            <div style={{ marginTop:20, display:'flex', justifyContent:'space-between' }}>
              <button onClick={() => setStep(1)} style={{ padding:'10px 20px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:9, color:'rgba(240,237,230,0.5)', cursor:'pointer', fontSize:13, fontFamily:'var(--font-body)' }}>← Back</button>
              <button onClick={handleCreate} disabled={loading} style={{ padding:'11px 28px', background:loading?'#5b2eb0':'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:loading?'not-allowed':'pointer', fontSize:14, fontWeight:600, fontFamily:'var(--font-body)' }}>
                {loading ? 'Creating account...' : '✓ Create account'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}