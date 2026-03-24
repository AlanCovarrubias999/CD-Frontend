const DeletePatientModal = ({ isOpen, onClose, onDelete, patient }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center bg-gray-900/70">
      <div className="border-l-5 border-[#0dc0e0] bg-linear-to-r from-cyan-100 to-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-red-600">Eliminar paciente</h2>
        <p className="mb-6 text-gray-700">
          ¿Estás seguro que deseas eliminar al paciente
          <span className="font-semibold text-gray-900"> {patient?.name} </span>?
          Esta acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-semibold"
            onClick={() => onDelete(patient)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePatientModal;
