import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  login: async (email, password) => {
    try {
      console.log("🌐 Sending login request to:", `${API_URL}/LOGIN`);
      console.log("📤 Request payload:", { email, password });

      const response = await api.post("/LOGIN", { email, password });

      console.log("✅ Login response received:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        console.log("🔐 Token stored successfully");
        return response.data;
      } else {
        console.log("❌ No token in response");
        throw new Error("No authentication token received");
      }
    } catch (error) {
      console.error("❌ Login API error:", error);
      if (error.response) {
        console.error("❌ Server response status:", error.response.status);
        console.error("❌ Server response data:", error.response.data);
        throw new Error(
          error.response.data.message ||
            `Login failed (${error.response.status})`
        );
      } else if (error.request) {
        console.error("❌ No response received from server");
        throw new Error(
          "Cannot connect to the server. Please check if the backend is running."
        );
      } else {
        throw new Error("Login failed. Please try again.");
      }
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/SIGNUP", userData);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Registration failed");
      } else {
        throw new Error("Registration failed. Please try again.");
      }
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
