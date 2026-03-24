import { useState, useEffect } from "react";
import AddAppointmentModal from "../modals/addAppointment";
import { getPatientsRequest } from "../../api/patients";
import {
  createAppointmentRequest,
  deleteAppointmentRequest,
  getAppointmentsRequest,
  updateAppointmentRequest,
} from "../../api/appointments";

function Citas() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [form, setForm] = useState({
    patient: "",
    date: "",
    time: "",
    notes: "",
    status: "Pendiente",
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (e) {
      console.error("Error cargando citas", e);
      setAppointments([]);
      setLoading(false);
    }
  };
  const fetchPatients = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (e) {
      console.error("Error cargando pacientes", e);
      setPatients([]);
      setLoading(false);
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

  const updateAppointment = async (appointmentId, appointment) => {
    try {
      await updateAppointmentRequest(appointmentId, appointment);
      fetchAppointments();
    } catch (e) {
      console.error("Error actualizando cita", e);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointmentRequest(appointmentId);
      fetchAppointments();
    } catch (e) {
      console.error("Error eliminando cita", e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAppointmentId) {
      updateAppointment(editingAppointmentId, form);
    } else {
      createAppointment(form);
    }
    setForm({ patient: "", date: "", time: "", notes: "", status: "Pendiente" });
    setEditingAppointmentId(null);
    setShowAddModal(false);
    fetchAppointments();
  };
  
  const statusStyles = {
    Pendiente: "bg-orange-400 text-white border border-orange-200", // Naranja
    Cancelada: "bg-red-400 text-white border border-red-200", // Rojo
    Completada: "bg-green-400 text-white border border-green-200", // Verde
    default: "bg-gray-400 text-white border border-gray-200", // Gris por si acaso
  };
  const statusColors = (status) => {
    switch (status) {
      case "Pendiente":
        return "orange";
      case "Cancelada":
        return "red";
      case "Completada":
        return "green";
      default:
        return "gray";
    }
  };

  const getAppointmentStyle = (status) => {
    switch (status) {
      case "Pendiente":
        return "border-l-4 border-orange-400 bg-orange-100 p-4 rounded-lg hover:shadow-md transition";
      case "Cancelada":
        return "border-l-4 border-red-400 bg-red-100 p-4 rounded-lg hover:shadow-md transition";
      case "Completada":
        return "border-l-4 border-green-400 bg-green-100 p-4 rounded-lg hover:shadow-md transition";
      default:
        return "border-l-4 border-gray-400 bg-gray-100 p-4 rounded-lg hover:shadow-md transition";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-linear-to-r from-[#0dc0e0] to-cyan-500 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Agendar Cita 📅</h2>
        <p className="text-cyan-100">
          Programe una nueva cita con sus pacientes
        </p>
        <button
          onClick={fetchAppointments}
          className="mt-4 bg-white text-[#0dc0e0] font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-400 hover:text-white transition duration-200"
        >
          🔄 Refrescar citas
        </button>
        <button
          onClick={() => {
            setForm({ patient: "", date: "", time: "", notes: "", status: "Pendiente" });
            setEditingAppointmentId(null);
            setShowAddModal(true);
          }}
          className="mt-4 ml-2 bg-white text-[#0dc0e0] font-bold py-2 px-4 rounded-lg  shadow-md hover:bg-blue-400 hover:text-white transition duration-200"
        >
          ➕ Agendar cita
        </button>
      </div>

      {/* Modal para agregar cita */}
      <AddAppointmentModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setForm({ patient: "", date: "", time: "", notes: "", status: "Pendiente" });
          setEditingAppointmentId(null);
        }}
        onSubmit={(e) => {
          handleSubmit(e);
          setShowAddModal(false);
        }}
        form={form}
        patients={patients}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEditing={!!editingAppointmentId}
      />

      {/* Upcoming Appointments Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Citas médicas
        </h3>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="spinner border-4 border-gray-200 border-t-[#0dc0e0] rounded-full w-8 h-8 animate-spin"></div>
              <span className="ml-3 text-gray-600 text-lg font-bold">Cargando citas...</span>
            </div>
          ) : appointments.length === 0 ? (
            <p className="text-gray-500">No hay citas registradas.</p>
          ) : (
            appointments.map((appt) => (
              <div
                key={appt._id}
                className={getAppointmentStyle(appt.status)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-bold text-gray-800">
                      {appt.patient?.name || appt.patient || "Paciente"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{appt.notes}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyles[appt.status]}`}>
                    {appt.status === 'Pendiente' ? 'Pendiente' : 
                    appt.status === 'Cancelada' ? 'Cancelada' : 
                    appt.status === 'Completada' ? 'Completada' : appt.status}
                  </span>
                  
                </div>
                <div className="flex gap-3 text-sm text-gray-600">
                  <span>📅 {new Date(appt.date).toLocaleDateString()}</span>
                  <span>🕐 {appt.time}</span>
                </div>
                <div className="flex gap-2 justify-between">
                  <button
                    onClick={() => {
                      setForm({
                        patient: appt.patient?.name || appt.patient || "",
                        date: appt.date ? appt.date.split('T')[0] : "",
                        time: appt.time,
                        notes: appt.notes,
                        status: appt.status,
                      });
                      setEditingAppointmentId(appt._id);
                      setShowAddModal(true);
                    }}
                    className="mt-4 bg-blue-400 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-500 transition duration-200 cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="mt-4 bg-red-400 text-white font-bold py-2  px-4 rounded-lg shadow-md hover:bg-red-500 transition duration-200 cursor-pointer"
                  >
                    Eliminar
                  </button>
                  
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
