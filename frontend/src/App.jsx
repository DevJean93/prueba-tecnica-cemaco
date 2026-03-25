import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {MainLayout} from "./components/layout/MainLayout";
import { Toaster } from 'react-hot-toast';
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import {ProtectedRoute} from "./components/layout/ProtectedRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" reverseOrder={false} />
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/" replace/>}/>
                <Route element={<ProtectedRoute rolesPermitidos={['Administrador', 'Colaborador']}/>}>
                    <Route path="/admin" element={<AdminPanel/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
