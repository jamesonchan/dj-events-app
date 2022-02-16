import axios from "axios";
import { API_URL, NEXT_URL } from "config";
import { useRouter } from "next/router";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginUser, RegisterUser } from "types";

export type AuthContextType = {
  user: string | null;
  error: string | null;
  register: (user: RegisterUser) => void;
  login: (user: LoginUser) => void;
  logout: () => void;
  checkUserLoggedIn: () => void;
};

export const authContextDefault: AuthContextType = {
  user: null,
  error: null,
  register: () => null,
  login: () => null,
  logout: () => null,
  checkUserLoggedIn: () => null,
};

type Props = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(authContextDefault);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(authContextDefault.user);
  const [error, setError] = useState(authContextDefault.error);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const register = async ({ username, email, password }: RegisterUser) => {
    try {
      const resData = await axios.post(`${NEXT_URL}/api/register`, {
        username,
        email,
        password,
      });
      setUser(resData.data.user);
      router.push("/account/dashboard");
    } catch (error: any) {
      setError(error.message);
      setError(null);
    }
  };

  const login = async ({ email: identifier, password }: LoginUser) => {
    try {
      const resData = await axios.post(`${NEXT_URL}/api/login`, {
        identifier,
        password,
      });
      setUser(resData.data.user);
      router.push("/account/dashboard");
    } catch (error: any) {
      setError(error.message);
      setError(null);
    }
  };

  const logout = async () => {
    await axios.post(`${NEXT_URL}/api/logout`).then((res) => setUser(null));
    router.push("/");
  };

  const checkUserLoggedIn = async () => {
    await axios
      .get(`${NEXT_URL}/api/user`)
      .then((res) => setUser(res.data))
      .catch((error) => setUser(null));
    router.push("/account/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
