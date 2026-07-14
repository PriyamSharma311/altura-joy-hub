import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = { name: string; email: string; phone: string };

const KEY = "altura_user";

type Ctx = {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
};
const AuthCtx = createContext<Ctx>({ user: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);
  const login = (u: User) => {
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };
  return <AuthCtx.Provider value={{ user, login, logout }}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
