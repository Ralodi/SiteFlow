import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, MapPin, Users, Package, ClipboardList, FileBarChart2, Radio } from 'lucide-react';
import './Layout.css';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/zones', label: 'Zones', icon: MapPin },
  { to: '/subcontractors', label: 'Subcontractors', icon: Users },
  { to: '/warehouse', label: 'Warehouse', icon: Package },
  { to: '/field-log', label: 'Field Log', icon: ClipboardList },
  { to: '/reports', label: 'Reports', icon: FileBarChart2 },
];

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon"><Radio size={18} /></div>
          <div>
            <div className="brand-name">FiberTrack</div>
            <div className="brand-sub">Rollout Management</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">Soweto Fibre Phase 1</div>
          <div className="sidebar-footer-sub">Tender: FIB-2025-SW-001</div>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
