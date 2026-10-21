import {createBrowserRouter} from 'react-router-dom';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Galeria from './pages/Galeria';
import Contacto from './pages/Contacto';
import Reserva from './pages/Reservar';
import Layout from './components/layout/Layout';
import Admin from './pages/Admin';
import Usuario from './pages/Usuario';
import Login from './pages/Login';
import CreacionUsuario from './pages/CreacionUsuario';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {index: true,
                element: <Inicio />
            },
            {
                path: 'servicios',
                element: <Servicios />,
            },
            {
                path: 'galeria',
                element: <Galeria />,
            },
            {
                path: 'contacto',
                element: <Contacto />,
            },
            {
                path: 'reserva',
                element: <Reserva />
            },
            {
                path: 'admin',
                element: <Admin />,
            },
            {
                path: 'usuario',
                element: <Usuario />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'creacionUsuario',
                element: <CreacionUsuario />,
            },
        ],
    },
]);