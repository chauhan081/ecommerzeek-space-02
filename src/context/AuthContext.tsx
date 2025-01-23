import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getLocalStorageItem = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return null;
  }
};

const setLocalStorageItem = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error setting localStorage:', error);
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for user data on mount
    const storedUser = getLocalStorageItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, you would validate against a backend
    const storedUsers = getLocalStorageItem("users") || [];
    const user = storedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    setUser(userData);
    setLocalStorageItem("user", userData);
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const storedUsers = getLocalStorageItem("users") || [];
    
    if (storedUsers.some((u: any) => u.email === email)) {
      throw new Error("Email already exists");
    }

    const newUser = {
      id: crypto.randomUUID(),
      email,
      password,
      name,
    };

    storedUsers.push(newUser);
    setLocalStorageItem("users", storedUsers);

    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };

    setUser(userData);
    setLocalStorageItem("user", userData);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("user");
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}