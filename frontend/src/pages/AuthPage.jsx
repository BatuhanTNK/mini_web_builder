import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login, register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let result;
    if (mode === 'login') {
      result = await login(form.email, form.password);
    } else {
      result = await register(form.name, form.email, form.password);
    }
    if (result?.success) {
      navigate('/dashboard');
    } else {
      setError(result?.message || 'Bir hata oluştu');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__bg" />
      <div className="auth-page__card">
        <Link to="/" className="auth-page__logo">
          <span className="auth-page__logo-icon">🌐</span>
          <span className="auth-page__logo-text">MiniWeb</span>
        </Link>

        <h1 className="auth-page__title">
          {mode === 'login' ? 'Hoş Geldiniz 👋' : 'Hesap Oluştur ✨'}
        </h1>
        <p className="auth-page__subtitle">
          {mode === 'login' ? 'Hesabınıza giriş yapın' : 'Ücretsiz başlayın, hemen oluşturun'}
        </p>

        {error && <div className="auth-page__error">{error}</div>}

        <form className="auth-page__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="auth-page__field">
              <label>Ad Soyad</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Adınız Soyadınız"
                required
              />
            </div>
          )}
          <div className="auth-page__field">
            <label>E-posta</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="ornek@email.com"
              required
            />
          </div>
          <div className="auth-page__field">
            <label>Şifre</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <button type="submit" className="auth-page__submit" disabled={loading}>
            {loading ? '⏳ Lütfen bekleyin...' : mode === 'login' ? 'Giriş Yap →' : 'Hesap Oluştur →'}
          </button>
        </form>

        <p className="auth-page__switch">
          {mode === 'login' ? (
            <>Hesabınız yok mu? <button onClick={() => setMode('register')}>Kayıt Ol</button></>
          ) : (
            <>Zaten hesabınız var mı? <button onClick={() => setMode('login')}>Giriş Yap</button></>
          )}
        </p>
      </div>
    </div>
  );
}
