import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import logo from "../images/AyK.png";
import Pacientes from "../components/pacientes.jsx";
import Dashboard from "../components/dashboard.jsx";
import Citas from "../components/citas.jsx";

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(1);

  const username = user?.user;
  console.log("Usuario actual:", username);
  console.log("Menu abierto:", menuOpen);

  const menuItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-3m2 3l2-3m2 3l2-3m2-4l2 3m-2-3l2-3m-2 3l2-3M3 20h18a1 1 0 001-1V7a1 1 0 00-1-1H3a1 1 0 00-1 1v12a1 1 0 001 1z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      label: "Pacientes",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 12H9m4 8H9m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      label: "Citas",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    }
  ]

  const renderContent = () => {
    switch (menuOpen.id) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Pacientes />;
      case 3:
        return <Citas />;
      default:
        return <Dashboard />;
    }
  };

  const handleMenuItemClick = (item) => {
    setMenuOpen(item);
    console.log("Menu item clicked:", item.id);
    console.log("Menu item label:", item.label);
  };

  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#0dc0e0] transition-all duration-300 flex flex-col shadow-lg`}
      >
        {/* Logo y titulo */}
        <div className="p-6 flex items-center justify-center border-b border-cyan-400">
          <div className="bg-white px-6 py-3 rounded-full shadow-md flex items-center">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            {sidebarOpen && (
              <span className="ml-3 text-black font-bold text-lg hidden sm:inline">
                AyK
              </span>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item) => (
            <button
              onClick={() => {
                handleMenuItemClick(item);
              }}
              key={item.id}
              className="w-full flex items-center px-4 py-3 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-200 group"
            >
              <span className="text-white group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              {sidebarOpen && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t border-cyan-400">
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-3 text-white rounded-lg hover:bg-cyan-500 transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {sidebarOpen && (
              <span className="ml-3 text-sm font-medium">Cerrar sesión</span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors mr-4"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                {menuOpen.label}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 font-medium">
                Bienvenido, {username || user.username}
              </span>
              <div className="w-10 h-10 bg-[#0dc0e0] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.username?.charAt(0).toUpperCase() ||
                    username.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* Main content for pacientes */}
        {renderContent()}
      </div>
    </div>
  );
}

export default HomePage;
