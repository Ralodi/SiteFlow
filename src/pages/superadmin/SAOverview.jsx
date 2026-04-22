import { TENANTS, TIER_CONFIG, BILLING_CONFIG } from './superadminData';

const SA_STYLES = {
  page: { padding:'32px 36px', maxWidth:1200, color:'#f0ede6' },
  label: { fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.35)', marginBottom:8 },
  card: { background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, padding:'20px 22px' },
  metricVal: { fontFamily:'var(--font-display)', fontSize:'2rem', fontWeight:700, color:'#f0ede6', lineHeight:1 },
  metricSub: { fontSize:12, color:'rgba(240,237,230,0.4)', marginTop:5 },
};

export default function SAOverview() {
  const active    = TENANTS.filter(t => t.status === 'active');
  const paying    = TENANTS.filter(t => t.tier !== 'demo' && t.status === 'active');
  const demo      = TENANTS.filter(t => t.tier === 'demo');
  const overdue   = TENANTS.filter(t => t.billingStatus === 'overdue');
  const mrr       = TENANTS.filter(t => t.status==='active').reduce((s,t) => s + (t.monthlyRate||0), 0);

  const recentActivity = [
    { time:'2h ago',  event:'New signup',       detail:'Mthembu Road Works requested Pro access', type:'signup' },
    { time:'5h ago',  event:'Payment received', detail:'Zulu Municipal Services — R8,500 April',  type:'payment' },
    { time:'1d ago',  event:'Account suspended',detail:'Khumalo Trenching Co — 30-day inactivity', type:'suspend' },
    { time:'2d ago',  event:'Tier upgraded',    detail:'Dube Paving upgraded Demo → Pro',          type:'upgrade' },
    { time:'3d ago',  event:'New signup',       detail:'OpenServe Contractors onboarded',           type:'signup' },
  ];

  const typeColor = { signup:'#6dbd5a', payment:'#a78bfa', suspend:'#f87171', upgrade:'#e8a020' };

  return (
    <div style={SA_STYLES.page}>
      <div style={{ marginBottom:28 }}>
        <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'#f0ede6', letterSpacing:'-0.02em' }}>Operator Overview</div>
        <div style={{ fontSize:13, color:'rgba(240,237,230,0.4)', marginTop:3 }}>SiteFlow platform — all tenants at a glance</div>
      </div>

      {/* Key metrics */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12, marginBottom:24 }}>
        {[
          { label:'Total Tenants',   value: TENANTS.length,        sub:'all accounts',         color:'#f0ede6' },
          { label:'Active',          value: active.length,          sub:'currently active',     color:'#6dbd5a' },
          { label:'Paying Clients',  value: paying.length,          sub:'pro + tailored',       color:'#a78bfa' },
          { label:'Monthly Revenue', value:`R ${mrr.toLocaleString()}`, sub:'MRR this month',  color:'#e8a020' },
          { label:'Overdue',         value: overdue.length,         sub:'need follow-up',       color: overdue.length > 0 ? '#f87171' : '#6dbd5a' },
        ].map(m => (
          <div key={m.label} style={SA_STYLES.card}>
            <div style={SA_STYLES.label}>{m.label}</div>
            <div style={{ ...SA_STYLES.metricVal, color:m.color }}>{m.value}</div>
            <div style={SA_STYLES.metricSub}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>

        {/* Tier breakdown */}
        <div style={SA_STYLES.card}>
          <div style={{ ...SA_STYLES.label, marginBottom:16 }}>Tenants by tier</div>
          {Object.entries(TIER_CONFIG).map(([key, cfg]) => {
            const count = TENANTS.filter(t => t.tier===key).length;
            const pct = Math.round((count/TENANTS.length)*100);
            return (
              <div key={key} style={{ marginBottom:14 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                  <span style={{ fontSize:13, color:'rgba(240,237,230,0.7)', fontWeight:500 }}>{cfg.label}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:'#f0ede6' }}>{count} <span style={{ fontWeight:400, color:'rgba(240,237,230,0.4)' }}>({pct}%)</span></span>
                </div>
                <div style={{ background:'rgba(255,255,255,0.06)', borderRadius:4, height:6, overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:4, background: key==='demo' ? '#555' : key==='pro' ? '#1a5fa0' : '#7c3aed', width:`${pct}%`, transition:'width 0.4s' }}/>
                </div>
              </div>
            );
          })}
        </div>

        {/* Billing health */}
        <div style={SA_STYLES.card}>
          <div style={{ ...SA_STYLES.label, marginBottom:16 }}>Billing health</div>
          {TENANTS.filter(t => t.tier !== 'demo').map(t => (
            <div key={t.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'9px 0', borderBottom:'0.5px solid rgba(255,255,255,0.05)' }}>
              <div>
                <div style={{ fontSize:13, fontWeight:500, color:'rgba(240,237,230,0.8)' }}>{t.company}</div>
                <div style={{ fontSize:11, color:'rgba(240,237,230,0.35)' }}>{t.nextBillingDate ? `Next: ${t.nextBillingDate}` : '—'}</div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:12, fontWeight:600, color:'rgba(240,237,230,0.6)' }}>R {t.monthlyRate?.toLocaleString()}/mo</span>
                <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600, background: t.billingStatus==='paid' ? 'rgba(45,122,31,0.2)' : t.billingStatus==='overdue' ? 'rgba(160,32,32,0.2)' : 'rgba(255,255,255,0.06)', color: t.billingStatus==='paid' ? '#6dbd5a' : t.billingStatus==='overdue' ? '#f87171' : '#aaa' }}>
                  {BILLING_CONFIG[t.billingStatus]?.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div style={SA_STYLES.card}>
        <div style={{ ...SA_STYLES.label, marginBottom:16 }}>Recent activity</div>
        {recentActivity.map((a, i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'11px 0', borderBottom: i < recentActivity.length-1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:typeColor[a.type], marginTop:5, flexShrink:0 }}/>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:500, color:'rgba(240,237,230,0.85)' }}>{a.event}</div>
              <div style={{ fontSize:12, color:'rgba(240,237,230,0.4)', marginTop:2 }}>{a.detail}</div>
            </div>
            <div style={{ fontSize:11, color:'rgba(240,237,230,0.25)', flexShrink:0 }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
