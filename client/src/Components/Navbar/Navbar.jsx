import React, { useContext } from "react";
import "./NavbarElements.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../../App";
import { Badge } from "@mui/material";

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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";

const Label = styled.span``;

const Navbar = () => {
	const cart = useAppSelector((state) => state.cart);
	const { state, dispatch } = useContext(UserContext);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));

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
            		<BiUserCircle style={{ color: "#a9740e", fontSize: "20px" }} />
            			{user.email ? (
              		<p style={{ color: "#a9740e" }}>{user.firstName}</p>
            			) : (
              		<p style={{ color: "#a9740e" }}>{user.user.firstName}</p>
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
						<NavMenuItem>
							<Link to="cart" style={{color:"black"}}>
								<ShoppingCartOutlinedIcon />
								<Label  className="nav-cart">
								{cart.cartItems.length}
							</Label>
							</Link>
						</NavMenuItem>
					</NavRight>
				</WrapperContainer>
			</NavbarContainer>
			<Outlet />
		</>
	);
};

export default Navbar;
