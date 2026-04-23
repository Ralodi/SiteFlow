import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

const SUPER_ADMIN_EMAIL = 'peloagaeri@gmail.com';

const DEV_BYPASS = import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL?.includes('supabase.co');

export function RequireAuth({ children }) {
  const { session, loading } = useAuth();
  if (DEV_BYPASS) return children;
  if (loading) return <LoadingScreen/>;
  if (!session) return <Navigate to="/login" replace/>;
  return children;
}

export function RequireSuperAdmin({ children }) {
  const { session, loading } = useAuth();
  if (loading) return <LoadingScreen/>;
  if (!session) return <Navigate to="/login" replace/>;
  if (session.user.email !== SUPER_ADMIN_EMAIL) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#08090a', flexDirection:'column', gap:16 }}>
        <div style={{ fontSize:40 }}>🔒</div>
        <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:700, color:'#f0ede6' }}>Access Denied</div>
        <div style={{ fontSize:14, color:'rgba(240,237,230,0.4)' }}>This area is restricted to SiteFlow operators only.</div>
        <div style={{ fontSize:12, color:'rgba(240,237,230,0.25)', marginTop:8, fontFamily:'monospace' }}>
          Logged in as: {session.user.email}
        </div>
        <button onClick={() => window.location.href='/app'} style={{ marginTop:8, padding:'9px 20px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontFamily:'var(--font-body)' }}>
          Back to App
        </button>
      </div>
    );
  }
  return children;
}

export function RequireGuest({ children }) {
  const { session, loading } = useAuth();
  if (DEV_BYPASS) return children;
  if (loading) return null;
  if (session) return <Navigate to="/app" replace/>;
  return children;
}

function LoadingScreen() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#0e0f0c' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:36, height:36, background:'#e8a020', borderRadius:9, margin:'0 auto 16px', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
            <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c"/>
            <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/>
            <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/>
            <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c"/>
          </svg>
        </div>
        <div style={{ fontFamily:'var(--font-display)', color:'#f0ede6', fontSize:'1rem', fontWeight:700 }}>SiteFlow</div>
        <div style={{ color:'rgba(240,237,230,0.4)', fontSize:13, marginTop:6 }}>Loading...</div>
      </div>
    </div>
  );
}