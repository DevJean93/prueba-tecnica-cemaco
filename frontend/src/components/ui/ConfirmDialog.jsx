import React, { useEffect, useState } from 'react';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, loading }) => {
    const [showUI, setShowUI] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShowUI(true), 10);
        } else {
            setShowUI(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}>

            <div className={`bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 ${showUI ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>

                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-red-100 text-red-600 p-3 rounded-full flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">{title || 'Confirmar acción'}</h3>
                    </div>
                </div>

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {message || '¿Estás seguro de que deseas continuar? Esta acción no se puede deshacer.'}
                </p>

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-60"
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-5 py-2.5 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-70 shadow-sm"
                    >
                        {loading ? (
                            <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        ) : null}
                        {loading ? 'Eliminando...' : 'Sí, eliminar'}
                    </button>
                </div>

            </div>
        </div>
    );
};