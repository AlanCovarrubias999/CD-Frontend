import React, { useRef } from "react";

export default function AddAppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  form,
  patients,
  handleChange,
  handleSubmit,
  isEditing = false,
}) {
  const overlayRef = useRef(null);

  if (!isOpen) return null;

  // Cerrar modal al hacer clic fuera
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 min-h-screen z-50 flex items-center justify-center bg-gray-900/70"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Cerrar"
        >
          ✖️
        </button>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{isEditing ? 'Editar cita' : 'Nueva cita'}</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sección para elegir paciente */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seleccionar Paciente
            </label>
            <select
              name="patient"
              value={form.patient}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
            >
              <option value="">-- Elige un paciente --</option>
              {patients.map((p) => (
                <option key={p._id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sección para elegir fecha y hora de la cita*/}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fecha de la cita
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hora de la cita
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
          </div>

          {/* Sección para elegir el estatus de la cita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Estatus de la cita
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
            >
              <option value="Pendiente">Pendiente</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
          </div>

          {/* Sección para detalles de la cita */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Notas adicionales (opcional)
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Escriba cualquier nota importante sobre la cita..."
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition resize-none"
              rows={4}
            />
          </div>

          

          <button
            type="submit"
            className="w-full bg-[#0dc0e0] hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            {isEditing ? '✓ Actualizar Cita' : '✓ Agendar Cita'}
          </button>
        </form>
      </div>
    </div>
  );
}