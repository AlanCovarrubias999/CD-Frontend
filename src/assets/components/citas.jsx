import { useState, useEffect } from "react";
import AddAppointmentModal from "../modals/addAppointment";
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
  const [showAddModal, setShowAddModal] = useState(false);

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
        <button
          onClick={fetchAppointments}
          className="mt-4 bg-white text-[#0dc0e0] font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          🔄 Refrescar citas
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 ml-2 bg-white text-[#0dc0e0] font-bold py-2 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          ➕ Agendar cita
        </button>
      </div>

      {/* Modal para agregar cita */}
      <AddAppointmentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(e) => {
          handleSubmit(e);
          setShowAddModal(false);
        }}
        form={form}
        patients={patients}
        handleChange={handleChange}
        handleSubmit={(e) => {
          handleSubmit(e);
          setShowAddModal(false);
        }}
      />

      {/* Upcoming Appointments Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Próximas citas</h3>
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
                    {appt.status}
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
