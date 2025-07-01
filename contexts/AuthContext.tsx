
import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockAdmin, mockUser } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, pass: string): Promise<boolean> => {
    // Mock authentication logic
    if (email === mockAdmin.email && pass === 'admin123') {
      setUser(mockAdmin);
      return true;
    }
    if (email === mockUser.email && pass === 'user123') {
      setUser(mockUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);
  
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
