import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';

export const AddToCartModal = () => {
    const { isModalOpen, lastAddedItem, closeModal } = useCartStore();
    const navigate = useNavigate();

    if (!isModalOpen || !lastAddedItem) return null;


    const formatPrice = (price) => {
        const [int, dec] = price.toFixed(2).split('.');
        return { int, dec };
    };

    const { int, dec } = formatPrice(lastAddedItem.precio);

    const handleVerCarreta = () => {
        closeModal();
        navigate('/carreta');
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden relative animate-fade-in-up">

                <div className="bg-[#102074] text-white p-3 flex justify-between items-center">
                    <h3 className="w-full text-center font-bold tracking-wide text-lg">AÑADIDO A LA CARRETA</h3>
                    <button onClick={closeModal} className="absolute right-4 text-white hover:text-gray-300 text-xl font-bold">✕</button>
                </div>


                <div className="p-8 flex flex-col md:flex-row gap-8 items-center justify-center border-b border-gray-100">
                    <img
                        src={lastAddedItem.imagen}
                        alt={lastAddedItem.nombre}
                        className="w-48 h-48 object-contain"
                    />
                    <div className="flex flex-col max-w-xs">
                        <h4 className="text-gray-900 font-medium text-lg leading-tight uppercase mb-3">
                            {lastAddedItem.nombre}
                        </h4>
                        <div className="text-xl font-extrabold flex items-start">
                            Q{int}<sup className="text-sm mt-1">{dec}</sup>
                        </div>
                    </div>
                </div>


                <div className="p-8 flex flex-col md:flex-row gap-6 justify-center items-center bg-gray-50/50">
                    <button
                        onClick={closeModal}
                        className="bg-[#102074] hover:bg-[#0a1552] text-white font-bold py-3 px-8 rounded-full transition-colors w-full md:w-auto uppercase tracking-wide text-sm"
                    >
                        Seguir Comprando
                    </button>
                    <button
                        onClick={handleVerCarreta}
                        className="text-gray-700 hover:text-[#102074] underline font-medium cursor-pointer"
                    >
                        Ver carreta
                    </button>
                </div>
            </div>
        </div>
    );
};