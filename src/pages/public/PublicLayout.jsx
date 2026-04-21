import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const LogoMark = () => (
  <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
    <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c"/>
    <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/>
    <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/>
    <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c"/>
  </svg>
);

export default function PublicLayout() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#0e0f0c', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(20px,4vw,60px)', height: 64,
        background: 'rgba(14,15,12,0.88)', backdropFilter: 'blur(16px)',
        borderBottom: '0.5px solid rgba(255,255,255,0.08)'
      }}>
        <NavLink to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div style={{ width:32, height:32, background:'var(--amber)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <LogoMark/>
          </div>
          <span style={{ fontFamily:'var(--font-display)', fontSize:'1.15rem', fontWeight:800, color:'#f0ede6', letterSpacing:'-0.02em' }}>SiteFlow</span>
        </NavLink>

        <div style={{ display:'flex', alignItems:'center', gap:4 }}>
          {[['/', 'Home'], ['/about', 'About'], ['/pricing', 'Pricing'], ['/contact', 'Contact']].map(([to, label]) => (
            <NavLink key={to} to={to} end={to==='/'} style={({ isActive }) => ({
              padding:'7px 14px', borderRadius:7, fontSize:14, textDecoration:'none',
              color: isActive ? 'var(--amber)' : 'rgba(240,237,230,0.5)',
              background: isActive ? 'rgba(232,160,32,0.08)' : 'none',
              transition:'color 0.15s'
            })}>
              {label}
            </NavLink>
          ))}
        </div>

        <button
          onClick={() => navigate('/login')}
          style={{ padding:'8px 20px', background:'var(--amber)', color:'#0e0f0c', border:'none', borderRadius:8, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)' }}>
          Log in →
        </button>
      </nav>

      <div style={{ paddingTop: 64 }}>
        <Outlet/>
      </div>

      <footer style={{ background:'#161712', borderTop:'0.5px solid rgba(255,255,255,0.08)', padding:'48px clamp(20px,5vw,60px) 28px' }}>
        <div style={{ maxWidth:1140, margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:24, borderTop:'0.5px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:22, height:22, background:'var(--amber)', borderRadius:5, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <LogoMark/>
              </div>
              <span style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'0.95rem', color:'rgba(240,237,230,0.8)' }}>SiteFlow</span>
            </div>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.25)' }}>© 2025 SiteFlow · Track Every Site. Deliver Every Project.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
