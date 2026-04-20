import { create } from 'zustand';

// Misafir kullanıcı — giriş yapmadan her şey kullanılabilir
const GUEST_USER = {
  _id: 'guest',
  name: 'Misafir',
  email: 'guest@local',
  plan: 'free'
};

export const useAuthStore = create(() => ({
  user: GUEST_USER,
  token: 'guest',
  loading: false,
  error: null,

  register: async () => ({ success: true }),
  login: async () => ({ success: true }),
  fetchUser: async () => {},
  logout: () => {},
  clearError: () => {}
}));
