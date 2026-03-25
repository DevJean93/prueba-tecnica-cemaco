import React from 'react';
import { useCartStore } from '../../store/useCartStore';

export const ProductCard = ({ producto }) => {
    const { addToCart } = useCartStore();

    const formatPrice = (price) => {
        const [int, dec] = price.toFixed(2).split('.');
        return { int, dec };
    };

    const { int, dec } = formatPrice(producto.precio);


    const agotado = producto.inventario <= 0;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300">

            <div className="relative h-48 sm:h-56 p-4 flex justify-center items-center bg-white">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />


                {agotado ? (
                    <span className="absolute top-3 left-3 bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded">
                        Agotado
                    </span>
                ) : (
                    <span className="absolute top-3 left-3 bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                        {producto.inventario} disponibles
                    </span>
                )}
            </div>


            <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
                <p className="text-xs text-gray-400 font-mono mb-1">SKU: {producto.sku}</p>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 min-h-[40px] group-hover:text-[#102074] transition-colors cursor-pointer">
                    {producto.nombre}
                </h3>

                <div className="mt-auto pt-2">
                    <div className="text-gray-900 font-extrabold text-xl flex items-start">
                        Q{int}<sup className="text-sm mt-1">{dec}</sup>
                    </div>
                </div>


                <button
                    onClick={() => addToCart(producto)}
                    disabled={agotado}
                    className={`mt-4 w-full py-2.5 rounded text-sm font-bold uppercase tracking-wide transition-all flex justify-center items-center gap-2
                        ${agotado
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        : 'bg-[#102074] hover:bg-[#0a1552] text-white shadow-sm hover:shadow active:scale-[0.98]'
                    }`}
                >
                    {agotado ? 'Sin Inventario' : 'Añadir a la carreta'}
                </button>
            </div>
        </div>
    );
};