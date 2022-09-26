import React, { useContext } from "react";
import "./topbar.css";
import { useNavigate } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { UserContext } from "../../../../../App";

export default function Topbar() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const close = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Weizen Mart Admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>

          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>

          <img
            src="https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?pid=ImgDet&rs=1"
            alt=""
            className="topAvatar"
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            close={close}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose} style={{ height: "15px" }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
