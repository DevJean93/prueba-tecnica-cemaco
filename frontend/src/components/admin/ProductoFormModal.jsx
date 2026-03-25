import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../config/api';

export const ProductoFormModal = ({ isOpen, onClose, productoAEditar, onGuardadoExitoso }) => {
    const [formData, setFormData] = useState({
        nombre: '', descripcion: '', precio: '', sku: '', inventario: '', imagen: ''
    });
    const [loading, setLoading] = useState(false);


    const [showUI, setShowUI] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setShowUI(true), 10); // Pequeño delay para que Tailwind detecte la transición
            if (productoAEditar) setFormData(productoAEditar);
            else setFormData({ nombre: '', descripcion: '', precio: '', sku: '', inventario: '', imagen: '' });
        } else {
            setShowUI(false);
        }
    }, [productoAEditar, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const toastId = toast.loading('Guardando producto...');

        try {
            if (productoAEditar) {
                await api.put(`/productos/${productoAEditar.id}`, formData);
                toast.success('Producto actualizado exitosamente', { id: toastId });
            } else {
                await api.post('/productos', formData);
                toast.success('Producto creado exitosamente', { id: toastId });
            }

            onGuardadoExitoso();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error('Error al guardar. Verifica los datos.', { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (

        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${showUI ? 'opacity-100' : 'opacity-0'}`}>


            <div className={`bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] transform transition-all duration-300 ${showUI ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>

                <div className="bg-[#0033a0] px-6 py-4 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold">{productoAEditar ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl leading-none transition-transform hover:rotate-90">&times;</button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                    <form id="producto-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* ... (Todo el contenido de tus inputs se queda exactamente igual) ... */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                            <input type="text" name="nombre" required value={formData.nombre} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0033a0] transition-shadow" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea name="descripcion" rows="3" value={formData.descripcion} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0033a0] transition-shadow"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                            <input type="text" name="sku" required value={formData.sku} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0033a0] transition-shadow" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (Q)</label>
                            <input type="number" step="0.01" name="precio" required value={formData.precio} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0033a0] transition-shadow" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Inventario</label>
                            <input type="number" name="inventario" required value={formData.inventario} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0033a0] transition-shadow" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
                            <input type="url" name="imagen" required value={formData.imagen} onChange={handleChange} placeholder="https://..." className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0033a0] transition-shadow" />
                        </div>
                    </form>
                </div>

                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                    <button type="button" onClick={onClose} disabled={loading} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors">Cancelar</button>
                    <button type="submit" form="producto-form" disabled={loading} className="px-4 py-2 text-white bg-[#ff6a13] rounded hover:bg-orange-600 font-medium transition-colors flex items-center gap-2">
                        {loading ? <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span> : null}
                        {loading ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                </div>
            </div>
        </div>
    );
};