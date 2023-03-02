import React, { useContext } from "react";
import "./topbar.css";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { UserContext } from "../../../../../App";

export default function Topbar() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/login");
  };

  const logoClick = () =>{
    navigate("/admin");
  }
  return (
    
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo" onClick={logoClick}>Weizen Mart Admin</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div> */}
          {/* <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>

          <div className="topbarIconContainer">
            <SettingsIcon />
          </div> */}
          <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
        <React.Fragment>
          <img variant="contained" {...bindTrigger(popupState)}
            src="https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?pid=ImgDet&rs=1"
            alt=""
            className="topAvatar"
          />
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={handleClick} style={{ height: "15px" }}>Logout</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
        </div>
      </div>
    </div>
    
  );
}
