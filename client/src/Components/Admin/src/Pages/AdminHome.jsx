import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import Topbar from "../Components/Topbar/Topbar";


const Dashboard = () => {
  
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


  const Container = styled.div`
  height: 25px;
  width:84.3rem;
  background-color: #a9740e;   
  align-items:center;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:14px;
  font-weight:500;
  `;
//  const auth = useSelector((state) => state.auth);
//  if (!auth.isAdmin) return <p>Access denied. Not an Admin!</p>;

  return (
    <>
    <Topbar/>
    <Container/>
    <StyledDashboard>
      <SideNav>
        <h3>Quick Links</h3>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/fproducts"
        >
          Validate Products
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/allprods"
        >
          All Products
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/stockreqs"
        >
          Stock Requests
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/farmers"
        >
          Farmers
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/customers"
        >
          Customers
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/analytics"
        >
          Data Visualization
        </NavItem>
        <NavItem
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/income"
        >
          Income Analytics
        </NavItem>
      </SideNav>
      <Content>
        <Outlet />
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
  width: 190px;
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
  font-weight:1000px;
`;