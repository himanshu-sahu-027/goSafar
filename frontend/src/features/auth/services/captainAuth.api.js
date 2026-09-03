import axios from "../../../config/axios";

const registerCaptain = async (captainData) => {
  const response = await axios.post("/captains/register", captainData);

  return response.data;
};

const loginCaptain = async (credentials) => {
  const response = await axios.post("/captains/login", credentials);

  return response.data;
};

const signinCaptainWithGoogle = async (idToken) => {
  const response = await axios.post("/captains/google", {
    idToken,
  });

  return response.data;
};

const completeGoogleCaptainRegistration = async (
  registrationToken,
  vehicle,
) => {
  const response = await axios.post("/captains/google/completeRegistration", {
    registrationToken,
    vehicle,
  });

  return response.data;
};

const getCaptainProfile = async (token) => {
  const response = await axios.get("/captains/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const logoutCaptain = async (token) => {
  const response = await axios.post(
    "/captains/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export {
  registerCaptain,
  loginCaptain,
  signinCaptainWithGoogle,
  completeGoogleCaptainRegistration,
  getCaptainProfile,
  logoutCaptain,
};
