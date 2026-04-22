import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

// In development mode, skip auth so you can work locally without Supabase
const DEV_MODE = import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL?.includes('supabase.co');

export function RequireAuth({ children }) {
  const { session, loading } = useAuth();

  // Bypass auth in local dev if no real Supabase keys
  if (DEV_MODE) return children;

  if (loading) {
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
          <div style={{ color:'rgba(240,237,230,0.4)', fontSize:13, marginTop:6 }}>Loading your workspace...</div>
        </div>
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;
  return children;
}

export function RequireGuest({ children }) {
  const { session, loading } = useAuth();
  if (DEV_MODE) return children;
  if (loading) return null;
  if (session) return <Navigate to="/app" replace />;
  return children;
}