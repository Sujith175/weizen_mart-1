import React, { useContext } from "react";
import "./NavbarElements.scss";
import { Outlet, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../../App";
import { BiUserCircle } from "react-icons/bi";
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
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const renderList = () => {
    if (state) {
      return [
        <>
          <NavMenuItem>
            <NavMenuLink to="/signup">Register</NavMenuLink>
          </NavMenuItem>
          <NavMenuItem>
            <NavMenuLink to="/login">Login</NavMenuLink>
          </NavMenuItem>
        </>,
      ];
    } else {
      return [
        <>
          <NavMenuItem>
            <NavMenuLink to="/products">Products</NavMenuLink>
          </NavMenuItem>
          <NavMenuItem>
            <NavMenuLink to="/cart">cart</NavMenuLink>
          </NavMenuItem>
          <NavMenuItem>
            <BiUserCircle style={{ color: "#a9740e", fontSize: "20px" }} />
            {user.email ? (
              <p style={{ color: "#a9740e" }}>{user.email}</p>
            ) : (
              <p style={{ color: "#a9740e" }}>{user.user.email}</p>
            )}
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
        </>,
      ];
    }
  };
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
          <NavRight>{renderList()}</NavRight>
        </WrapperContainer>
      </NavbarContainer>
      <Outlet />
    </>
  );
};

export default Navbar;
