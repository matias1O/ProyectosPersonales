function creacionUsuario() {
  return (
    <div className="min-h-screen bg-pink-50/20 py-16 px-4 flex items-center justify-center">
  {/* 1. Contenedor del Aura con resplandor */}
  <div className="aura aura-glow text-pink-400 rounded-3xl w-full max-w-md shadow-2xl">
    
    {/* 2. Tu tarjeta dentro del aura */}
    <div className="card bg-white text-gray-800 w-full rounded-3xl pt-16 pb-10 px-8 border border-pink-200 relative">
      
      {/* Círculo superior con icono */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 w-18 h-18 rounded-full bg-pink-500 border-4 border-white flex items-center justify-center shadow-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="currentColor"
          className="w-8 h-8 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.765Z"
          />
        </svg>
      </div>

      {/* Título y subtítulo */}
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Nails by Danitza
        </h2>
        <p className="text-xs text-pink-600 font-medium tracking-wide uppercase mt-0.5">
          Crea tu cuenta de cliente
        </p>
      </div>

      {/* Formulario */}
      <form className="flex flex-col gap-4">
        {/* Nombre y Apellido */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Camila"
              className="input input-sm w-full h-11 rounded-full bg-gray-50 border-gray-200 focus:bg-white text-sm"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">
              Apellido
            </label>
            <input
              type="text"
              placeholder="Silva"
              className="input input-sm w-full h-11 rounded-full bg-gray-50 border-gray-200 focus:bg-white  text-sm"
              required
            />
          </div>
        </div>

        {/* Teléfono con prefijo +56 */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Número de teléfono (WhatsApp)
          </label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center bg-gray-100 border border-gray-200 text-gray-700 font-semibold text-sm px-4 rounded-full select-none">
              +56
            </div>
            <input
              type="tel"
              placeholder="9 1234 5678"
              maxLength="9"
              className="input flex-1 h-11 rounded-full bg-gray-50 border-gray-200 focus:bg-white  text-sm"
              required
            />
          </div>
        </div>

        {/* Correo */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="nombre@ejemplo.com"
            className="input w-full h-11 rounded-full bg-gray-50 border-gray-200 focus:bg-white  text-sm"
            required
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Mínimo 8 caracteres"
            className="input w-full h-11 rounded-full bg-gray-50 border-gray-200 focus:bg-white  text-sm"
            required
          />
        </div>

        {/* Confirmar Contraseña */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1 block">
            Confirmar contraseña
          </label>
          <input
            type="password"
            placeholder="Repite tu contraseña"
            className="input w-full h-11 rounded-full bg-gray-50 border-gray-200 focus:bg-white  text-sm"
            required
          />
        </div>

        {/* Botón */}
        <button
          type="submit"
          className="btn bg-pink-500 hover:bg-pink-600 border-none text-white rounded-full h-11 font-semibold text-sm shadow-md shadow-pink-300/40 w-full mt-2"
        >
          Crear usuario
        </button>
      </form>

      {/* Enlace inferior */}
      <div className="text-center text-xs text-gray-500 mt-5">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="text-pink-600 font-semibold hover:underline">
          Inicia sesión aquí
        </a>
      </div>
    </div>
  </div>
</div>

  );
}
export default creacionUsuario;
