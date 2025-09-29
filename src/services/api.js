import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// SignUp API Call
export const signUp = async (userData) => {
  try {
    const response = await API.post("/SignUp", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

// Login API Call
export const login = async (userData) => {
  try {
    const response = await API.post("/Login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

// Get User Data (Protected Route)
export const getUser = async (token) => {
  try {
    const response = await API.get("/Get-Users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Network error" };
  }
};

export default API;
