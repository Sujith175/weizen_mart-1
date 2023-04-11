import React,{ useContext } from "react";
import "./topbar.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../App";
import styled from "styled-components";


export default function Topbar() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

const NavMenu = styled.div`
  display: inline-block;
text-decoration: none;
color: black;
border: 1px solid #fff;
padding: 5px;
font-size: 17px;
font-family:Aerial;
font-weight:bold;
background: transparent;
position: relative;
cursor: pointer;
&:hover {
  border: 1px solid #a9740e;
  background: #a9740e;
  transition: 1s;
}
`;

  const handleClick = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/login");
  };

  const display=()=>{
    window.location.href = 'http://localhost:3001';
  }

  const logoClick = () =>{
    navigate("/farmer")
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo" onClick={logoClick}>Weizen Mart Farmer</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div> */}
          <NavMenu style={{marginRight:"5rem"}} onClick={display}>Crop or Fertilizer Prediction</NavMenu>
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
