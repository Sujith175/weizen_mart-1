import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import Announcement from "../Announcement";
import Topbar from "./Topbar/Topbar";

const Dashboard = () => {
const user = JSON.parse(localStorage.getItem("user"));
const NavItem = styled(Link)`
display: inline-block;
text-decoration: none;
color: black;
border: 1px solid #fff;
padding: 5px;
font-size: 13px;
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


  return (
    <>
    <Topbar/>
    <Announcement />
    <StyledDashboard>
      <SideNav>
        <h3>Quick Links</h3>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/farmer/addprods"
        >
          Add Products
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/farmer/addedprods"
        >
         All Products
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to={`/farmer/stockrequests/${user._id}`}
        >
          Stock Requests
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to={`/farmer/myprods/${user._id}`}
        >
          My Products
        </NavItem>
       
      </SideNav>
      <Content>
        <Outlet/>
      </Content>
    </StyledDashboard>
    </>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  height: 100vh;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 170px;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }

  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;