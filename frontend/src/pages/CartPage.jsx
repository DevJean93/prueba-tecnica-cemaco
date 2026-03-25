import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { api } from '../config/api';
import toast from 'react-hot-toast';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, updateQuantity, removeFromCart, clearCart, getTotal } = useCartStore();
    const [loading, setLoading] = useState(false);

    const formatPrice = (price) => {
        return `Q ${price.toFixed(2)}`;
    };

    const handleCheckout = async () => {
        if (cart.length === 0) return;

        setLoading(true);
        try {
            const payload = cart.map(item => ({
                productoId: item.id,
                cantidad: item.cantidad
            }));

            await api.post('/ventas/checkout', payload);
            toast.success('¡Compra finalizada con éxito!');
            clearCart();
            navigate('/');
        } catch (error) {
            toast.error(error.response?.data || 'Error al procesar la compra. Verifica el stock.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-[#102074] mb-4">Tu carreta está vacía</h2>
                <button onClick={() => navigate('/')} className="bg-[#88c044] text-white px-6 py-2 rounded-lg font-bold">
                    Regresar a la tienda
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header falso de pasos */}
            <div className="bg-[#102074] text-white py-4 px-8 hidden md:flex items-center justify-center gap-4 text-sm font-medium">
                <span className="flex items-center gap-2"><span className="bg-[#88c044] text-white rounded-full w-6 h-6 flex justify-center items-center">1</span> Mi carreta</span>
                <span className="text-gray-400">&gt;</span>
                <span className="flex items-center gap-2 text-gray-400"><span className="bg-gray-500 text-white rounded-full w-6 h-6 flex justify-center items-center">2</span> Identificación</span>
                <span className="text-gray-400">&gt;</span>
                <span className="flex items-center gap-2 text-gray-400"><span className="bg-gray-500 text-white rounded-full w-6 h-6 flex justify-center items-center">3</span> Entrega y pago</span>
                <span className="text-gray-400">&gt;</span>
                <span className="flex items-center gap-2 text-gray-400"><span className="bg-gray-500 text-white rounded-full w-6 h-6 flex justify-center items-center">4</span> Confirmación</span>
            </div>

            <div className="max-w-[1200px] mx-auto mt-10 px-4">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-8">Mi carreta</h1>

                {/* Tabla de Carrito */}
                <div className="w-full overflow-x-auto mb-12">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-900 font-bold border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-4 w-1/2">Producto</th>
                            <th className="py-3 px-4 text-center">Envío</th>
                            <th className="py-3 px-4 text-center">Precio</th>
                            <th className="py-3 px-4 text-center">Cantidad</th>
                            <th className="py-3 px-4 text-right">Total</th>
                            <th className="py-3 px-4"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {cart.map(item => (
                            <tr key={item.id} className="border-b border-gray-100">
                                <td className="py-6 px-4 flex items-center gap-4">
                                    <img src={item.imagen} alt={item.nombre} className="w-20 h-20 object-contain border border-gray-200 p-1" />
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm max-w-xs">{item.nombre}</p>
                                        <label className="flex items-center gap-2 mt-2 text-xs text-gray-500 cursor-pointer">
                                            <input type="checkbox" className="rounded text-[#102074] focus:ring-[#102074]" />
                                            🎁 Agregar mensaje y empaque de regalo
                                        </label>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center text-gray-500 text-xs">a calcular</td>
                                <td className="py-4 px-4 text-center">
                                    <span className="block font-medium">{formatPrice(item.precio)}</span>
                                    <span className="block text-xs text-gray-400 line-through mt-1">Reg: Q {(item.precio * 1.2).toFixed(2)}</span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-gray-800">-</button>
                                        <span className="border border-gray-300 px-3 py-1 rounded w-10 text-center">{item.cantidad}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-gray-800">+</button>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-right font-medium">
                                    {formatPrice(item.precio * item.cantidad)}
                                </td>
                                <td className="py-4 px-4 text-right">
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Resumen de Compra */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                    <div className="w-full md:w-1/2">
                        <h3 className="font-extrabold text-xl mb-4">Entrega</h3>
                        <p className="text-sm text-gray-600 mb-4 max-w-sm">Vea todas las opciones de envío para sus productos, incluyendo los plazos y los precios de envío</p>
                        <button className="bg-blue-50 text-[#102074] px-6 py-2 rounded font-medium text-sm hover:bg-blue-100 transition-colors">
                            CALCULAR
                        </button>
                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="text-right mb-6">
                            <button className="text-[#102074] font-bold text-sm underline hover:no-underline">+ Añadir cupón de descuento</button>
                        </div>

                        <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>{formatPrice(getTotal())}</span>
                        </div>
                        <div className="flex justify-between items-center mb-8 text-xl font-extrabold text-gray-900">
                            <span>Total</span>
                            <span>{formatPrice(getTotal())}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="w-full bg-[#102074] hover:bg-[#0a1552] text-white font-bold py-4 rounded transition-colors uppercase tracking-wider"
                        >
                            {loading ? 'Procesando...' : 'FINALIZAR COMPRA'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartPage;