import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import { useAuthStore } from '../store/useAuthStore';

 const Login = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Hooks de navegación y estado global
    const navigate = useNavigate();
    const loginAction = useAuthStore((state) => state.login);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {

            const response = await api.post('/Auth/login', { correo, password });
            const { token, rol } = response.data;
            loginAction(token, rol);
            navigate('/admin');

        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Correo o contraseña incorrectos.');
            } else {
                setError('Error al conectar con el servidor.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-[#f5f5f5] px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-[#0033a0]">
                        Iniciar Sesión
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Panel de administración de inventario
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm border-l-4 border-red-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            required
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0033a0] focus:border-transparent transition-all"
                            placeholder="admin@cemaco.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0033a0] focus:border-transparent transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-[#ff6a13] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6a13] transition-colors cursor-pointer ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Validando...' : 'Ingresar al sistema'}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    Credenciales de prueba: <br/>
                    Admin: admin@cemaco.com / Admin123! <br/>
                    Colaborador: colab@cemaco.com / Colab123!
                </div>
            </div>
        </div>
    );
};

 export  default  Login