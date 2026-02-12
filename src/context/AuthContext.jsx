import { createContext, useState, useContext } from "react";
import { loginRequest } from "../api/auth";

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
          console.log(res.data);
          setUser(res.data);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error al iniciar sesión:", error);
        }
    };

  return (
    <AuthContext.Provider value={{
      iniciarSesion,
      user,
      isAunthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
}
