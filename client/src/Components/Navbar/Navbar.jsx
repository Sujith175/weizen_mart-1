import React from "react";
import "./NavbarElements.scss";
import { Link, Outlet } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <div className="left">
          <span className="language">EN</span>
          <div className="search-container">
            <input type="search" className="search-input" />
            <SearchIcon style={{color:'grey',fontSize:'16px'}}/>
          </div>
        </div>
        <div className="center">
          <h1 className="logo">WEIZEN MART</h1>
        </div>
        <div className="right">
          <div className="menuitem">
            <Link to="/signup" className="menu-link">
              Register
            </Link>
          </div>
          <div className="menuitem">
            <Link to="/login" className="menu-link">
              Login
            </Link>
          </div>
          <div className="menuitem">
            <button>Logout</button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
