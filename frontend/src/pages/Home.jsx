import React, { useEffect, useState } from 'react';
import { api } from '../config/api';
import { ProductCard } from '../components/ui/ProductCard';

const Home = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductosPublicos = async () => {
            try {
                setLoading(true);

                const response = await api.get('/productos/public');
                setProductos(response.data);
            } catch (err) {
                console.error("Error al cargar el catálogo:", err);
                setError("Lo sentimos, no pudimos cargar los productos en este momento.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductosPublicos();
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Encabezado del departamento */}
                <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#0033a0]">
                        Ollas, Sartenes y Cacerolas
                    </h1>
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