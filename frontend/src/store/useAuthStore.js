import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStorage } from '../utils/secureStorage';

export const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            rol: null,
            isAuthenticated: false,

            login: (token, rol) => {
                set({ token, rol, isAuthenticated: true });
            },

            logout: () => {
                set({ token: null, rol: null, isAuthenticated: false });
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => secureStorage),
        }
    )
);