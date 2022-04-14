import React from "react";
import Menu from "../../UI/Menu/Menu";
import AdminPanelDashboard from "../../components/AdminPanelDashboard/AdminPanelDashboard";

const AdminPanel = () => {
  return (
    <Menu head="Админ панель">
      <AdminPanelDashboard />
    </Menu>
  );
};

export default AdminPanel;
