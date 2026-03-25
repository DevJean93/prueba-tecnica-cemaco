import React from 'react';

export const InventoryDashboard = ({ productos, loading }) => {
    if (loading) return null;


    const totalProductos = productos.length;
    const agotados = productos.filter(p => p.inventario === 0).length;
    const criticos = productos.filter(p => p.inventario > 0 && p.inventario <= 5).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                <div className="bg-blue-100 p-3 rounded-full mr-4 text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Total en Catálogo</p>
                    <p className="text-2xl font-bold text-gray-900">{totalProductos}</p>
                </div>
            </div>


            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center transition-transform hover:-translate-y-1 hover:shadow-md duration-300">
                <div className="bg-yellow-100 p-3 rounded-full mr-4 text-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">Stock Crítico (≤ 5)</p>
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
        </div>
    );
};