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
      <div className="space-y-5 w-80">
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Usuario</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-[#0dc0e0]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Tu usuario" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-[#0dc0e0] focus:shadow-lg outline-none transition-all duration-300 hover:border-gray-300" 
            />
          </div>
        </div>
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">Contraseña</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-[#0dc0e0]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input 
              type="password" 
              placeholder="Tu contraseña" 
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:bg-white focus:border-[#0dc0e0] focus:shadow-lg outline-none transition-all duration-300 hover:border-gray-300" 
            />
          </div>
        </div>
        <button className="w-full mt-8 bg-linear-to-r from-[#0dc0e0] to-[#0a9db8] text-white font-bold py-3 rounded-lg hover:from-[#0bb0ce] hover:to-[#088da8] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105">
          Iniciar Sesión
        </button>
      </div>
    </div>
    </div>

  </div>
  )
}

export default login