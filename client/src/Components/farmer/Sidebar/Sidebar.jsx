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
              <Link style={{textDecoration:'none',color:"black"}} to="addedprods">Home</Link>
            </li>
            <li className="sidebarListItem" >
              <LineStyleIcon className="sidebarIcon" />
              <Link style={{textDecoration:'none',color:"black"}} to="farmer">Add Products</Link>
            </li>
            <li className="sidebarListItem" >
              <LineStyleIcon className="sidebarIcon" />
              <Link style={{textDecoration:'none',color:"black"}} to="">Notification of stock</Link>
            </li>
            <li className="sidebarListItem" >
              <LineStyleIcon className="sidebarIcon" />
              <Link style={{textDecoration:'none',color:"black"}} to="">Update stock </Link>
            </li>
            <li className="sidebarListItem" >
              <LineStyleIcon className="sidebarIcon" />
              
              <Link style={{textDecoration:'none',color:"black"}} to="showstock">Show existing stock</Link>
            </li>
            <li className="sidebarListItem" >
              <LineStyleIcon className="sidebarIcon" />
              <Link style={{textDecoration:'none',color:"black"}} to="">Payment Details</Link>
            </li>
           
          </ul>
        </div>
      </div>
    </div>
  );
}