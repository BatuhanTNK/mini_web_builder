import { create } from 'zustand';

const API_BASE = '/api';

// Token yönetimi
function getToken() {
  return localStorage.getItem('miniweb_token') || '';
}
function setToken(token) {
  localStorage.setItem('miniweb_token', token);
}
function removeToken() {
  localStorage.removeItem('miniweb_token');
}

// Kullanıcı yönetimi
function getSavedUser() {
  try {
    const raw = localStorage.getItem('miniweb_user');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function setSavedUser(user) {
  localStorage.setItem('miniweb_user', JSON.stringify(user));
}
function removeSavedUser() {
  localStorage.removeItem('miniweb_user');
}

export const useAuthStore = create((set, get) => ({
  user: getSavedUser(),
  token: getToken(),
  loading: false,
  error: null,

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        set({ loading: false, error: data.message || 'Kayıt başarısız' });
        return { success: false, message: data.message };
      }
      setToken(data.token);
      setSavedUser(data.user);
      set({ user: data.user, token: data.token, loading: false, error: null });
      return { success: true };
    } catch (e) {
      set({ loading: false, error: e.message });
      return { success: false, message: e.message };
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        set({ loading: false, error: data.message || 'Giriş başarısız' });
        return { success: false, message: data.message };
      }
      setToken(data.token);
      setSavedUser(data.user);
      set({ user: data.user, token: data.token, loading: false, error: null });
      return { success: true };
    } catch (e) {
      set({ loading: false, error: e.message });
      return { success: false, message: e.message };
    }
  },

  fetchUser: async () => {
    const token = getToken();
    if (!token) return;
    set({ loading: true });
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        removeToken();
        removeSavedUser();
        set({ user: null, token: '', loading: false });
        return;
      }
      const data = await res.json();
      setSavedUser(data.user);
      set({ user: data.user, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  logout: () => {
    removeToken();
    removeSavedUser();
    set({ user: null, token: '', error: null });
  },

  clearError: () => set({ error: null }),

  // Helper — token var mı?
  isAuthenticated: () => !!getToken() && !!get().user
}));
