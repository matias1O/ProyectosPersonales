import { useRef, useState,  } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    tag: 'Más pedido',
    titulo: 'Extensiones en Soft Gel',
    descripcion: 'Luce uñas largas, naturales y resistentes sin maltratar tu uña natural.',
    imagen: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&auto=format&fit=crop&q=80',
    botonTexto: 'Agendar Cita',
    botonRuta: '/reserva',
  },
  {
    id: 2,
    tag: 'Tendencia',
    titulo: 'Nail Art & Diseños a Mano',
    descripcion: 'Trae tu diseño o idea de Pinterest e Instagram y lo recreamos con máximo detalle.',
    imagen: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=1200&auto=format&fit=crop&q=80',
    botonTexto: 'Ver Galería',
    botonRuta: '/galeria',
  },
  {
    id: 3,
    tag: 'Calidad',
    titulo: 'Catálogo de Servicios',
    descripcion: 'Esmaltado permanente, kapping, acrílicas y retiro con productos de primera calidad.',
    imagen: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=1200&auto=format&fit=crop&q=80',
    botonTexto: 'Ver Lista de Precios',
    botonRuta: '/servicios',
  },
];

function Inicio() {
  const carruselRef = useRef(null);
  const [slideActivo, setSlideActivo] = useState(0);

  // Mueve el carrusel horizontalmente de forma suave sin alterar el scroll de la página
  const irASlide = (indice) => {
    if (carruselRef.current) {
      const anchoSlide = carruselRef.current.clientWidth;
      carruselRef.current.scrollTo({
        left: anchoSlide * indice,
        behavior: 'smooth',
      });
      setSlideActivo(indice);
    }
  };

  const anterior = () => {
    const nuevoIndice = slideActivo === 0 ? SLIDES.length - 1 : slideActivo - 1;
    irASlide(nuevoIndice);
  };

  const siguiente = () => {
    const nuevoIndice = slideActivo === SLIDES.length - 1 ? 0 : slideActivo + 1;
    irASlide(nuevoIndice);
  };

  // Detecta si el usuario arrastra con el dedo o trackpad para actualizar los puntitos
  const handleScroll = () => {
    if (carruselRef.current) {
      const { scrollLeft, clientWidth } = carruselRef.current;
      const indice = Math.round(scrollLeft / clientWidth);
      if (indice !== slideActivo) {
        setSlideActivo(indice);
      }
    }
  };

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto space-y-12">
      {/* Bienvenida */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 tracking-tight">
          Nails by Danitza ✨
        </h1>
        <p className="text-gray-600 mt-3 text-base sm:text-lg max-w-xl mx-auto">
          Diseños exclusivos, cuidado profesional y un acabado impecable para tus uñas.
        </p>
      </div>

      {/* Contenedor del Carrusel con Slide Horizontal Real */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-pink-100 group">
        
        {/* Tira deslizable con CSS Snap nativo */}
        <div
          ref={carruselRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SLIDES.map((item) => (
            <div
              key={item.id}
              className="min-w-full h-[440px] relative snap-center shrink-0"
            >
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
                <span className="badge badge-secondary mb-2 w-fit">{item.tag}</span>
                <h2 className="text-3xl font-bold">{item.titulo}</h2>
                <p className="text-gray-200 mt-2 max-w-md text-sm sm:text-base">
                  {item.descripcion}
                </p>
                <div className="mt-4">
                  <Link
                    to={item.botonRuta}
                    className="btn btn-secondary rounded-full px-6 text-white shadow-md"
                  >
                    {item.botonTexto}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flechas de navegación (No usan <a href="#id">, por lo que no bajan la página) */}
        <div className="absolute left-4 right-4 top-1/2 flex -translate-y-1/2 justify-between pointer-events-none">
          <button
            type="button"
            onClick={anterior}
            className="btn btn-circle btn-sm sm:btn-md bg-white/70 hover:bg-white border-none text-gray-800 pointer-events-auto shadow-md cursor-pointer transition-transform active:scale-95"
            aria-label="Slide anterior"
          >
            ❮
          </button>
          <button
            type="button"
            onClick={siguiente}
            className="btn btn-circle btn-sm sm:btn-md bg-white/70 hover:bg-white border-none text-gray-800 pointer-events-auto shadow-md cursor-pointer transition-transform active:scale-95"
            aria-label="Siguiente slide"
          >
            ❯
          </button>
        </div>

        {/* Indicadores inferiores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => irASlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                slideActivo === idx ? 'bg-pink-500 w-6' : 'bg-white/60 w-2.5 hover:bg-white'
              }`}
              aria-label={`Ir a la diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Tarjetas informativas inferiores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center">
          <div className="text-3xl mb-2">💅</div>
          <h3 className="font-bold text-gray-800">Materiales Premium</h3>
          <p className="text-sm text-gray-500 mt-1">Cuidado de uña natural y máxima duración.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center">
          <div className="text-3xl mb-2">🗓️</div>
          <h3 className="font-bold text-gray-800">Reserva Fácil</h3>
          <p className="text-sm text-gray-500 mt-1">Agenda en línea tu día y hora disponible.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm text-center">
          <div className="text-3xl mb-2">📍</div>
          <h3 className="font-bold text-gray-800">Atención Personalizada</h3>
          <p className="text-sm text-gray-500 mt-1">Ambiente cómodo, higiénico y dedicado.</p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;

