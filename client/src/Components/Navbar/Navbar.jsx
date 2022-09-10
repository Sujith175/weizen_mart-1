import React, { useContext } from "react";
import "./NavbarElements.scss";
import { Link, Outlet } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  NavbarContainer,
  NavbarLanguage,
  NavLogo,
  NavMenuItem,
  NavMenuLink,
  NavRight,
  NavSearchContainer,
  NavSearchInput,
  WrapperContainer,
  NavCenter,
  NavbarLeft,
  LogoutButton,
} from "./NavbarElements";
const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <WrapperContainer>
          <NavbarLeft>
            <NavbarLanguage>EN</NavbarLanguage>
            <NavSearchContainer>
              <NavSearchInput />
              <SearchIcon style={{ color: "grey", fontSize: "16px" }} />
            </NavSearchContainer>
          </NavbarLeft>
          <NavCenter>
            <NavLogo>WEIZEN MART</NavLogo>
          </NavCenter>
          <NavRight>
            <NavMenuItem>
              <NavMenuLink to="/signup">Register</NavMenuLink>
            </NavMenuItem>
            <NavMenuItem>
              <NavMenuLink to="/login">Login</NavMenuLink>
            </NavMenuItem>
            <NavMenuItem>
              <LogoutButton>Logout</LogoutButton>
            </NavMenuItem>
          </NavRight>
        </WrapperContainer>
      </NavbarContainer>
      <Outlet />
    </>
  );
};

export default Navbar;
