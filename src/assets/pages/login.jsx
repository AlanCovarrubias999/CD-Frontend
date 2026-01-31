import logo from '../images/AyK.png';

function login() {
  return (
  <div className="flex h-screen w-screen font-inter">
    {/* Lado Izquierdo - Azul */}
    <div className="flex-1 bg-[#0dc0e0] flex items-center justify-center">
      <h1 className="text-white text-2xl font-bold">Lado Azul</h1>
    </div>

  {/* Lado Derecho - Blanco */}
    <div className="flex-3 bg-white flex flex-col items-center p-10">
    <img src={logo} alt="Logo A&K" className="w-32 h-auto mb-[10%]"/>

    {/* Contenido abajo del logo */}
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">
        Iniciar sesión
      </h1>
      <div className="space-y-4">
        <div>
          <label className="block text-xl font-semibold text-gray-700">Usuario</label>
          <input type="text" className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0dc0e0] outline-none transition-all" />
        </div>
        <div>
          <label className="block text-xl font-semibold text-gray-700">Contraseña</label>
          <input type="password" className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0dc0e0] outline-none transition-all" />
        </div>
        <button className="w-full bg-[#0dc0e0] text-white font-bold py-3 rounded-xl hover:bg-[#0bb0ce] transition-colors">
          Iniciar Sesión
        </button>
      </div>
    </div>
    </div>

  </div>
  )
}

export default login