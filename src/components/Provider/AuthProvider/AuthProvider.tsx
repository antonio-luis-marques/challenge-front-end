import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import UserStorage, {CredencialType} from '@/Auth/localstorage'; 
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: CredencialType | null;
  login: (email: string) => Promise<void>;
  register: (dataUser: CredencialType) => Promise<void>;
  logout: () => void;
  session: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CredencialType | null>(null);

  const router = useRouter()
  useEffect(() => {
    const storedUser = sessionStorage.getItem('dataUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string) => {
    const loggedInUser = await UserStorage.login(email);
    if (loggedInUser) {
      setUser(loggedInUser);
    }
    router.push('/');

  };

  const register = async (dataUser: CredencialType) => {
    await UserStorage.register(dataUser);
    setUser(dataUser);
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('dataUser');
    router.push('/')
  };

  const session = UserStorage.isSessionExpired

  return (
    <AuthContext.Provider value={{ user, login, register, logout, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
