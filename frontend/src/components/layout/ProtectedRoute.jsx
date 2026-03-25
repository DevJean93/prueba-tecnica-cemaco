import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

export const ProtectedRoute = ({ rolesPermitidos }) => {
    const { isAuthenticated, rol } = useAuthStore();


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }


    if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
        return <Navigate to="/" replace />;
    }


    return <Outlet />;
};