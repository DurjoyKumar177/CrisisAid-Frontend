import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutService, getProfile } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Fetch user data from the profile endpoint instead
        // This ensures we get the profile_picture field
        const userData = await getProfile();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  };

  const login = (token, userData = null) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    if (userData) {
      setUser(userData);
    } else {
      checkAuth(); // Fetch user data including profile picture
    }
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;