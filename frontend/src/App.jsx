import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';
import PublicSite from './pages/PublicSite';
import QRGenerator from './pages/QRGenerator';
import Landing from './pages/Landing';
import AuthPage from './pages/AuthPage';
import { useEffect } from 'react';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthStore();
  if (loading) return <div>Yükleniyor...</div>;
  if (!isAuthenticated()) return <Navigate to="/auth" />;
  return children;
};

export default function App() {
  const { fetchUser, token } = useAuthStore();

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/builder/:siteId" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
      <Route path="/builder/:siteId/qr" element={<ProtectedRoute><QRGenerator /></ProtectedRoute>} />
      <Route path="/p/:slug" element={<PublicSite />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
