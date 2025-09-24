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

  // API helper function
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

  useEffect(() => {
    // Check if admin is logged in (from localStorage)
    const checkAuthStatus = async () => {
      try {
        const savedAuth = localStorage.getItem('adminAuth');
        if (savedAuth) {
          const authData = JSON.parse(savedAuth);
          
          // Verify token is still valid by making a protected API call
          // You might want to create a /me endpoint for this
          setIsAuthenticated(true);
          setAdmin(authData.admin);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        logout(); // Clear invalid auth data
      } finally {
        setIsLoading(false);
      }
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
        // Decode the token to get user info (you might want a /me endpoint instead)
        const tokenData = parseJwt(response.accessToken);
        
        const adminData: AdminUser = {
          id: tokenData.id,
          username: tokenData.email.split('@')[0], // or get from /me endpoint
          email: tokenData.email,
        };

        setIsAuthenticated(true);
        setAdmin(adminData);
        
        // Store auth data in localStorage
        localStorage.setItem('adminAuth', JSON.stringify({ 
          admin: adminData,
          accessToken: response.accessToken 
        }));

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

  const logout = () => {
    setIsAuthenticated(false);
    setAdmin(null);
    setError(null);
    localStorage.removeItem('adminAuth');
  };

  // Helper function to parse JWT token
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
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

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};