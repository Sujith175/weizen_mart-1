import "./sidebar.css";
import React from "react";
import LineStyleIcon from '@mui/icons-material/LineStyle';
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
           
            <li className="sidebarListItem" >
              <LineStyleIcon className="sidebarIcon" />
              <Link style={{textDecoration:'none',color:"black"}} to="/admin">Home</Link>
            </li>
            <li className="sidebarListItem" >
              <LineStyleIcon className="sidebarIcon" />
              <Link style={{textDecoration:'none',color:"black"}} to="/fproducts">Products</Link>
            </li>
            
          </ul>
        </div>
        
        
        
      </div>
    </div>
  );
}