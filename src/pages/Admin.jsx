import { useState } from 'react';

// 1. Las horas base que tú definiste para las citas
const HORAS_OPCIONES = ['08:30', '11:30', '14:30', '17:30', '20:30'];

// 2. Función para generar los próximos días a configurar (por ejemplo, 30 días)
function generarDiasAdmin(cantidadDias = 30) {
  const dias = [];
  const hoy = new Date();

  for (let i = 0; i < cantidadDias; i++) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + i);

    const isoFecha = fecha.toISOString().split('T')[0]; // "2026-10-17"
    const diaSemana = fecha.toLocaleDateString('es-CL', { weekday: 'long' }); // "sábado"
    const numero = fecha.getDate();
    const mes = fecha.toLocaleDateString('es-CL', { month: 'short' }).replace('.', '');

    dias.push({
      id: isoFecha,
      etiqueta: `${diaSemana} ${numero} de ${mes}`,
    });
  }

  return dias;
}

function Admin() {
  const diasLista = generarDiasAdmin(30);

  // 3. Estado principal: leemos lo guardado en localStorage o iniciamos vacío {}
  const [configuracion, setConfiguracion] = useState(() => {
    const dataGuardada = localStorage.getItem('horarios_danitza');
    return dataGuardada ? JSON.parse(dataGuardada) : {};
  });

  const [guardadoExitoso, setGuardadoExitoso] = useState(false);

  // 4. Función para saber qué tiene configurado un día (si no existe, valores por defecto)
  const obtenerDatosDia = (idFecha) => {
    return configuracion[idFecha] || {
      trabaja: true,
      horas: [...HORAS_OPCIONES], // por defecto todas las horas abiertas
    };
  };

  // 5. Función para encender o apagar el día completo (Trabaja / Libre)
  const alternarDiaTrabajo = (idFecha) => {
    const actual = obtenerDatosDia(idFecha);
    setConfiguracion((prev) => ({
      ...prev,
      [idFecha]: {
        ...actual,
        trabaja: !actual.trabaja,
      },
    }));
  };

  // 6. Función para activar o quitar una hora puntual de ese día
  const alternarHora = (idFecha, hora) => {
    const actual = obtenerDatosDia(idFecha);
    const yaExiste = actual.horas.includes(hora);

    // Si ya estaba, la quitamos; si no estaba, la agregamos
    const nuevasHoras = yaExiste
      ? actual.horas.filter((h) => h !== hora)
      : [...actual.horas, hora].sort();

    setConfiguracion((prev) => ({
      ...prev,
      [idFecha]: {
        trabaja: true, // Si marca una hora, aseguramos que el día quede como laborable
        horas: nuevasHoras,
      },
    }));
  };

  // 7. Guardar todo en localStorage
  const guardarEnNavegador = () => {
    localStorage.setItem('horarios_danitza', JSON.stringify(configuracion));
    setGuardadoExitoso(true);
    setTimeout(() => setGuardadoExitoso(false), 3000);
  };

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto space-y-8">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-pink-100 gap-4">
        <div>
          <span className="badge badge-secondary mb-2">Panel Privado</span>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Administrar Disponibilidad 💅
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Elige qué días trabajas y qué horas exactas dejas disponibles para tus clientas.
          </p>
        </div>

        <button
          onClick={guardarEnNavegador}
          className="btn btn-secondary text-white rounded-2xl px-6 shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          Guardar Cambios
        </button>
      </div>

      {/* Notificación de guardado */}
      {guardadoExitoso && (
        <div className="alert alert-success rounded-2xl text-white font-medium shadow-md">
          <span>✓ ¡Horarios actualizados! Las clientas ya verán estos cambios en Reservar.</span>
        </div>
      )}

      {/* Lista de días */}
      <div className="space-y-4">
        {diasLista.map((dia) => {
          const datos = obtenerDatosDia(dia.id);
          const { trabaja, horas } = datos;

          return (
            <div
              key={dia.id}
              className={`p-6 rounded-3xl border transition-all ${
                trabaja
                  ? 'bg-white border-pink-100 shadow-sm'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              {/* Encabezado del día: Nombre + Switch */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-gray-900 capitalize text-lg">
                    {dia.etiqueta}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {trabaja ? `${horas.length} horas activas` : 'Día marcado como libre'}
                  </p>
                </div>

                {/* Botón para cambiar entre Trabajar o Día Libre */}
                <button
                  type="button"
                  onClick={() => alternarDiaTrabajo(dia.id)}
                  className={`btn btn-sm rounded-xl font-semibold cursor-pointer ${
                    trabaja
                      ? 'btn-outline border-pink-300 text-pink-600 hover:bg-pink-50'
                      : 'btn-neutral text-white'
                  }`}
                >
                  {trabaja ? 'Marcar como Libre' : 'Habilitar Día'}
                </button>
              </div>

              {/* Botones de horas (solo se muestran si el día está activo) */}
              {trabaja && (
                <div className="pt-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Toca las horas para habilitarlas o apagarlas:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {HORAS_OPCIONES.map((hora) => {
                      const estaActiva = horas.includes(hora);

                      return (
                        <button
                          key={hora}
                          type="button"
                          onClick={() => alternarHora(dia.id, hora)}
                          className={`btn btn-sm rounded-xl font-medium transition-all cursor-pointer ${
                            estaActiva
                              ? 'btn-secondary text-white shadow-sm'
                              : 'btn-outline border-gray-200 text-gray-400 hover:bg-pink-50'
                          }`}
                        >
                          {hora} {estaActiva ? '✓' : ''}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Botón de guardado inferior */}
      <div className="pt-4 text-center">
        <button
          onClick={guardarEnNavegador}
          className="btn btn-secondary w-full sm:w-auto px-10 text-white rounded-2xl shadow-md cursor-pointer"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}

export default Admin;
