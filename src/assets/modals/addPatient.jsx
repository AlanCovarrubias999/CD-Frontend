import { useState, useEffect } from "react";

export default function AddPatientModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone_number: "",
    is_sick: "No",
    medications: "",
    allergies: "",
    heart_rate: "",
    blood_pressure: "",
    temperature: "",
    weight: "",
    glucose: "",
    odontogram: [{ tooth_number: "", status: "", notes: "" }],
    diagnosis: "",
    treatment_plan: "",
    date: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        age: initialData.age ? String(initialData.age) : "",
        gender: initialData.gender || "",
        phone_number: initialData.phone_number || "",
        is_sick: initialData.medical_histories?.[0]?.is_sick || "No",
        medications: initialData.medical_histories?.[0]?.medications || "",
        allergies: initialData.medical_histories?.[0]?.allergies || "",
        heart_rate:
          initialData.medical_histories?.[0]?.vitals?.heart_rate || "",
        blood_pressure:
          initialData.medical_histories?.[0]?.vitals?.blood_pressure || "",
        temperature:
          initialData.medical_histories?.[0]?.vitals?.temperature || "",
        weight: initialData.medical_histories?.[0]?.vitals?.weight || "",
        glucose: initialData.medical_histories?.[0]?.vitals?.glucose || "",
        odontogram:
          initialData.medical_histories?.[0]?.odontogram?.length > 0
            ? initialData.medical_histories[0].odontogram.map((o) => ({
                tooth_number: o.tooth_number || "",
                status: o.status || "",
                notes: o.notes || "",
              }))
            : [{ tooth_number: "", status: "", notes: "" }],
        diagnosis: initialData.medical_histories?.[0]?.diagnosis || "",
        treatment_plan:
          initialData.medical_histories?.[0]?.treatment_plan || "",
        date: initialData.medical_histories?.[0]?.date?.slice(0, 10) || "",
      });
    } else {
      setForm({
        name: "",
        age: "",
        gender: "",
        phone_number: "",
        is_sick: "No",
        medications: "",
        allergies: "",
        heart_rate: "",
        blood_pressure: "",
        temperature: "",
        weight: "",
        glucose: "",
        odontogram: [{ tooth_number: "", status: "", notes: "" }],
        diagnosis: "",
        treatment_plan: "",
        date: "",
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // For odontogram array fields
  const handleOdontogramChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const odontogram = prev.odontogram.map((item, i) =>
        i === idx ? { ...item, [name]: value } : item,
      );
      return { ...prev, odontogram };
    });
  };

  const addOdontogramRow = () => {
    setForm((prev) => ({
      ...prev,
      odontogram: [
        ...prev.odontogram,
        { tooth_number: "", status: "", notes: "" },
      ],
    }));
  };

  const removeOdontogramRow = (idx) => {
    setForm((prev) => ({
      ...prev,
      odontogram: prev.odontogram.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Structure the data as expected by backend
      const patientData = {
        name: form.name,
        age: parseInt(form.age, 10) || 0,
        gender: form.gender,
        phone_number: form.phone_number,
        medical_histories: [
          {
            is_sick: form.is_sick,
            medications: form.medications,
            allergies: form.allergies,
            vitals: {
              heart_rate: form.heart_rate,
              blood_pressure: form.blood_pressure,
              temperature: form.temperature,
              weight: form.weight,
              glucose: form.glucose,
            },
            odontogram: form.odontogram,
            diagnosis: form.diagnosis,
            treatment_plan: form.treatment_plan,
            date: form.date || new Date().toISOString().slice(0, 10),
          },
        ],
      };
      await onSubmit(patientData);
      onClose();
    } catch (err) {
      console.error("Modal submit error", err);
      setError("Algo salió mal. Intente nuevamente.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center bg-gray-900/70">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          aria-label="Cerrar"
        >
          ✖️
        </button>
        <h3 className="text-xl font-bold mb-4">
          {initialData ? "Editar paciente" : "Nuevo paciente"}
        </h3>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
            <p className="font-semibold">{error}</p>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Ej: Juan González"
              className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
            />
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Edad
              </label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
                placeholder="Ej: 35"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Género
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              >
                <option value="">-- Seleccione --</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                required
                placeholder="Ej: +1234567890"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
          </div>
          {/* Medical History */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                ¿Está enfermo?
              </label>
              <select
                name="is_sick"
                value={form.is_sick}
                onChange={handleChange}
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              >
                <option value="No">No</option>
                <option value="Sí">Sí</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Medicamentos
              </label>
              <input
                type="text"
                name="medications"
                value={form.medications}
                onChange={handleChange}
                placeholder="Ej: Ninguno"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Alergias
              </label>
              <input
                type="text"
                name="allergies"
                value={form.allergies}
                onChange={handleChange}
                placeholder="Ej: Penicilina"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
          </div>
          {/* Vitals */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                FC (lpm)
              </label>
              <input
                type="text"
                name="heart_rate"
                value={form.heart_rate}
                onChange={handleChange}
                placeholder="72 lpm"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                PA (mmHg)
              </label>
              <input
                type="text"
                name="blood_pressure"
                value={form.blood_pressure}
                onChange={handleChange}
                placeholder="120/80 mmHg"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Temp (°C)
              </label>
              <input
                type="text"
                name="temperature"
                value={form.temperature}
                onChange={handleChange}
                placeholder="36.5 °C"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Peso (kg)
              </label>
              <input
                type="text"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                placeholder="75 kg"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Glucosa (mg/dl)
              </label>
              <input
                type="text"
                name="glucose"
                value={form.glucose}
                onChange={handleChange}
                placeholder="90 mg/dl"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
          </div>
          {/* Odontogram */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Odontograma
            </label>
            {form.odontogram.map((o, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="number"
                  name="tooth_number"
                  value={o.tooth_number}
                  onChange={(e) => handleOdontogramChange(idx, e)}
                  placeholder="Diente"
                  className="w-20 border-2 border-gray-200 rounded-lg px-2 py-1 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
                />
                <input
                  type="text"
                  name="status"
                  value={o.status}
                  onChange={(e) => handleOdontogramChange(idx, e)}
                  placeholder="Estado"
                  className="w-32 border-2 border-gray-200 rounded-lg px-2 py-1 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
                />
                <input
                  type="text"
                  name="notes"
                  value={o.notes}
                  onChange={(e) => handleOdontogramChange(idx, e)}
                  placeholder="Notas"
                  className="flex-1 border-2 border-gray-200 rounded-lg px-2 py-1 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
                />
                {form.odontogram.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOdontogramRow(idx)}
                    className="text-red-500 font-bold px-2"
                  >
                    ✖️
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOdontogramRow}
              className="bg-gray-200 text-gray-800 font-semibold py-1 px-3 rounded hover:bg-gray-300 mt-1"
            >
              Agregar diente
            </button>
          </div>
          {/* Diagnosis and Treatment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Diagnóstico
              </label>
              <textarea
                name="diagnosis"
                value={form.diagnosis}
                onChange={handleChange}
                placeholder="Diagnóstico"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Plan de tratamiento
              </label>
              <textarea
                name="treatment_plan"
                value={form.treatment_plan}
                onChange={handleChange}
                placeholder="Plan de tratamiento"
                className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:border-[#0dc0e0] transition"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#0dc0e0] text-white font-bold py-2 px-4 rounded hover:bg-cyan-600"
            >
              {initialData ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
