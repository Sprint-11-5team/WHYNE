import instance from "@/api/api";
import { LoginRequest, User } from "@/types/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  login: (data: LoginRequest) => void;
  logout: () => void;
  updateMe: (user: User) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateMe: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function getMe() {
    const res = await instance.get("/users/me");
    const nextUser = res.data;
    setUser(nextUser);
  }

  async function login({ email, password }: LoginRequest) {
    const res = await instance.post("/auth/signin", {
      email,
      password,
    });

    const { accessToken, refreshToken } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    await getMe();
  }

  async function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  }

  async function updateMe({ image, nickname }: User) {
    const res = await instance.patch("/users/me", { image, nickname });
    const nextUser = res.data;
    setUser(nextUser);
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider 안에서만 사용해야 함");
  }
  return context;
}
