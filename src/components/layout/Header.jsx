import { useState } from "react";
import { Link } from "react-router-dom";


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
  // Estado para controlar si el menú desplegable de servicios está abierto
  const [menuAbierto, setMenuAbierto] = useState(false);

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
              {/* Contenido desplegable (Dropdown) */}
              {menuAbierto && (
                <div
                  className="absolute left-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white p-3 shadow-xl border border-pink-100 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150"
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
            <Link
            to={'/login'}>
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <img
                  alt="Tailwind-CSS-Avatar-component"
                  src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                />
              </div>
            </div>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
