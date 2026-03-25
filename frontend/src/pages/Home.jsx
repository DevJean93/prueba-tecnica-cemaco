import React, { useEffect, useState, useCallback } from 'react';
import { api } from '../config/api';
import { ProductCard } from '../components/ui/ProductCard';
import { useSignalR } from '../hooks/useSignalR';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProductosPublicos = useCallback(async () => {
        try {
            const response = await api.get('/productos/public');
            setProductos(response.data);
            setError(null);
        } catch (err) {
            setError("Lo sentimos, no pudimos cargar los productos en este momento.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProductosPublicos();
    }, [fetchProductosPublicos]);

    const { connectionStatus } = useSignalR(
        "http://localhost:8080/inventoryHub",
        "InventarioActualizado",
        fetchProductosPublicos
    );

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto">

                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#0033a0]">
                            Ollas, Sartenes y Cacerolas
                        </h1>

                        {connectionStatus === 'Conectado' && (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                                </span>
                                En Vivo
                            </span>
                        )}

                        {connectionStatus === 'Reconectando' && (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 shadow-sm">
                                <span className="animate-spin h-3 w-3 border-2 border-orange-500 border-t-transparent rounded-full"></span>
                                Reconectando...
                            </span>
                        )}
                    </div>

                    <span className="text-gray-500 text-sm hidden md:block font-medium">
                        {productos.length} productos disponibles
                    </span>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff6a13]"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md my-8">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {!loading && !error && productos.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                        <p className="text-gray-500 text-lg">No hay productos con inventario disponible por el momento.</p>
                    </div>
                )}

                {!loading && !error && productos.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {productos.map((producto) => (
                            <ProductCard key={producto.id} producto={producto} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Home;