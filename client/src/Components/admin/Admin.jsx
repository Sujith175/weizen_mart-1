import React from "react";
import Sidebar from "./src/Components/Sidebar/Sidebar";
import Topbar from "./src/Components/Topbar/Topbar";
import AdminHome from "./src/Pages/AdminHome";

const Admin = () => {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <AdminHome />
      </div>
    </div>
  );
};

export default Admin;
