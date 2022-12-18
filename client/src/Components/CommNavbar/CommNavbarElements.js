import styled from "styled-components";
import { Link } from "react-router-dom";
export const NavbarContainer = styled.div`
  height: 60px;
  @media only screen and (max-width: 380px) {
    height: 50px;
  }
`;

export const WrapperContainer = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 380px) {
    padding: 10px 0px;
  }
`;


export const NavCenter = styled.div`
  flex: 10;
  text-align: center;
  margin-left:12.5rem;
`;

export const NavLogo = styled.h1`
  font-weight: bold;
  @media only screen and (max-width: 380px) {
    font-size: 24px;
  }
`;

export const NavMenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;
export const NavRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const NavMenuLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: black;
  border: 1px solid #fff;
  padding: 12px 34px;
  font-size: 13px;
  background: transparent;
  position: relative;
  cursor: pointer;
  &:hover {
    border: 1px solid #a9740e;
    background: #a9740e;
    transition: 1s;
  }
`;
export const LogoutButton = styled.button`
  display: inline-block;
  text-decoration: none;
  color: black;
  border: 1px solid #fff;
  padding: 12px 34px;
  font-size: 13px;
  background: transparent;
  position: relative;

  cursor: pointer;
  &:hover {
    border: 1px solid #a9740e;
    background: #a9740e;
    transition: 1s;
  }
`;
