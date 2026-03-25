import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './components/layout/MainLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminMantenimiento from './pages/AdminMantenimiento';
import CartPage from './pages/CartPage';
import { AddToCartModal } from './components/ui/AddToCartModal';
import { useAuthStore } from './store/useAuthStore.js';
import { secureStorage } from './utils/secureStorage.js';

function App() {
    useEffect(() => {
        const syncTabs = (event) => {
            if (event.key === 'auth-storage') {
                const data = secureStorage.getItem('auth-storage');
                const currentState = useAuthStore.getState();

                if (!data) {
                    if (currentState.isAuthenticated) currentState.logout();
                    return;
                }

                try {
                    const parsed = JSON.parse(data);
                    if (!parsed.state.isAuthenticated && currentState.isAuthenticated) {
                        currentState.logout();
                    }
                } catch (e) {
                    if (currentState.isAuthenticated) currentState.logout();
                }
            }
        };

        window.addEventListener('storage', syncTabs);
        return () => window.removeEventListener('storage', syncTabs);
    }, []);

    return (
        <BrowserRouter>
            <Toaster position="top-right" reverseOrder={false} />

            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/carreta" element={<CartPage />} />

                <Route element={<AdminLayout />}>
                    <Route path="/login" element={<Login />} />

                    <Route element={<ProtectedRoute rolesPermitidos={['Administrador', 'Colaborador']} />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/mantenimiento" element={<AdminMantenimiento />} />
                    </Route>
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <AddToCartModal />
        </BrowserRouter>
    );
}

export default App;