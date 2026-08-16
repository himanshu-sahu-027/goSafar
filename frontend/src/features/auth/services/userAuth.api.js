import axios from "../../../config/axios";

const registerUser = async (userData) => {
    const response = await axios.post("/users/register", userData);
    return response.data;
};

const loginUser = async (credentials) => {
    const response = await axios.post("/users/login", credentials);
    return response.data;
};

const getUserProfile = async (token) => {
    const response = await axios.get("/users/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

const logoutUser = async (token) => {
    const response = await axios.post(
        "/users/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser,
};