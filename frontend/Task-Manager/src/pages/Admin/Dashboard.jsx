import React, { useContext } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../components/layouts/DashboardLayout"; // ✅ Import added

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);

  return (
    <DashboardLayout>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name || "Admin"}!</p>
    </DashboardLayout>
  );
};

export default Dashboard;
