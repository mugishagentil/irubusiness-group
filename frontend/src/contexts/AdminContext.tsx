import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
  email: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5020/api';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (err) {
      throw err;
    }
  };

  // Parse JWT and check expiration
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  const isTokenExpired = (token: string) => {
    const payload = parseJwt(token);
    if (!payload || !payload.exp) return true;
    return Date.now() >= payload.exp * 1000;
  };

 const logout = () => {
  setIsAuthenticated(false);
  setAdmin(null);
  setError(null);
  localStorage.removeItem('adminAuth');
  window.location.href = '/admin'; 
};

  useEffect(() => {
    const checkAuthStatus = () => {
      const savedAuth = localStorage.getItem('adminAuth');
      if (!savedAuth) {
        setIsLoading(false);
        return;
      }

      const authData = JSON.parse(savedAuth);
      if (!authData.accessToken || isTokenExpired(authData.accessToken)) {
        logout();
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      setAdmin(authData.admin);
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.success && response.accessToken) {
        const tokenData = parseJwt(response.accessToken);
        const adminData: AdminUser = {
          id: tokenData.id,
          username: tokenData.email.split('@')[0],
          email: tokenData.email,
        };

        setIsAuthenticated(true);
        setAdmin(adminData);

        localStorage.setItem('adminAuth', JSON.stringify({ admin: adminData, accessToken: response.accessToken }));

        return true;
      }
      return false;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    admin,
    login,
    logout,
    isLoading,
    error,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};
