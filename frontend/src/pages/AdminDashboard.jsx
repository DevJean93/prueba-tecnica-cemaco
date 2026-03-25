import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';

const AdminDashboard = () => {
    const { rol, logout } = useAuthStore();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductosAdmin = async () => {
            try {
                setLoading(true);
                const response = await api.get('/productos');
                setProductos(response.data);
            } catch (error) {
                toast.error('No se pudo cargar la información del dashboard.');
            } finally {
                setLoading(false);
            }
        };
        fetchProductosAdmin();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const totalProductos = productos.length;
    const agotados = productos.filter(p => p.inventario === 0).length;
    const criticos = productos.filter(p => p.inventario > 0 && p.inventario <= 5).length;

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1500px] mx-auto">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#0033a0]">Dashboard General</h1>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
                            Sesión activa como: <span className="font-bold text-[#ff6a13] font-mono tracking-wider">{rol}</span>
                        </p>
                    </div>
                    <div className="mt-5 sm:mt-0">
                        <button
                            onClick={handleLogout}
                            className="w-full sm:w-auto justify-center bg-gray-800 hover:bg-gray-950 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer text-sm"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                            <div className="bg-blue-100 p-3 rounded-full mr-4 text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Catálogo</p>
                                <p className="text-2xl font-bold text-gray-900">{totalProductos}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                            <div className="bg-yellow-100 p-3 rounded-full mr-4 text-yellow-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Stock Crítico</p>
                                <p className="text-2xl font-bold text-gray-900">{criticos}</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                            <div className="bg-red-100 p-3 rounded-full mr-4 text-red-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Agotados</p>
                                <p className="text-2xl font-bold text-gray-900">{agotados}</p>
                            </div>
                        </div>

                        <div
                            onClick={() => navigate('/admin/mantenimiento')}
                            className="bg-[#0033a0] rounded-lg shadow-sm border border-[#002880] p-6 flex items-center justify-between transition-transform hover:-translate-y-1 hover:shadow-md duration-300 cursor-pointer group"
                        >
                            <div className="flex items-center">
                                <div className="bg-white/20 p-3 rounded-full mr-4 text-white group-hover:bg-white/30 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-blue-100">Gestión de Inventario</p>
                                    <p className="text-xl font-bold text-white">Mantenimiento</p>
                                </div>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;