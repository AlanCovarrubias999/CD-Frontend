import { createContext, useState, useContext, useEffect, use } from "react";
import { loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAunthenticated, setIsAuthenticated] = useState(false);

  const iniciarSesion = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log("Esto es data hola" ,res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    async function checkLogin() {

      const cookies = Cookies.get();
      console.log("Cookies actuales:", cookies);

      if (!cookies.token){
        setIsAuthenticated(false);
        return setUser(null);
      }
        try {
          const res = await verifyTokenRequest(cookies.token);
          if (!res.data){
            setIsAuthenticated(false);
            setUser(null);
            return;
          } 

          setIsAuthenticated(true);
          setUser(res.data);
        } catch (error) {
          console.error("Error al verificar token:", error);
          setIsAuthenticated(false);
          setUser(null);
        }
      
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        iniciarSesion,
        logout,
        user,
        isAunthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
