import { useState } from 'react';
import { Link } from 'react-router-dom';

const FOTOS = [
  { id: 1, categoria: 'soft-gel', titulo: 'Soft Gel Nude Glazed', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800' },
  { id: 2, categoria: 'art', titulo: 'French Abstracto', url: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800' },
  { id: 3, categoria: 'permanente', titulo: 'Rojo Carmesí Clásico', url: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800' },
  { id: 4, categoria: 'art', titulo: 'Líneas Minimalistas & Foil', url: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=800' },
  { id: 5, categoria: 'soft-gel', titulo: 'Almendra Rosa Pastel', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800' },
  { id: 6, categoria: 'permanente', titulo: 'Kapping con Brillo Shimmer', url: 'https://images.unsplash.com/photo-1583001809873-a128495da465?w=800' },
];

function Galeria() {
  const [filtro, setFiltro] = useState('todos');

  const fotosFiltradas = filtro === 'todos' 
    ? FOTOS 
    : FOTOS.filter((item) => item.categoria === filtro);

  return (
    <div className="py-10 px-4 max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-600">
          Galería de Trabajos 📸
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Echa un vistazo a los últimos sets realizados a nuestras clientas.
        </p>
      </div>

      {/* Botones de filtro de categorías */}
      <div className="flex flex-wrap justify-center gap-2">
        {['todos', 'soft-gel', 'art', 'permanente'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`btn btn-sm rounded-full capitalize ${
              filtro === cat ? 'btn-secondary text-white' : 'btn-outline border-pink-200 text-gray-700'
            }`}
          >
            {cat === 'todos' ? 'Todos' : cat === 'art' ? 'Nail Art' : cat}
          </button>
        ))}
      </div>

      {/* Cuadrícula de fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fotosFiltradas.map((foto) => (
          <div
            key={foto.id}
            className="group relative rounded-3xl overflow-hidden shadow-md h-72 border border-pink-100 bg-gray-100"
          >
            <img
              src={foto.url}
              alt={foto.titulo}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
              <h3 className="font-bold text-lg">{foto.titulo}</h3>
              <Link to="/reserva" className="text-pink-300 text-sm font-semibold hover:underline mt-1">
                Quiero este diseño →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeria;
