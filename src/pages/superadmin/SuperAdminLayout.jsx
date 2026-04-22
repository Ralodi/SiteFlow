import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const NAV = [
  { key: 'overview',  label: 'Overview',    icon: '📊' },
  { key: 'tenants',   label: 'Tenants',     icon: '🏢' },
  { key: 'onboard',   label: 'Onboarding',  icon: '✉️' },
  { key: 'billing',   label: 'Billing',     icon: '💳' },
  { key: 'settings',  label: 'SA Settings', icon: '⚙️' },
];

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('overview');

  const go = (key) => {
    setActiveNav(key);
    navigate(`/superadmin/${key === 'overview' ? '' : key}`);
  };

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#08090a', fontFamily:'var(--font-body)' }}>

      {/* Sidebar */}
      <aside style={{ width:220, minWidth:220, background:'#0d0e10', borderRight:'0.5px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh' }}>

        {/* Brand */}
        <div style={{ padding:'22px 18px', borderBottom:'0.5px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
            <div style={{ width:30, height:30, background:'#7c3aed', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14 }}>⚡</div>
            <div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1rem', fontWeight:800, color:'#f0ede6', letterSpacing:'-0.02em' }}>SiteFlow</div>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#7c3aed' }}>Super Admin</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'10px 10px' }}>
          {NAV.map(item => (
            <button
              key={item.key}
              onClick={() => go(item.key)}
              style={{
                display:'flex', alignItems:'center', gap:10,
                width:'100%', padding:'9px 10px',
                border:'none', borderRadius:7, cursor:'pointer',
                fontFamily:'var(--font-body)', fontSize:13.5, fontWeight:400, textAlign:'left',
                background: activeNav===item.key ? 'rgba(124,58,237,0.18)' : 'transparent',
                color: activeNav===item.key ? '#a78bfa' : 'rgba(240,237,230,0.4)',
                marginBottom:2, transition:'all 0.12s',
              }}
            >
              <span style={{ fontSize:15 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding:'14px 18px', borderTop:'0.5px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => navigate('/app')}
            style={{ display:'flex', alignItems:'center', gap:8, background:'none', border:'none', cursor:'pointer', fontSize:13, color:'rgba(240,237,230,0.35)', fontFamily:'var(--font-body)', padding:0 }}
          >
            ← Back to App
          </button>
          <div style={{ fontSize:11, color:'rgba(240,237,230,0.2)', marginTop:8 }}>SiteFlow v3 · Operator Panel</div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex:1, overflow:'auto' }}>
        <Outlet context={{ activeNav, setActiveNav }} />
      </main>
    </div>
  );
}
