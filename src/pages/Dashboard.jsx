import React, { useEffect, useState } from "react";
import { getUser } from "../services/api";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else if (token) {
      fetchUserData(token);
    } else {
      window.location.href = "/";
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await getUser(token);
      setUser(response.user);
    } catch (error) {
      console.error("Error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (loading) {
    return <div className="loading-container">Loading...</div>;
  }

  const FriendMode = () => {
    document.getElementById(
      "FriendChat"
    ).innerHTML = `Hello, ${user?.name} How it's going on?`;
  };

  return (
    <div className="Dashboard-Head">
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="welcome-text" id="FriendChat">
              Welcome, {user?.name}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="user-info-card">
          <h3 className="card-title">User Information</h3>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <div className="info-value">{user?.name}</div>
            </div>

            <div className="info-item">
              <span className="info-label">Email:</span>
              <div className="info-value">{user?.email}</div>
            </div>

            <div className="info-item">
              <span className="info-label">User ID:</span>
              <div className="info-value user-id">{user?.id}</div>
            </div>
            <div>
              <button className="FriedMode" type="button" onClick={FriendMode}>
                Friend Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
