import { createContext, useContext, useState, useEffect } from "react";

// Create Auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodeToken = (token) => {
      // Split the token into its three parts
      const [header, payload, signature] = token.split('.');

      // Decode the payload from Base64Url
      const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/');
      const base64 = decodeURIComponent(atob(base64Url).split('').map(c => 
        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      ).join(''));

      // Parse the JSON payload
      return JSON.parse(base64);
    };

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      setIsAuthenticated(true);
      setUser(decoded);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
