import { useEffect, useRef, useState } from "react";
import {
  login as loginFunc,
  register as registerFunc,
  logout as logoutFunc,
} from "../services/auth";
import { identify as identifyFunc } from "../services/users";
import { useCookies } from "react-cookie";
import { useAppDispatch, useAppSelector } from "./redux/store";
import {
  selectToken,
  selectTokenLoading,
  setToken,
} from "./redux/slices/authSlice";
import { setUser } from "./redux/slices/userSlice";
import { handleRefreshTokenIfPresent } from "../services/utils/refresh";

export const useLogin = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await loginFunc(email, password);

      if (response.status === 200) {
        dispatch(setToken(response.data.accessToken));
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};

export const useLogout = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);

  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    if (!token) {
      return;
    }

    try {
      await logoutFunc(token);

      removeCookie("access_token");
      dispatch(setToken(null));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, logout };
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      await registerFunc(email, password, firstName, lastName);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, register };
};

export const useIdentify = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const identify = async () => {
    if (!token) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await identifyFunc(token);
      const refreshToken = handleRefreshTokenIfPresent(response);
      if (refreshToken) {
        dispatch(setToken(refreshToken));
      }

      const user = response.data;

      dispatch(setUser(user));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, identify };
};

export function AuthProvider(props: { children: React.ReactNode }) {
  const firstRender = useRef(true);

  const dispatch = useAppDispatch();
  const [cookie, setCookie, removeCookie] = useCookies(["access_token"]);

  const token = useAppSelector(selectToken);
  const tokenLoading = useAppSelector(selectTokenLoading);

  const { identify } = useIdentify();

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!cookie.access_token) {
      return;
    }

    dispatch(setToken(cookie.access_token));
  }, [cookie.access_token, dispatch]);

  useEffect(() => {
    if (cookie.access_token && !token) return;
    if (cookie.access_token !== token) {
      setCookie("access_token", token);
    }

    identify();
  }, [token, cookie.access_token, setCookie]);

  return <>{props.children}</>;
}
