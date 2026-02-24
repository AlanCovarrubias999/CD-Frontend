import { useState, useEffect } from "react";
import { getPatientsRequest } from "../../api/patients";
import { 
  createAppointmentRequest, 
  deleteAppointmentRequest, 
  getAppointmentsRequest, 
  updateAppointmentRequest 
} from "../../api/appointments";

function Citas() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({
    patient: "",
    date: "",
    time: "",
    notes: "",
  });

  const fetchAppointments = async () => {
      try {
        const res = await getAppointmentsRequest();
        let data = res.data;
        if (!Array.isArray(data)) {
          if (data && data.appointments && Array.isArray(data.appointments)) {
            data = data.appointments;
          } else {
            data = [];
          }
        }
        setAppointments(data);
      } catch (e) {
        console.error("Error cargando citas", e);
        setAppointments([]);
      }
    };
    const fetchPatients = async () => {
      try {
        const res = await getPatientsRequest();
        let data = res.data;
        if (!Array.isArray(data)) {
          if (data && data.patients && Array.isArray(data.patients)) {
            data = data.patients;
          } else {
            data = [];
          }
        }
        setPatients(data);
      } catch (e) {
        console.error("Error cargando pacientes", e);
        setPatients([]);
      }
    };

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);
  const createAppointment = async (appointment) => {
      try {
        await createAppointmentRequest(appointment);
        fetchAppointments();
      } catch (e) {
        console.error("Error creando cita", e);
      }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAppointment(form);
    console.log("Agendar cita", form);
    setForm({ patient: "", date: "", time: "", notes: "" });
    fetchAppointments();
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
          {appointments.length === 0 ? (
            <p className="text-gray-500">No hay citas registradas.</p>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt._id}
                className="border-l-4 border-[#0dc0e0] bg-linear-to-r from-cyan-50 to-white p-4 rounded-lg hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-gray-800">{appt.patient?.name || appt.patient || "Paciente"}</p>
                    <p className="text-sm text-gray-600 mt-1">{appt.notes}</p>
                  </div>
                  <span className="bg-[#0dc0e0] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {appt.status || "Pendiente"}
                  </span>
                </div>
                <div className="flex gap-6 text-sm text-gray-600">
                  <span>📅 {new Date(appt.date).toLocaleDateString()}</span>
                  <span>🕐 {appt.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Citas;
