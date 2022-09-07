import React from "react";
import Sidebar from "./src/Components/Sidebar/Sidebar";
import Topbar from "./src/Components/Topbar/Topbar";
import Home from "./src/Pages/Home";

const Admin = () => {
  return (
    <div>
        <Topbar/>
        <div className="container"><Sidebar/>
        <Home/>
        </div>
       </div>
  );
};

export default Admin;
