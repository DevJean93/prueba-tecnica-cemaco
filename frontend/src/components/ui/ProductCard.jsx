import React from 'react';

export const ProductCard = ({ producto }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">


            <div className="w-full relative pt-[100%] bg-white overflow-hidden">
                <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
            </div>


            <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
                <p className="text-xs text-gray-400 mb-1 font-mono">SKU: {producto.sku}</p>

                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 h-10">
                    {producto.nombre}
                </h3>

                <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-grow">
                    {producto.descripcion}
                </p>

                <div className="mt-auto">
                    <p className="text-xl font-bold text-[#0033a0]">
                        Q{producto.precio.toFixed(2)}
                    </p>

                    <button className="w-full mt-3 bg-[#ff6a13] hover:bg-orange-600 text-white font-medium py-2 rounded transition-colors shadow-sm cursor-pointer">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};