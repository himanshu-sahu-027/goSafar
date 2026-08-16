import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UserAuthContext } from "../contexts/userAuth.context";

import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../services/userAuth.api";

const useUserAuth = () => {
  const { user, setUser, authChecked, setAuthChecked } =
    useContext(UserAuthContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = useCallback(
    async (userData) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await registerUser(userData);

        localStorage.setItem("token", data.token);

        setUser(data.user);
        setAuthChecked(true);

        navigate("/user-home");

        return true;
      } catch (error) {
        console.error("User signup failed:", error);

        const message =
          error.response?.data?.message ||
          "Unable to create account. Please try again.";

        setError(message);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setUser, setAuthChecked],
  );

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await loginUser(credentials);

        localStorage.setItem("token", data.token);

        setUser(data.user);
        setAuthChecked(true);

        navigate("/user-home");

        return true;
      } catch (error) {
        console.error("User login failed:", error);

        const message =
          error.response?.data?.message ||
          "Unable to login. Please check your credentials.";

        setError(message);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setUser, setAuthChecked],
  );

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setAuthChecked(true);

      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await getUserProfile(token);

      setUser(data.user ?? null);

      return true;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);

      localStorage.removeItem("token");
      setUser(null);

      const message =
        error.response?.data?.message ||
        "Your session has expired. Please login again.";

      setError(message);

      return false;
    } finally {
      setAuthChecked(true);
      setIsLoading(false);
    }
  }, [setUser, setAuthChecked]);

  const logout = useCallback(async () => {
    const token = localStorage.getItem("token");

    setIsLoading(true);
    setError(null);

    try {
      if (token) {
        await logoutUser(token);
      }

      return true;
    } catch (error) {
      console.error("User logout failed:", error);

      const message =
        error.response?.data?.message || "Unable to logout properly.";

      setError(message);

      return false;
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setAuthChecked(true);
      setIsLoading(false);

      navigate("/user-login");
    }
  }, [navigate, setUser, setAuthChecked]);

  return {
    user,
    authChecked,
    isLoading,
    error,
    signup,
    login,
    fetchUserProfile,
    logout,
  };
};

export default useUserAuth;
