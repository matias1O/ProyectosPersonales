import { useState } from 'react';

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const enviarWhatsApp = (e) => {
    e.preventDefault();
    if (!mensaje.trim()) return;

    // Puedes colocar el número de WhatsApp aquí
    const numero = '56912345678';
    const texto = encodeURIComponent(`Hola Danitza, soy ${nombre || 'una clienta'}. Consulta: ${mensaje}`);
    window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
  };

  return (
    <div className="py-10 px-4 max-w-4xl mx-auto space-y-10">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-600">
          Contacto y Ubicación 💬
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          ¿Tienes dudas sobre algún diseño o horario? Escríbenos directamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Información y Redes */}
        <div className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Nails by Danitza</h2>
          
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-semibold text-gray-800">Ubicación</p>
                <p>Estudio de atención en Santiago, Chile (dirección exacta confirmada al reservar).</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">⏰</span>
              <div>
                <p className="font-semibold text-gray-800">Horarios de atención</p>
                <p>Lunes a Domingo con cita previa confirmada.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">📸</span>
              <div>
                <p className="font-semibold text-gray-800">Instagram</p>
                <p className="text-pink-600 font-medium">Ayudame a crearlo!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario rápido a WhatsApp */}
        <form onSubmit={enviarWhatsApp} className="bg-white p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Escríbenos por WhatsApp</h2>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tu nombre</label>
              <input
                type="text"
                placeholder="Ej: Camila"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mensaje o consulta</label>
              <textarea
                placeholder="Hola, me gustaría saber si tienes disponibilidad para..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                rows={4}
                className="textarea textarea-bordered w-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-secondary w-full rounded-2xl text-white shadow-md hover:shadow-lg mt-6"
          >
            Enviar a WhatsApp 📲
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contacto;
