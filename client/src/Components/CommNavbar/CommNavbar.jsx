import React, { useContext } from "react";
import "./CommNavbar.scss";
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
} from "./CommNavbarElements";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import Announcement from "../Announcement";

const Label = styled.span``;

const CommNavbar = () => {
	const cart = useAppSelector((state) => state.cart);
	const { state, dispatch } = useContext(UserContext);
	const navigate = useNavigate();
	const user = JSON.parse(localStorage.getItem("user"));

	const updateProfile = ()=>{
		toast.success("Please Update your Profile");
		navigate("/updateprof");
	}

	return (
		<>
			<NavbarContainer>
				<WrapperContainer>
					<NavCenter>
						<NavLogo>WEIZEN MART</NavLogo>
					</NavCenter>
					<NavRight>
 					<NavMenuItem>
            		<BiUserCircle style={{ color: "#a9740e", fontSize: "20px" }} onClick={updateProfile}/>
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
					</NavRight>
				</WrapperContainer>
			</NavbarContainer>
			<Announcement/>
			<Outlet />
		</>
	);
};

export default CommNavbar;
