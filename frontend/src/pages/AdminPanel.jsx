import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';


import { ProductoFormModal } from '../components/admin/ProductoFormModal';
import { InventoryDashboard } from '../components/admin/InventoryDashboard';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';

const AdminPanel = () => {
    // --- ESTADO GLOBAL Y NAVEGACIÓN ---
    const { rol, logout } = useAuthStore();
    const navigate = useNavigate();

    // --- ESTADOS LOCALES ---

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
            console.error("Error al cargar el inventario:", error);
            toast.error('No se pudo cargar el inventario. Verifica tu conexión.');
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
            toast.success('Producto eliminado con éxito de la base de datos');
        } catch (error) {
            console.error("Error al eliminar:", error);
            toast.error('Hubo un error al intentar eliminar el producto.');
        } finally {

            setDeleteLoading(false);
            setIsConfirmOpen(false);
            setIdEliminando(null);
        }
    };

    // --- MANEJADORES DE EVENTOS DE LA INTERFAZ (UI) ---

    const handleLogout = () => {
        logout();
        navigate('/');
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


                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-[#0033a0]">Dashboard de Inventario</h1>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
                            Sesión activa como: <span className="font-bold text-[#ff6a13] font-mono tracking-wider">{rol}</span>
                        </p>
                    </div>
                    <div className="mt-5 sm:mt-0 flex gap-3 w-full sm:w-auto">
                        <button
                            onClick={handleCrear}
                            className="flex-1 sm:flex-none justify-center bg-[#88c044] hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer flex items-center gap-2 text-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            + Nuevo Producto
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex-1 sm:flex-none justify-center bg-gray-800 hover:bg-gray-950 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm cursor-pointer text-sm"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>


                <InventoryDashboard productos={productos} loading={loading} />


                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-10">


                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <h2 className="text-lg font-bold text-gray-800">Listado Maestro de Productos</h2>
                        <p className="text-xs text-gray-400 font-mono hidden sm:block">ID único de base de datos sincronizado con SQL Server</p>
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
                                            <span className="text-sm font-medium">Sincronizando inventario con la base de datos...</span>
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
                                                <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{prod.descripcion || 'Sin descripción disponible'}</div>
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

                                        <button
                                            onClick={() => handleEditar(prod)}
                                            className="text-[#0033a0] hover:text-blue-800 mr-5 cursor-pointer font-semibold"
                                        >
                                            Editar
                                        </button>


                                        {rol === 'Administrador' && (
                                            <button
                                                onClick={() => handleSolicitarEliminar(prod.id)}
                                                className="text-red-600 hover:text-red-900 cursor-pointer font-semibold"
                                            >
                                                Eliminar
                                            </button>
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
                    message={`Estás a punto de eliminar el producto seleccionado de la base de datos central de Cemaco. Esta acción es irreversible y podría afectar reportes históricos. ¿Deseas confirmar la eliminación?`}
                />

            </div>
        </div>
    );
};


export default AdminPanel;