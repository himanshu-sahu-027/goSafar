import axios from "../../../config/axios";

const registerCaptain = async (captainData) => {
  const response = await axios.post("/captains/register", captainData);

  return response.data;
};

const loginCaptain = async (credentials) => {
  const response = await axios.post("/captains/login", credentials);

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

export { registerCaptain, loginCaptain, getCaptainProfile };
