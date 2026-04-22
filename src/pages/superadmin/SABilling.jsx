import { useState } from 'react';
import { TENANTS, BILLING_CONFIG, TIER_CONFIG } from './superadminData';

const SA_STYLES = {
  page: { padding:'32px 36px', maxWidth:1100, color:'#f0ede6' },
  card: { background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden', marginBottom:20 },
  th: { textAlign:'left', padding:'11px 16px', fontSize:11, fontWeight:600, color:'rgba(240,237,230,0.3)', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:'0.5px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)', whiteSpace:'nowrap' },
  td: { padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)', fontSize:13 },
};

export default function SABilling() {
  const [billingData, setBillingData] = useState(
    TENANTS.filter(t => t.tier !== 'demo').map(t => ({ ...t }))
  );

  const updateBilling = (id, status) => {
    setBillingData(prev => prev.map(t => t.id===id ? {...t, billingStatus:status} : t));
  };

  const mrr = billingData.filter(t=>t.status==='active').reduce((s,t)=>s+(t.monthlyRate||0),0);
  const paid = billingData.filter(t=>t.billingStatus==='paid').reduce((s,t)=>s+(t.monthlyRate||0),0);
  const overdue = billingData.filter(t=>t.billingStatus==='overdue');

  return (
    <div style={SA_STYLES.page}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'#f0ede6', letterSpacing:'-0.02em' }}>Billing</div>
        <div style={{ fontSize:13, color:'rgba(240,237,230,0.4)', marginTop:3 }}>Track subscriptions, payments, and overdue accounts</div>
      </div>

      {/* Metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Monthly Revenue (MRR)', value:`R ${mrr.toLocaleString()}`, color:'#a78bfa' },
          { label:'Collected this month',  value:`R ${paid.toLocaleString()}`, color:'#6dbd5a' },
          { label:'Outstanding',           value:`R ${(mrr-paid).toLocaleString()}`, color: (mrr-paid)>0?'#f87171':'#6dbd5a' },
          { label:'Overdue accounts',      value: overdue.length, color: overdue.length>0?'#f87171':'#6dbd5a' },
        ].map(m => (
          <div key={m.label} style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'18px 20px' }}>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.3)', marginBottom:8 }}>{m.label}</div>
            <div style={{ fontFamily:'var(--font-display)', fontSize:'1.8rem', fontWeight:700, color:m.color, lineHeight:1 }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Overdue alert */}
      {overdue.length > 0 && (
        <div style={{ background:'rgba(160,32,32,0.12)', border:'0.5px solid rgba(160,32,32,0.3)', borderRadius:10, padding:'12px 16px', marginBottom:20, display:'flex', alignItems:'center', gap:10, fontSize:13, color:'#f87171' }}>
          ⚠️ <strong>{overdue.length} account{overdue.length>1?'s':''} overdue:</strong> {overdue.map(t=>t.company).join(', ')}
        </div>
      )}

      {/* Billing table */}
      <div style={SA_STYLES.card}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr>
              {['Client','Tier','Monthly Rate','Next Billing','Billing Status','Action'].map(h => <th key={h} style={SA_STYLES.th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {billingData.map(t => (
              <tr key={t.id}>
                <td style={SA_STYLES.td}>
                  <div style={{ fontWeight:600, color:'rgba(240,237,230,0.9)' }}>{t.company}</div>
                  <div style={{ fontSize:11, color:'rgba(240,237,230,0.35)', marginTop:1 }}>{t.contactEmail}</div>
                </td>
                <td style={SA_STYLES.td}>
                  <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600, background: t.tier==='pro'?'rgba(26,95,160,0.25)':'rgba(124,58,237,0.25)', color: t.tier==='pro'?'#5b9bd5':'#a78bfa' }}>
                    {TIER_CONFIG[t.tier]?.label}
                  </span>
                </td>
                <td style={{ ...SA_STYLES.td, fontWeight:700, color:'#a78bfa' }}>R {t.monthlyRate?.toLocaleString()}</td>
                <td style={{ ...SA_STYLES.td, color:'rgba(240,237,230,0.5)' }}>{t.nextBillingDate||'—'}</td>
                <td style={SA_STYLES.td}>
                  <select
                    value={t.billingStatus}
                    onChange={e => updateBilling(t.id, e.target.value)}
                    style={{ padding:'6px 10px', background:'#1e2028', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:7, color: t.billingStatus==='paid'?'#6dbd5a':t.billingStatus==='overdue'?'#f87171':t.billingStatus==='pending'?'#e8a020':'#888', fontSize:12, fontFamily:'var(--font-body)', cursor:'pointer', outline:'none' }}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="paid">✓ Paid</option>
                    <option value="overdue">! Overdue</option>
                  </select>
                </td>
                <td style={SA_STYLES.td}>
                  <button onClick={() => updateBilling(t.id, 'paid')} style={{ padding:'5px 12px', background:'rgba(45,122,31,0.2)', border:'0.5px solid rgba(45,122,31,0.3)', borderRadius:7, color:'#6dbd5a', cursor:'pointer', fontSize:11, fontFamily:'var(--font-body)' }}>Mark paid</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Revenue breakdown */}
      <div style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, padding:22 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.3)', marginBottom:16 }}>Revenue breakdown by tier</div>
        {Object.entries(TIER_CONFIG).filter(([k])=>k!=='demo').map(([key, cfg]) => {
          const clients = billingData.filter(t=>t.tier===key);
          const revenue = clients.reduce((s,t)=>s+(t.monthlyRate||0),0);
          const pct = mrr>0 ? Math.round((revenue/mrr)*100) : 0;
          return (
            <div key={key} style={{ marginBottom:16 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                <span style={{ fontSize:13, color:'rgba(240,237,230,0.7)' }}>{cfg.label} <span style={{ color:'rgba(240,237,230,0.3)', fontSize:12 }}>({clients.length} client{clients.length!==1?'s':''})</span></span>
                <span style={{ fontSize:13, fontWeight:700, color:'#f0ede6' }}>R {revenue.toLocaleString()} <span style={{ fontWeight:400, color:'rgba(240,237,230,0.35)' }}>({pct}%)</span></span>
              </div>
              <div style={{ background:'rgba(255,255,255,0.06)', borderRadius:4, height:8, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:4, background: key==='pro'?'#1a5fa0':'#7c3aed', width:`${pct}%`, transition:'width 0.4s' }}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
