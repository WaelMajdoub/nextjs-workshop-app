import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

interface AuthContextType {
  isLoggedIn: boolean;
  authToken: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  authToken: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  //check after page refresh to get the token inside the useAuthContext
  const checkAuthState = () => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        'https://dental.aftercode.tn/api/v1/token/login/',
        { email, password }
      );
      const { auth_token } = response.data;
      setAuthToken(auth_token);
      setIsLoggedIn(true);
      localStorage.setItem('authToken', auth_token);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, show error message, etc.
    }
  };

  const logout = () => {
    setAuthToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
