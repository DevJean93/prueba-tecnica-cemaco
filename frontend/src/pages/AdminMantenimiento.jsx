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
    const [busqueda, setBusqueda] = useState('');

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

    const productosFiltrados = productos.filter((prod) =>
        prod.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        prod.sku.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1500px] mx-auto">
                <div className="mb-6 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="flex items-center gap-2 text-gray-500 hover:text-[#0033a0] transition-colors font-medium cursor-pointer bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Volver al Dashboard
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-center mb-6 p-6">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Mantenimiento de Inventario</h1>
                        <p className="text-sm text-gray-500 mt-1">Gestiona el catálogo, actualiza precios y controla el stock central.</p>
                    </div>
                    <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                        <button
                            onClick={handleCrear}
                            className="bg-[#88c044] hover:bg-[#7ab03c] text-white px-6 py-2.5 rounded-lg font-bold transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                            Nuevo Producto
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-10">

                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0033a0] focus:border-[#0033a0] sm:text-sm transition-colors"
                                placeholder="Buscar por nombre o SKU..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                        <div className="hidden sm:block text-sm text-gray-500 font-medium">
                            Mostrando {productosFiltrados.length} de {productos.length}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-white">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                                    SKU
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Detalle del Producto
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                                    Precio
                                </th>
                                <th scope="col" className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-wider w-40">
                                    Stock Real
                                </th>
                                <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                                    Acciones
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20">
                                        <div className="flex justify-center flex-col items-center gap-4 text-gray-500">
                                            <span className="animate-spin h-10 w-10 border-4 border-gray-200 border-t-[#0033a0] rounded-full"></span>
                                            <span className="text-sm font-semibold tracking-wide">Sincronizando base de datos...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : productosFiltrados.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-16 text-gray-500">
                                        {busqueda ? 'No se encontraron productos que coincidan con la búsqueda.' : 'No hay productos registrados en el inventario.'}
                                    </td>
                                </tr>
                            ) : productosFiltrados.map((prod) => (
                                <tr key={prod.id} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-mono font-bold border border-gray-200">
                                            {prod.sku}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center">
                                            <div className="h-14 w-14 flex-shrink-0 bg-white rounded-lg border border-gray-200 p-1 shadow-sm overflow-hidden">
                                                <img className="h-full w-full object-contain" src={prod.imagen} alt={prod.nombre} />
                                            </div>
                                            <div className="ml-5">
                                                <div className="text-sm font-bold text-gray-900 group-hover:text-[#0033a0] transition-colors">{prod.nombre}</div>
                                                <div className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-md">{prod.descripcion || 'Sin descripción'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm font-black text-gray-900">
                                            Q{prod.precio.toFixed(2)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border ${
                          prod.inventario > 5 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              prod.inventario > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                  'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {prod.inventario} uds
                      </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end gap-3 items-center">
                                            <button
                                                onClick={() => handleEditar(prod)}
                                                title="Editar producto"
                                                className="p-2 text-gray-400 hover:text-[#0033a0] hover:bg-blue-100 rounded-lg transition-all cursor-pointer"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>

                                            {rol === 'Administrador' && (
                                                <button
                                                    onClick={() => handleSolicitarEliminar(prod.id)}
                                                    title="Eliminar producto"
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
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