import React, { useContext } from "react";
import "./NavbarElements.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../../App";
import { Badge } from '@mui/material';
import { useCart } from "../Cart/Cart";

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
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const items = useCart();

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
              <LogoutButton
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "CLEAR" });
                  navigate("/login");
                }}
              >
                Logout
              </LogoutButton>
            </NavMenuItem>
            <NavMenuItem>
            
            <Badge color="primary" >
            <ShoppingCartOutlinedIcon/>
            </Badge>
            
            </NavMenuItem>
          </NavRight>
        </WrapperContainer>
      </NavbarContainer>
      <Outlet />
    </>
  );
};

export default Navbar;