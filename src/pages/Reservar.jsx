import { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';

// 1. Generador de días leyendo la disponibilidad del panel Admin
function generarDias(cantidadDias = 45) {
  const dias = [];
  const hoy = new Date();

  // Leemos lo que guardó Danitza en el Admin (o valores por defecto si aún no guarda nada)
  const configGuardada = JSON.parse(localStorage.getItem('horarios_danitza') || '{}');

  for (let i = 0; i < cantidadDias; i++) {
    const fecha = new Date();
    fecha.setDate(hoy.getDate() + i);

    const diaSemana = fecha.toLocaleDateString('es-CL', { weekday: 'short' }).replace('.', '');
    const numero = fecha.getDate().toString();
    const mes = fecha.toLocaleDateString('es-CL', { month: 'short' }).replace('.', '');
    const isoFecha = fecha.toISOString().split('T')[0];

    // Si Danitza configuró este día en Admin lo usamos; si no, dejamos las horas base
    const datosDelDia = configGuardada[isoFecha] || {
      trabaja: true,
      horas: ['08:30', '11:30', '14:30', '17:30', '20:30'],
    };

    const disponible = datosDelDia.trabaja && datosDelDia.horas.length > 0;

    dias.push({
      id: isoFecha,
      diaSemana,
      numero,
      mes,
      horarios: datosDelDia.trabaja ? datosDelDia.horas : [],
      disponible,
    });
  }

  return dias;
}

function Reservar() {
  // Generamos los días disponibles
  const listaDias = useMemo(() => generarDias(45), []);

  const carruselDiasRef = useRef(null);

  // Estados de fecha y hora seleccionada
  const [diaSeleccionado, setDiaSeleccionado] = useState(listaDias[0]?.id || '');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');

  // Desplazamiento del carrusel con flechas
  const scrollDias = (direccion) => {
    if (carruselDiasRef.current) {
      const desplazamiento = direccion === 'izq' ? -260 : 260;
      carruselDiasRef.current.scrollBy({ left: desplazamiento, behavior: 'smooth' });
    }
  };

  // Buscamos las horas del día seleccionado
  const diaActivo = listaDias.find((d) => d.id === diaSeleccionado);
  const horasTotales = diaActivo ? diaActivo.horarios : [];

  // FILTRO INTELIGENTE: Si el día elegido es HOY, oculta las horas que ya pasaron
  const horasParaEsteDia = useMemo(() => {
    const ahora = new Date();
    
    // Obtenemos la fecha local de hoy en formato YYYY-MM-DD
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    const hoyLocal = `${anio}-${mes}-${dia}`;

    // Si es un día futuro (mañana en adelante), mostramos todas sus horas normalmente
    if (diaSeleccionado !== hoyLocal) {
      return horasTotales;
    }

    // Si es hoy, comparamos contra la hora y minutos actuales
    const horaActual = ahora.getHours();
    const minutosActuales = ahora.getMinutes();

    return horasTotales.filter((horaStr) => {
      const [h, m] = horaStr.split(':').map(Number);
      if (h > horaActual) return true;
      if (h === horaActual && m > minutosActuales) return true;
      return false;
    });
  }, [diaSeleccionado, horasTotales]);

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      
      {/* 1. Título principal */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
        Seleccionar fecha y hora
      </h1>

      {/* 2. Profesional */}
      <div className="flex items-center justify-between mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm text-sm font-medium text-gray-700">
          <span className="text-gray-400">👤</span>
          <span>Danitza</span>
          <span className="text-xs text-gray-400">▼</span>
        </div>

        {/* Botón calendario nativo */}
        <div className="relative">
          <input
            type="date"
            id="datePickerOculto"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            onChange={(e) => {
              if (e.target.value) {
                setDiaSeleccionado(e.target.value);
                setHoraSeleccionada('');
              }
            }}
          />
          <button
            type="button"
            className="w-10 h-10 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors shadow-sm"
          >
            📅
          </button>
        </div>
      </div>

      {/* 3. Carrusel horizontal de días */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Selecciona una fecha
          </h2>
          <div className="flex items-center gap-2 text-gray-500 font-semibold">
            <button
              type="button"
              onClick={() => scrollDias('izq')}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollDias('der')}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-pink-50 hover:text-pink-600 transition-colors cursor-pointer"
            >
              ›
            </button>
          </div>
        </div>

        <div
          ref={carruselDiasRef}
          className="flex gap-2.5 overflow-x-auto pb-2 scroll-smooth select-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {listaDias.map((dia) => {
            const estaSeleccionado = diaSeleccionado === dia.id;

            return (
              <button
                key={dia.id}
                type="button"
                disabled={!dia.disponible}
                onClick={() => {
                  setDiaSeleccionado(dia.id);
                  setHoraSeleccionada('');
                }}
                className={`flex flex-col items-center justify-center min-w-[70px] h-[95px] rounded-2xl border transition-all cursor-pointer shrink-0 ${
                  estaSeleccionado
                    ? 'bg-pink-600 text-white border-pink-600 shadow-md scale-102'
                    : !dia.disponible
                    ? 'border-gray-200 text-gray-300 bg-white cursor-not-allowed opacity-50'
                    : 'border-gray-200 text-gray-800 bg-white hover:border-pink-300'
                }`}
              >
                <span className={`text-xs font-medium lowercase ${estaSeleccionado ? 'text-pink-100' : 'text-gray-400'}`}>
                  {dia.diaSemana}
                </span>
                <span className="text-2xl font-bold my-0.5">
                  {dia.numero}
                </span>
                <span className={`text-[11px] lowercase ${estaSeleccionado ? 'text-pink-100' : 'text-gray-400'}`}>
                  {dia.mes}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Bloques de hora */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Escoge una hora
        </h2>

        {horasParaEsteDia.length === 0 ? (
          <p className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-2xl border border-gray-100">
            No hay horarios disponibles para este día.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {horasParaEsteDia.map((hora) => {
              const horaActiva = horaSeleccionada === hora;

              return (
                <button
                  key={hora}
                  type="button"
                  onClick={() => setHoraSeleccionada(hora)}
                  className={`w-full py-4 px-6 rounded-2xl border text-left font-semibold text-base transition-all cursor-pointer ${
                    horaActiva
                      ? 'border-pink-600 bg-pink-50 text-pink-700 shadow-sm ring-1 ring-pink-600'
                      : 'border-gray-200 bg-white text-gray-800 hover:border-pink-300 hover:bg-pink-50/20'
                  }`}
                >
                  {hora}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Resumen de cita seleccionada */}
      {diaSeleccionado && horaSeleccionada && (
        <div className="p-4 bg-pink-50 rounded-2xl border border-pink-200 flex items-center justify-between">
          <div>
            <p className="text-xs text-pink-600 font-bold uppercase tracking-wider">Cita seleccionada</p>
            <p className="text-base font-bold text-gray-900">
              Fecha: {diaSeleccionado} a las {horaSeleccionada} hrs
            </p>
          </div>
          <button className="btn btn-secondary rounded-xl text-white">
            Continuar
          </button>
        </div>
      )}

      {/* 5. Pie de página */}
      <p className="text-sm text-gray-700 mt-6">
        ¿Ninguna cita te viene bien?{' '}
        <Link to="/contacto" className="text-pink-600 font-semibold hover:underline">
          Únete a la lista de espera
        </Link>
      </p>

    </div>
  );
}

export default Reservar;
