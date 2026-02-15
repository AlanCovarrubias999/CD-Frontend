import { useState, useEffect } from "react";
import { getPatientsRequest } from "../../api/patients";

function Citas() {
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPatientsRequest();
        setPatients(res.data || []);
      } catch (e) {
        console.error("Error cargando pacientes", e);
      }
    };
    fetch();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // aquí se enviaría el formulario al servidor
    console.log("Agendar cita", form);
    setForm({ patientId: "", date: "", time: "", notes: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-linear-to-r from-[#0dc0e0] to-cyan-500 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Agendar Cita 📅</h2>
        <p className="text-cyan-100">Programe una nueva cita con sus pacientes</p>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Nueva cita</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Seleccionar Paciente
            </label>
            <select
              name="patientId"
              value={form.patientId}
              onChange={handleChange}
              required
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
            >
              <option value="">-- Elige un paciente --</option>
              {patients.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

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

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
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
            ✓ Agendar Cita
          </button>
        </form>
      </div>

      {/* Upcoming Appointments Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Citas próximas</h3>
        <div className="space-y-4">
          {[
            {
              patient: "Juan García",
              date: "2026-02-14",
              time: "14:30",
              notes: "Limpieza dental",
            },
            {
              patient: "María López",
              date: "2026-02-15",
              time: "10:00",
              notes: "Consulta inicial",
            },
            {
              patient: "Carlos Pérez",
              date: "2026-02-16",
              time: "15:00",
              notes: "Tratamiento de caries",
            },
          ].map((appt, idx) => (
            <div
              key={idx}
              className="border-l-4 border-[#0dc0e0] bg-linear-to-r from-cyan-50 to-white p-4 rounded-lg hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-gray-800">{appt.patient}</p>
                  <p className="text-sm text-gray-600 mt-1">{appt.notes}</p>
                </div>
                <span className="bg-[#0dc0e0] text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Pendiente
                </span>
              </div>
              <div className="flex gap-6 text-sm text-gray-600">
                <span>📅 {appt.date}</span>
                <span>🕐 {appt.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Citas;
