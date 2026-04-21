import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './store';
import PublicLayout from './pages/public/PublicLayout';
import HomePage from './pages/public/HomePage';
import { AboutPage, PricingPage, ContactPage, LoginPage } from './pages/public/PublicPages';
import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Zones from './pages/Zones';
import Subcontractors from './pages/Subcontractors';
import Warehouse from './pages/Warehouse';
import FieldLog from './pages/FieldLog';
import Reports from './pages/Reports';
import Admin from './pages/admin/Admin';
import Payments from './pages/Payments';
import FieldApp from './pages/field/FieldApp';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/field" element={<FieldApp />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="zones" element={<Zones />} />
            <Route path="subcontractors" element={<Subcontractors />} />
            <Route path="warehouse" element={<Warehouse />} />
            <Route path="field-log" element={<FieldLog />} />
            <Route path="reports" element={<Reports />} />
            <Route path="admin" element={<Admin />} />
            <Route path="payments" element={<Payments />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}