import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';
import { ProductoFormModal } from '../components/admin/ProductoFormModal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';

const AdminMantenimiento = () => {
    const { rol } = useAuthStore();
    const navigate = useNavigate();

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productoEditando, setProductoEditando] = useState(null);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [idEliminando, setIdEliminando] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        fetchProductosAdmin();
    }, []);

    const fetchProductosAdmin = async () => {
        try {
            setLoading(true);
            const response = await api.get('/productos');
            setProductos(response.data);
        } catch (error) {
            toast.error('No se pudo cargar el inventario.');
        } finally {
            setLoading(false);
        }
    };

    const executeEliminar = async () => {
        if (!idEliminando) return;
        setDeleteLoading(true);
        try {
            await api.delete(`/productos/${idEliminando}`);
            await fetchProductosAdmin();
            toast.success('Producto eliminado con éxito');
        } catch (error) {
            toast.error('Hubo un error al intentar eliminar el producto.');
        } finally {
            setDeleteLoading(false);
            setIsConfirmOpen(false);
            setIdEliminando(null);
        }
    };

    const handleCrear = () => {
        setProductoEditando(null);
        setIsModalOpen(true);
    };

    const handleEditar = (producto) => {
        setProductoEditando(producto);
        setIsModalOpen(true);
    };

    const handleSolicitarEliminar = (id) => {
        setIdEliminando(id);
        setIsConfirmOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1500px] mx-auto">
                <div className="mb-6 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center gap-2 text-gray-600 hover:text-[#0033a0] transition-colors font-medium cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        Volver al Dashboard
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center mb-8 p-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Mantenimiento de Inventario</h1>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <button
                            onClick={handleCrear}
                            className="bg-[#88c044] hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer flex items-center gap-2 text-sm w-full sm:w-auto justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            + Nuevo Producto
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">Listado Maestro</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100">
                            <thead className="bg-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">SKU</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Producto</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio (GTQ)</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock Real</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-16">
                                        <div className="flex justify-center flex-col items-center gap-4 text-gray-500">
                                            <span className="animate-spin h-8 w-8 border-4 border-gray-200 border-t-[#ff6a13] rounded-full"></span>
                                            <span className="text-sm font-medium">Cargando datos...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : productos.map((prod) => (
                                <tr key={prod.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-mono tracking-tighter bg-gray-50/20">{prod.sku}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img className="h-12 w-12 rounded-lg object-contain border border-gray-100 bg-white p-0.5 shadow-inner flex-shrink-0" src={prod.imagen} alt="" />
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-gray-900 line-clamp-1">{prod.nombre}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{prod.descripcion || 'Sin descripción'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-950 font-extrabold tracking-tight">
                                        Q{prod.precio.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 inline-flex text-xs font-bold rounded-full ${
                          prod.inventario > 5 ? 'bg-green-50 text-green-800' :
                              prod.inventario > 0 ? 'bg-yellow-50 text-yellow-800' :
                                  'bg-red-50 text-red-800'
                      }`}>
                        {prod.inventario} unidades
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEditar(prod)} className="text-[#0033a0] hover:text-blue-800 mr-5 cursor-pointer font-semibold">Editar</button>
                                        {rol === 'Administrador' && (
                                            <button onClick={() => handleSolicitarEliminar(prod.id)} className="text-red-600 hover:text-red-900 cursor-pointer font-semibold">Eliminar</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <ProductoFormModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    productoAEditar={productoEditando}
                    onGuardadoExitoso={fetchProductosAdmin}
                />

                <ConfirmDialog
                    isOpen={isConfirmOpen}
                    loading={deleteLoading}
                    onClose={() => { setIsConfirmOpen(false); setIdEliminando(null); }}
                    onConfirm={executeEliminar}
                    title="¿Eliminar producto de forma permanente?"
                    message="Estás a punto de eliminar el producto seleccionado de la base de datos. Esta acción es irreversible. ¿Deseas confirmar?"
                />
            </div>
        </div>
    );
};

export default AdminMantenimiento;