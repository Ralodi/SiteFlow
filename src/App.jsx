import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './store';
import { AuthProvider } from './lib/auth';
import { RequireAuth, RequireSuperAdmin } from './lib/guards';

// Public pages
import PublicLayout from './pages/public/PublicLayout';
import HomePage from './pages/public/HomePage';
import { AboutPage, PricingPage, ContactPage, LoginPage } from './pages/public/PublicPages';

// App shell
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Zones from './pages/Zones';
import Subcontractors from './pages/Subcontractors';
import Warehouse from './pages/Warehouse';
import FieldLog from './pages/FieldLog';
import Reports from './pages/Reports';
import Payments from './pages/Payments';
import Admin from './pages/admin/Admin';

// Field app
import FieldApp from './pages/field/FieldApp';

// Super admin
import SuperAdminLayout from './pages/superadmin/SuperAdminLayout';
import SAOverview from './pages/superadmin/SAOverview';
import SATenants from './pages/superadmin/SATenants';
import SAOnboarding from './pages/superadmin/SAOnboarding';
import SABilling from './pages/superadmin/SABilling';

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            {/* Public website */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Field app */}
            <Route path="/field" element={<RequireAuth><FieldApp /></RequireAuth>} />

            {/* Management system */}
            <Route path="/app" element={<RequireAuth><AppLayout /></RequireAuth>}>
              <Route index element={<Dashboard />} />
              <Route path="zones" element={<Zones />} />
              <Route path="subcontractors" element={<Subcontractors />} />
              <Route path="warehouse" element={<Warehouse />} />
              <Route path="field-log" element={<FieldLog />} />
              <Route path="reports" element={<Reports />} />
              <Route path="payments" element={<Payments />} />
              <Route path="admin" element={<Admin />} />
            </Route>

            {/* Super admin — your operator panel */}
            <Route path="/superadmin" element={<RequireSuperAdmin><SuperAdminLayout /></RequireSuperAdmin>}>
              <Route index element={<SAOverview />} />
              <Route path="tenants" element={<SATenants />} />
              <Route path="onboard" element={<SAOnboarding />} />
              <Route path="billing" element={<SABilling />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  );
}