const DeleteAppointmentModal = ({ isOpen, onClose, onSubmit }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center bg-gray-900/70">
            <div className="border-l-5 border-[#0dc0e0] bg-linear-to-r from-cyan-100 to-white rounded-xl shadow-lg p-8 max-w-md w-full">
                <h2 className="text-xl font-bold mb-6 text-red-600">Eliminar cita</h2>
                <p className="mb-6 text-gray-700">
                    ¿Estás seguro que deseas eliminar esta cita?
                    <span className="block font-semibold text-gray-900 mt-2">
                        Esta acción no se puede deshacer.
                    </span>
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition font-medium"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold"
                        onClick={onSubmit}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteAppointmentModal;