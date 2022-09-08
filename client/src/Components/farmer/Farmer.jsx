import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";

const Admin = () => {
  return (
    <div>
        <Topbar/>
        <div className="container"><Sidebar/>
        </div>
       </div>
  );
};

export default Admin;
