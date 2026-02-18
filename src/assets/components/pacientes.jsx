import { useState, useEffect } from "react";
import {
  getPatientsRequest,
  createPatientRequest,
  deletePatientRequest,
  updatePatientRequest,
} from "../../api/patients";
import AddPatientModal from "../modals/addPatient";

// svg icon components used in action buttons
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5l3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 7" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6m4-6v6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7V4h6v3" />
  </svg>
);

function Pacientes() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // controls modal visibility and the patient being edited (null for new)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPatient, setModalPatient] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await getPatientsRequest();
      setPatients(res.data || []);
    } catch (err) {
      console.error("Error fetching patients", err);
      setError("No se pudieron cargar los pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // modal form state handled inside AddPatientModal

  console.log("Pacientes cargados:", patients);

  // submission will be handled by the modal via this callback
  const handleModalSubmit = async (data) => {
    try {
      if (modalPatient && modalPatient._id) {
        await updatePatientRequest(modalPatient._id, data);
      } else {
        await createPatientRequest(data);
      }
      fetchPatients();
    } catch (err) {
      console.error("Error guardando paciente desde modal", err);
      setError("No se pudo guardar el paciente");
    }
  };

  const handleView = (patient) => {
    alert(`Paciente:\nNombre: ${patient.name}\nEdad: ${patient.age}\nGénero: ${patient.gender}\nTeléfono: ${patient.phone_number}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este paciente?")) return;
    try {
      await deletePatientRequest(id);
      fetchPatients();
    } catch (err) {
      console.error("Error eliminando paciente", err);
      setError("No se pudo eliminar el paciente");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-linear-to-r from-[#0dc0e0] to-cyan-500 rounded-lg shadow-lg p-8 text-white ">
        <h2 className="text-3xl font-bold mb-2">Administra tus pacientes 👤</h2>
        <p className="text-cyan-100">Agregue nuevos pacientes a la base de datos</p>
        <button
          onClick={fetchPatients}
          className="mt-4 bg-white text-[#0dc0e0] font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-400 hover:text-white transition duration-200"
        >
          🔄 Refrescar lista
        </button>
        <button
          onClick={() => {
            setModalPatient(null);
            setIsModalOpen(true);
          }}
          className="mt-4 ml-2 bg-white text-[#0dc0e0] font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-400 hover:text-white transition duration-200 "
        >
          ➕ Agregar paciente
        </button>
      </div>

      {/* Modal para agregar a los pacientes: */}
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={modalPatient}
        onSubmit={handleModalSubmit}
      />

      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          Lista de pacientes ({patients.length})
        </h3>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="spinner border-4 border-gray-200 border-t-[#0dc0e0] rounded-full w-8 h-8"></div>
            <span className="ml-3 text-gray-600">Cargando pacientes...</span>
          </div>
        ) : patients.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No hay pacientes registrados aún. ¡Agregue uno!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#0dc0e0]">
                  <th className="px-4 py-4 text-left font-bold text-gray-800">
                    Nombre
                  </th>
                  <th className="px-4 py-4 text-left font-bold text-gray-800">
                    Edad
                  </th>
                  <th className="px-4 py-4 text-left font-bold text-gray-800">
                    Género
                  </th>
                  <th className="px-4 py-4 text-left font-bold text-gray-800">
                    Teléfono
                  </th>
                  <th className="px-4 py-4 text-left font-bold text-gray-800">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, idx) => (
                  <tr
                    key={p._id}
                    className="border-b border-gray-200 hover:bg-cyan-50 transition"
                  >
                    <td className="px-4 py-4 text-gray-800 font-medium">
                      {p.name}
                    </td>
                    <td className="px-4 py-4 text-gray-700">{p.age}</td>
                    <td className="px-4 py-4">
                      <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {p.gender === "male"
                          ? "♂ Masculino"
                          : p.gender === "female"
                          ? "♀ Femenino"
                          : "Otro"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-700">{p.phone_number}</td>
                  <td className="px-4 py-4 space-x-2">
                    <button
                      onClick={() => handleView(p)}
                      className="text-blue-600 bg-cyan-400 hover:cursor-pointer rounded"
                      title="Consultar"
                    >
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => {
                        setModalPatient(p);
                        setIsModalOpen(true);
                      }}
                      className="text-yellow-600 bg-yellow-400 hover:cursor-pointer rounded"
                      title="Editar"
                    >
                      <PencilIcon />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-600 bg-red-400 hover:cursor-pointer rounded"
                      title="Eliminar"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Pacientes;
