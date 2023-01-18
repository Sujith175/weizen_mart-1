import React from "react";
import Sidebar from "./src/Components/Sidebar/Sidebar";
import Topbar from "./src/Components/Topbar/Topbar";

import Fproducts from "./src/Pages/Fproducts";

const Admin = () => {
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Fproducts />
      </div>
    </div>
  );
};

export default Admin;
