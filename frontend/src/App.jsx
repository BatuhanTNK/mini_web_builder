import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import PublicSite from './pages/PublicSite';
import QRGenerator from './pages/QRGenerator';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/builder/:siteId" element={<Builder />} />
      <Route path="/builder/:siteId/qr" element={<QRGenerator />} />
      <Route path="/p/:slug" element={<PublicSite />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
