import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MapPin, Users, Package, ClipboardList, FileBarChart2, Settings, LogOut, Smartphone, CreditCard } from 'lucide-react';

const LogoMark = () => (
  <svg viewBox="0 0 18 18" fill="none" width="18" height="18">
    <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c"/>
    <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/>
    <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/>
    <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c"/>
  </svg>
);

const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
      { to: '/app/zones', label: 'Zones', icon: MapPin },
      { to: '/app/reports', label: 'Reports', icon: FileBarChart2 },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/app/subcontractors', label: 'Subcontractors', icon: Users },
      { to: '/app/warehouse', label: 'Warehouse', icon: Package },
      { to: '/app/field-log', label: 'Field Log', icon: ClipboardList },
      { to: '/app/payments', label: 'Payments', icon: CreditCard },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/app/admin', label: 'Admin & Settings', icon: Settings },
    ],
  },
];

export default function AppLayout() {
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand" style={{ cursor:'pointer' }} onClick={() => navigate('/')}>
          <div className="brand-mark"><LogoMark/></div>
          <div>
            <div className="brand-name">SiteFlow</div>
            <div className="brand-tagline">Project Management</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map(group => (
            <div key={group.label}>
              <div className="sidebar-section-label">{group.label}</div>
              {group.items.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to} to={to} end={end}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                >
                  <Icon size={15} className="nav-icon"/>
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          ))}

          <div style={{ marginTop:'auto', paddingTop:8 }}>
            <button className="nav-item" style={{ width:'100%' }} onClick={() => navigate('/field')}>
              <Smartphone size={15} className="nav-icon"/>
              <span>Field App View</span>
            </button>
            <button className="nav-item" onClick={() => navigate('/')} style={{ width:'100%' }}>
              <LogOut size={15} className="nav-icon"/>
              <span>Back to Website</span>
            </button>
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-avatar">MC</div>
            <div>
              <div className="user-name">Main Contractor</div>
              <div className="user-role">Project Manager</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <Outlet/>
      </main>
    </div>
  );
}