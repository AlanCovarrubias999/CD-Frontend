import { useState, useEffect } from "react";
import { getPatientsRequest } from "../../api/patients";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    appointmentsThisWeek: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await getPatientsRequest();
        const patients = res.data || [];
        
        // Simulación de datos para demo
        setStats({
          totalPatients: patients.length,
          pendingAppointments: 5,
          completedAppointments: 12,
          appointmentsThisWeek: 3,
        });
      } catch (error) {
        console.error("Error cargando estadísticas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, bgColor, textColor }) => (
    <div className={`${bgColor} rounded-lg shadow-md p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`${textColor} text-5xl opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-[#0dc0e0] to-cyan-500 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Bienvenido de vuelta, {user?.user}</h2>
        <p className="text-cyan-100">
          Aquí puedes ver un resumen de tu consultorio
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Pacientes totales"
          value={stats.totalPatients}
          icon="👥"
          bgColor="bg-blue-500"
          textColor="text-blue-300"
        />
        <StatCard
          title="Citas pendientes"
          value={stats.pendingAppointments}
          icon="📅"
          bgColor="bg-orange-500"
          textColor="text-orange-300"
        />
        <StatCard
          title="Citas completadas"
          value={stats.completedAppointments}
          icon="✓"
          bgColor="bg-green-500"
          textColor="text-green-300"
        />
        <StatCard
          title="Esta semana"
          value={stats.appointmentsThisWeek}
          icon="📊"
          bgColor="bg-purple-500"
          textColor="text-purple-300"
        />
      </div>

      {/* Charts/Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Próximas Citas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Próximas Citas</h3>
          <div className="space-y-3">
            {[
              { patient: "Juan García", date: "Hoy 14:30", status: "Confirmado" },
              { patient: "María López", date: "Mañana 10:00", status: "Pendiente" },
              { patient: "Carlos Pérez", date: "Viernes 15:00", status: "Confirmado" },
            ].map((appt, idx) => (
              <div
                key={idx}
                className="border-l-4 border-[#0dc0e0] bg-gray-50 p-3 rounded"
              >
                <p className="font-medium text-gray-800">{appt.patient}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-600">{appt.date}</span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      appt.status === "Confirmado"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {appt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente</h3>
          <div className="space-y-3">
            {[
              { action: "Paciente registrado", detail: "Sofia Martínez", time: "Hace 2 horas" },
              { action: "Cita agendada", detail: "Limpieza dental", time: "Hace 4 horas" },
              { action: "Paciente actualizado", detail: "David González", time: "Hace 1 día" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-b-0">
                <div className="w-2 h-2 bg-[#0dc0e0] rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.detail}</p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <button className="bg-[#0dc0e0] hover:bg-cyan-600 text-white py-2 px-4 rounded-lg font-medium transition">
            ➕ Nuevo Paciente
          </button>
          <button className="border-2 border-[#0dc0e0] text-[#0dc0e0] hover:bg-cyan-50 py-2 px-4 rounded-lg font-medium transition">
            📅 Nueva Cita
          </button>
          <button className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg font-medium transition">
            📊 Ver Reportes
          </button>
          <button className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-lg font-medium transition">
            ⚙️ Configuración
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
