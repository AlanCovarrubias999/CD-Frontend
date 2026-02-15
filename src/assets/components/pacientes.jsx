import { useState, useEffect } from "react";
import {
  getPatientsRequest,
  createPatientRequest,
  deletePatientRequest,
  updatePatientRequest,
} from "../../api/patients";

function Pacientes() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone_number: "",
  });
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  console.log("Formulario:", form);
  console.log("Pacientes cargados:", patients);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatientRequest({
        name: form.name,
        age: parseInt(form.age, 10) || 0,
        gender: form.gender,
        phone_number: form.phone_number,
      });
      setForm({ name: "", age: "", gender: "", phone_number: "" });
      fetchPatients();
    } catch (err) {
      console.error("Error creando paciente", err);
      setError("No se pudo crear el paciente");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-linear-to-r from-[#0dc0e0] to-cyan-500 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Registrar Paciente 👤</h2>
        <p className="text-cyan-100">Agregue nuevos pacientes a la base de datos</p>
      </div>

      {/* Form Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Datos del paciente</h3>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ej: Juan González"
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Edad
              </label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
                placeholder="Ej: 35"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Género
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              >
                <option value="">-- Seleccione --</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                required
                placeholder="Ej: +1234567890"
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0dc0e0] hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            ✓ Guardar Paciente
          </button>
        </form>
      </div>

      {/* Patients List Section */}
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
