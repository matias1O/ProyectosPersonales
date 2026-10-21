import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Lista de servicios para el menú desplegable
const SERVICIOS_MENU = [
  {
    titulo: "Soft Gel",
    descripcion: "Extensión liviana y flexible con acabado natural.",
    enlace: "#servicios",
  },
  {
    titulo: "Acrílicas Esculpidas",
    descripcion: "Estructura resistente para diseños largos y detallados.",
    enlace: "#servicios",
  },
  {
    titulo: "Esmaltado Permanente",
    descripcion: "Color duradero y brillo impecable por más de 15 días.",
    enlace: "#servicios",
  },
  {
    titulo: "Nail Art / Diseños a Mano",
    descripcion: "Líneas, pedrería, degrade y estilos personalizados.",
    enlace: "#galeria",
  },
];

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Función encargada de sincronizar el estado con localStorage
    const cargarUsuario = () => {
      const sesionGuardada = localStorage.getItem("usuarioActivo");
      if (sesionGuardada) {
        try {
          setUsuario(JSON.parse(sesionGuardada));
        } catch (error) {
          console.error("Error al leer la sesión:", error);
          setUsuario(null);
        }
      } else {
        setUsuario(null);
      }
    };

    // 1. Carga inicial al montar el Navbar
    cargarUsuario();

    // 2. Escuchar el evento cuando se inicia o cierra sesión en otra vista (Login)
    window.addEventListener("cambioSesion", cargarUsuario);

    // 3. Limpieza al desmontar el componente
    return () => {
      window.removeEventListener("cambioSesion", cargarUsuario);
    };
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
    window.dispatchEvent(new Event("cambioSesion")); // Avisa que se cerró sesión
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Nombre */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tight text-pink-600 hover:text-pink-700 transition-colors"
          >
            Nails by Danitza ✨
          </Link>

          {/* Enlaces de Navegación */}
          <nav className="flex items-center gap-6">
            {/* Botón con Dropdown interactivo */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuAbierto(!menuAbierto)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors py-2"
              >
                Servicios
                <span
                  className={`text-xs transition-transform duration-200 ${
                    menuAbierto ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Contenido desplegable */}
              {menuAbierto && (
                <div
                  className="absolute left-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white p-3 shadow-xl border border-pink-100 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 z-50"
                  onMouseLeave={() => setMenuAbierto(false)}
                >
                  <div className="flex flex-col gap-2">
                    {SERVICIOS_MENU.map((item) => (
                      <a
                        key={item.titulo}
                        href={item.enlace}
                        onClick={() => setMenuAbierto(false)}
                        className="p-2.5 rounded-xl hover:bg-pink-50/70 transition-colors block text-left"
                      >
                        <p className="text-sm font-semibold text-gray-800">
                          {item.titulo}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                          {item.descripcion}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/galeria"
              className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
            >
              Galería
            </Link>

            <Link
              to="/contacto"
              className="text-sm font-medium text-gray-700 hover:text-pink-600 transition-colors"
            >
              Contacto
            </Link>

            {/* Botón principal de llamada a la acción */}
            <Link
              to="/reserva"
              className="text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full shadow-sm hover:shadow transition-all"
            >
              Reservar Cita
            </Link>

            {/* SECCIÓN DEL USUARIO / AVATAR */}
            {usuario ? (
              // Menú si hay sesión activa
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-lg ring-2 ring-pink-500 ring-offset-2 ring-offset-base-100 shadow-sm select-none">
                    {usuario.nombre
                      ? usuario.nombre.charAt(0).toUpperCase()
                      : "U"}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-white rounded-2xl z-[1] mt-3 w-52 p-2 shadow-xl border border-pink-100"
                >
                  <li className="px-3 py-2 border-b border-gray-100">
                    <span className="font-bold text-gray-800 text-sm p-0">
                      Hola, {usuario.nombre}
                    </span>
                    <span className="text-[11px] text-pink-500 uppercase font-semibold p-0">
                      Rol: {usuario.rol}
                    </span>
                  </li>
                  {usuario.rol === "admin" && (
                    <li>
                      <Link
                        to="/admin"
                        className="text-gray-700 hover:text-pink-600 mt-1"
                      >
                        Panel de Administración
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={handleCerrarSesion}
                      className="text-error font-medium hover:bg-red-50 mt-1"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              // Acceso al Login si no hay sesión
              <Link to="/login" title="Iniciar Sesión">
                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 border border-gray-200 hover:border-pink-300 hover:text-pink-500 hover:bg-pink-50 transition-all flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
