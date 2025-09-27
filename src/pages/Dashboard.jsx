import React from "react";
import { authService } from "../services/authService";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Welcome, {user?.name || "User"}! 👋</h2>
          <p>You have successfully logged into your account.</p>
          <div className="user-info">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Status:</strong> Authenticated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
