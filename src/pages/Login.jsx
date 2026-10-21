import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const navigate = useNavigate();

  // 1. Si ya hay una sesión guardada, no vuelve a pedir login
  useEffect(() => {
    const sesionGuardada = localStorage.getItem("usuarioActivo");
    if (sesionGuardada) {
      try {
        const usuario = JSON.parse(sesionGuardada);
        if (usuario.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error al leer sesión previa:", error);
      }
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Patrón de seguridad para contraseña
    const contraseñaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,_-]).{8,}$/;

    if (!contraseñaRegex.test(contraseña)) {
      alert(
        "La contraseña no es válida.\nDebe tener al menos 8 caracteres, incluir una mayúscula, un número y un símbolo especial (ej: !@#$)."
      );
      return;
    }

    // Cuentas de prueba
    const adminValido = {
      email: "admin",
      clave: "Danitza.2026",
      nombre: "Danitza",
      rol: "admin",
    };

    const clienteValido = {
      email: "cliente@gmail.com",
      clave: "Clave2026!",
      nombre: "Carla",
      rol: "cliente",
    };

    // Validación de credenciales y notificación al Navbar
    if (correo === adminValido.email && contraseña === adminValido.clave) {
      localStorage.setItem("usuarioActivo", JSON.stringify(adminValido));
      window.dispatchEvent(new Event("cambioSesion")); // Notifica al Navbar
      alert(`¡Bienvenida ${adminValido.nombre}!`);
      navigate("/admin");
    } else if (correo === clienteValido.email && contraseña === clienteValido.clave) {
      localStorage.setItem("usuarioActivo", JSON.stringify(clienteValido));
      window.dispatchEvent(new Event("cambioSesion")); // Notifica al Navbar
      alert(`Hola ${clienteValido.nombre}, sesión iniciada`);
      navigate("/");
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="aura aura-glow text-pink-400 rounded-3xl w-full max-w-md mx-auto">
        <div className="card bg-base-100 text-gray-800 w-full shadow-sm rounded-3xl pt-14 p-8 border border-pink-300 relative">
          {/* Círculo superior con icono */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-pink-500 border-4 border-base-100 flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-10 h-10 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-center text-black mb-6">
            Bienvenido
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            {/* Campo Correo */}
            <div>
              <label className="label text-sm font-medium text-gray-700" htmlFor="txtCorreo">
                Correo
              </label>
              <input
                type="text"
                id="txtCorreo"
                className="input w-full rounded-full bg-gray-50 border border-gray-200  "
                placeholder="Introduce tu correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div>
              <label className="label text-sm font-medium text-gray-700" htmlFor="txtcontraseña">
                Contraseña
              </label>
              <input
                type="password"
                id="txtcontraseña"
                className="input w-full rounded-full bg-gray-50 border border-gray-200 "
                placeholder="Introduce tu contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>

            {/* Botón Ingresar */}
            <div className="card-actions justify-center my-4">
              <button
                type="submit"
                className="btn bg-pink-500 border-none text-white hover:bg-pink-600 rounded-full px-8 shadow-md"
              >
                Ingresar
              </button>
            </div>
          </form>

          {/* Enlaces inferiores */}
          <div className="flex justify-between items-center text-xs text-gray-400 mt-4 px-1">
            <Link
              to="/recuperar"
              className="hover:text-pink-600 hover:underline transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Link
              to="/creacionUsuario"
              className="hover:text-pink-600 hover:underline transition-colors"
            >
              Crear usuario
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  
}

export default Login;
