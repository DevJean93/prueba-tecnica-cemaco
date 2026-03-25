import React, { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import { api } from '../../config/api';
import toast from 'react-hot-toast';

export const CartWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { cart, removeFromCart, clearCart, getTotal } = useCartStore();

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        setLoading(true);
        try {

            const payload = cart.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad
            }));

            await api.post('/ventas/checkout', payload);
            toast.success('¡Compra realizada con éxito!');
            clearCart();
            setIsOpen(false);

        } catch (error) {
            toast.error(error.response?.data || 'Error al procesar la compra');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0 && !isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Modal del carrito */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden mb-2">
                    <div className="bg-[#0033a0] text-white p-4 flex justify-between items-center">
                        <h3 className="font-bold">Tu Carrito</h3>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">✕</button>
                    </div>

                    <div className="max-h-64 overflow-y-auto p-4 flex flex-col gap-4">
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center">El carrito está vacío</p>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-800 line-clamp-1">{item.nombre}</p>
                                        <p className="text-xs text-gray-500">{item.cantidad} x Q{item.precio.toFixed(2)}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-4 bg-gray-50 border-t">
                            <div className="flex justify-between items-center mb-4 font-bold text-lg">
                                <span>Total:</span>
                                <span className="text-[#0033a0]">Q{getTotal().toFixed(2)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full bg-[#88c044] hover:bg-[#7ab03c] text-white py-2 rounded-lg font-bold transition-colors flex justify-center items-center"
                            >
                                {loading ? 'Procesando...' : 'Comprar Ahora'}
                            </button>
                        </div>
                    )}
                </div>
            )}


            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#ff6a13] hover:bg-[#e65c00] text-white rounded-full p-4 shadow-lg transition-transform hover:scale-105 flex items-center justify-center relative"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white">
            {cart.reduce((total, item) => total + item.cantidad, 0)}
          </span>
                )}
            </button>
        </div>
    );
};