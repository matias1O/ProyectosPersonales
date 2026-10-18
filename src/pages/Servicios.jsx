import { Link } from 'react-router-dom';

const LISTA_SERVICIOS = [
  {
    id: 1,
    nombre: 'Soft Gel Completo',
    precio: '$24.000',
    duracion: '2h aprox',
    descripcion: 'Tips de gel completo adheridos con base gel. Livianas, flexibles y no dañan tu uña.',
    incluye: ['Manicura rusa previa', 'Esmaltado en 1 o 2 tonos', 'Aceite de cutículas e hidratación'],
  },
  {
    id: 2,
    nombre: 'Acrílicas Esculpidas',
    precio: '$30.000',
    duracion: '2h 30m aprox',
    descripcion: 'Estructura sólida construida con molde para máxima longitud y resistencia.',
    incluye: ['Limpieza profunda de cutículas', 'Largo personalizado', 'Esmaltado permanente incluido'],
  },
  {
    id: 3,
    nombre: 'Esmaltado Permanente',
    precio: '$18.000',
    duracion: '1h 15m aprox',
    descripcion: 'Color parejo, resistente y con brillo espejo de larga duración sobre uña natural.',
    incluye: ['Limado de uña y cutículas', 'Capa base protectora', 'Color a elección y top coat'],
  },
  {
    id: 4,
    nombre: 'Kapping Gel',
    precio: '$20.000',
    duracion: '1h 30m aprox',
    descripcion: 'Capa fina de gel sobre uña natural para darle fuerza e impedir que se quiebre.',
    incluye: ['Manicura combinada', 'Nivelación con gel', 'Esmaltado permanente incluido'],
  },
  {
    id: 5,
    nombre: 'Retiro de Set',
    precio: '$6.000',
    duracion: '30m aprox',
    descripcion: 'Retiro seguro sin limar en exceso la lámina natural, con fresas profesionales.',
    incluye: ['Retiro de producto', 'Pulido suave', 'Tratamiento fortalecedor'],
  },
  {
    id: 6,
    nombre: 'Nail Art / Diseños Extras',
    precio: 'Desde $2.000',
    duracion: 'Variable',
    descripcion: 'Diseño a mano alzada, francesas modernas, pedrería, foil o degrade.',
    incluye: ['Valor según complejidad', 'Asesoría de estilo y combinación de colores'],
  },
];

function Servicios() {
  return (
    <div className="py-10 px-4 max-w-5xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-600">
          Servicios y Tarifas 📋
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Conoce cada servicio en detalle y reserva el que más se adapte a tu estilo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LISTA_SERVICIOS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-800 leading-snug">{item.nombre}</h2>
                <span className="text-pink-600 font-extrabold text-lg shrink-0 ml-2">{item.precio}</span>
              </div>
              <span className="badge badge-sm badge-ghost text-gray-500 mb-3">⏱ {item.duracion}</span>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{item.descripcion}</p>
              
              <ul className="space-y-1.5 border-t border-gray-100 pt-3 mb-6">
                {item.incluye.map((inc, idx) => (
                  <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                    <span className="text-pink-500">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/reserva"
              className="btn btn-outline btn-secondary w-full rounded-2xl hover:text-white"
            >
              Agendar este servicio
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servicios;
