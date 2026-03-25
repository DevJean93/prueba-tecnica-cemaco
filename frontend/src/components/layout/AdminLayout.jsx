import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
            <header className="bg-[#0033a0] py-4 px-6 shadow-md">
                <div className="max-w-[1500px] mx-auto flex justify-center sm:justify-start">
                    <Link to="/" className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#88c044]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span className="text-white text-2xl font-black tracking-tight">CEMACO</span>
                        <span className="text-blue-200 text-sm ml-3 font-medium border-l border-blue-400 pl-3">Portal Administrativo</span>
                    </Link>
                </div>
            </header>

            <main className="flex-grow">
                <Outlet />
            </main>

            <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
                <div className="max-w-[1500px] mx-auto px-6 text-center text-sm text-gray-500 font-medium">
                    © {new Date().getFullYear()} CEMACO. Sistema de Gestión de Inventario.
                </div>
            </footer>
        </div>
    );
};