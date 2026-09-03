import { useCallback, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { CaptainAuthContext } from "../contexts/captainAuth.context";

import {
  registerCaptain,
  loginCaptain,
  signinCaptainWithGoogle,
  completeGoogleCaptainRegistration,
  getCaptainProfile,
  logoutCaptain,
} from "../services/captainAuth.api";

const useCaptainAuth = () => {
  const { captain, setCaptain, authChecked, setAuthChecked } =
    useContext(CaptainAuthContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = useCallback(
    async (captainData) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await registerCaptain(captainData);

        localStorage.setItem("captainToken", data.token);

        setCaptain(data.captain);
        setAuthChecked(true);

        navigate("/captain-home");

        return true;
      } catch (error) {
        console.error("Captain signup failed:", error);

        const message =
          error.response?.data?.message ||
          "Unable to create captain account. Please try again.";

        setError(message);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setCaptain, setAuthChecked],
  );

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await loginCaptain(credentials);

        localStorage.setItem("captainToken", data.token);

        setCaptain(data.captain);
        setAuthChecked(true);

        navigate("/captain-home");

        return true;
      } catch (error) {
        console.error("Captain login failed:", error);

        const message =
          error.response?.data?.message ||
          "Unable to login. Please check your credentials.";

        setError(message);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setCaptain, setAuthChecked],
  );

  const signinWithGoogle = useCallback(
    async (idToken) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await signinCaptainWithGoogle(idToken);

        // Existing captain account.
        if (!data.registrationRequired) {
          localStorage.setItem("captainToken", data.token);

          setCaptain(data.captain);
          setAuthChecked(true);

          navigate("/captain-home");

          return {
            success: true,
            registrationRequired: false,
          };
        }

        // New captain needs vehicle registration.
        return {
          success: true,
          registrationRequired: true,
          registrationToken: data.registrationToken,
        };
      } catch (error) {
        console.error("Captain Google sign-in failed:", error);

        const message =
          error.response?.data?.message ||
          "Unable to sign in with Google. Please try again.";

        setError(message);

        return {
          success: false,
          registrationRequired: false,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setCaptain, setAuthChecked],
  );

  const completeGoogleRegistration = useCallback(
    async (registrationToken, vehicle) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await completeGoogleCaptainRegistration(
          registrationToken,
          vehicle,
        );

        localStorage.setItem("captainToken", data.token);

        setCaptain(data.captain);
        setAuthChecked(true);

        navigate("/captain-home");

        return true;
      } catch (error) {
        console.error("Captain Google registration failed:", error);

        const message =
          error.response?.data?.message ||
          "Unable to complete registration. Please try again.";

        setError(message);

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, setCaptain, setAuthChecked],
  );

  const fetchCaptainProfile = useCallback(async () => {
    const token = localStorage.getItem("captainToken");

    if (!token) {
      setCaptain(null);
      setAuthChecked(true);

      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const captain = await getCaptainProfile(token);

      setCaptain(captain ?? null);

      return true;
    } catch (error) {
      console.error("Failed to fetch captain profile:", error);

      localStorage.removeItem("captainToken");

      setCaptain(null);

      const message =
        error.response?.data?.message ||
        "Your captain session has expired. Please login again.";

      setError(message);

      return false;
    } finally {
      setAuthChecked(true);
      setIsLoading(false);
    }
  }, [setCaptain, setAuthChecked]);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("captainToken");

      if (token) {
        await logoutCaptain(token);
      }

      return true;
    } catch (error) {
      console.error("Captain logout failed:", error);

      const message =
        error.response?.data?.message || "Unable to logout properly.";

      setError(message);

      return false;
    } finally {
      localStorage.removeItem("captainToken");

      setCaptain(null);
      setAuthChecked(true);
      setIsLoading(false);

      navigate("/captain-login");
    }
  }, [navigate, setCaptain, setAuthChecked]);

  return {
    captain,
    authChecked,
    isLoading,
    error,

    signup,
    login,
    signinWithGoogle,
    completeGoogleRegistration,
    fetchCaptainProfile,
    logout,
  };
};

export default useCaptainAuth;
