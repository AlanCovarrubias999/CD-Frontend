import { useState, useEffect } from "react";
import { getPatientsRequest } from "../../api/patients";
import { useAuth } from "../../context/AuthContext";
import { getAppointmentsRequest } from "../../api/appointments";

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalPatients: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    cancelledAppointments: 0,
  });
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    console.log(user);
    const fetchStats = async () => {
      try {
        const [patientsRes, appointmentsRes] = await Promise.all([
          getPatientsRequest(),
          getAppointmentsRequest(),
        ]);
        const patients = patientsRes.data || [];
        let appointmentsData = appointmentsRes.data;
        console.log(
          "Datos de citas para estadísticas:",
          appointmentsData,
          "Datos de pacientes para estadísticas:",
          patients,
        );
        if (!Array.isArray(appointmentsData)) {
          if (
            appointmentsData &&
            appointmentsData.appointments &&
            Array.isArray(appointmentsData.appointments)
          ) {
            appointmentsData = appointmentsData.appointments;
          } else {
            appointmentsData = [];
          }
        }

        setStats({
          totalPatients: patients.length,
          pendingAppointments: appointmentsData.filter(
            (a) => a.status === "Pendiente",
          ).length,
          completedAppointments: appointmentsData.filter(
            (a) => a.status === "Completada",
          ).length,
          cancelledAppointments: appointmentsData.filter(
            (a) => a.status === "Cancelada",
          ).length, // Puedes actualizar este cálculo si lo deseas
        });
      } catch (error) {
        console.error("Error cargando estadísticas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, bgColor, textColor }) => (
    <div className={`${bgColor} rounded-lg shadow-md p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        <div className={`${textColor} text-5xl opacity-20`}>{icon}</div>
      </div>
    </div>
  );

  const statusStyles = {
    Pendiente: "bg-orange-400 text-white border border-orange-200", // Naranja
    Cancelada: "bg-red-400 text-white border border-red-200", // Rojo
    Completada: "bg-green-400 text-white border border-green-200", // Verde
    default: "bg-gray-400 text-white border border-gray-200", // Gris por si acaso
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-linear-to-r from-[#0dc0e0] to-cyan-500 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Bienvenido de vuelta.</h2>
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
          bgColor="bg-gradient-to-br from-blue-500 to-blue-800"
          textColor="text-blue-100"
        />
        <StatCard
          title="Citas pendientes"
          value={stats.pendingAppointments}
          icon="📅"
          bgColor="bg-gradient-to-br from-orange-500 to-orange-800"
          textColor="text-orange-100"
        />
        <StatCard
          title="Citas completadas"
          value={stats.completedAppointments}
          icon="✓"
          bgColor="bg-gradient-to-br from-green-500 to-green-800"
          textColor="text-green-100"
        />
        <StatCard
          title="Citas canceladas"
          value={stats.cancelledAppointments}
          icon="❌"
          bgColor="bg-gradient-to-br from-red-500 to-red-800"
          textColor="text-red-100"
        />
      </div>

      {/* Charts/Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Listado de Citas */}
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
                className={`border-l-4 border-[#0dc0e0] bg-linear-to-r from-cyan-100 to-white p-4 rounded-lg hover:shadow-md transition`}
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
                </div>
              
            ))
          )}
        </div>
      </div>

        {/* Actividad Reciente */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            (WIP)
          </h3>
          <div className="space-y-3">
            {[
              {
                action: "Paciente registrado",
                detail: "Sofia Martínez",
                time: "Hace 2 horas",
              },
              {
                action: "Cita agendada",
                detail: "Limpieza dental",
                time: "Hace 4 horas",
              },
              {
                action: "Paciente actualizado",
                detail: "David González",
                time: "Hace 1 día",
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-b-0"
              >
                <div className="w-2 h-2 bg-[#0dc0e0] rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.detail}
                  </p>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
