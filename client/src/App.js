import { Routes, Route, useNavigate } from "react-router-dom";
import Farmer from "./Components/farmer/Farmer";
import Home from "./Components/home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import { useEffect, createContext, useReducer } from "react";
import { reducer, initialState } from "./Reducers/UserReducer";
import Admin from "./Components/Admin/src/Pages/Fproducts";
import UserList from "./Components/Admin/src/Pages/UserList";
import FarmerNavbar from "./Components/farmer/Navbar/FarmerNavbar";
import Products from "./Components/UserProducts/Products";
import Fproducts from "./Components/Admin/src/Pages/Fproducts";
import UpdateProd from "./Components/Admin/src/Pages/UpdateProd";
import ForgetPwd from "./Components/Admin/src/Pages/ForgetPwd";
import EditProduct from "./Components/Admin/src/Pages/EditProduct";

export const UserContext = createContext();
const App = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user.usertype);
    if (user.usertype === "Customer") {
      dispatch({ type: "USER", payload: user });
      navigate("/home");
    } else if (user.usertype == "Farmer") {
      dispatch({ type: "USER", payload: user });
      navigate("/farmernavbar/farmer");
    } else if (user.usertype === "Admin") {
      dispatch({ type: "USER", payload: user });
      navigate("/admin");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path="/" element={user ? <Navbar /> : <Login />}>
          <Route path="home" element={user ? <Home /> : <Login />} />
          <Route path="products" element={user ? <Products /> : <Login />} />
        </Route>
        <Route
          path="farmernavbar"
          element={user ? <FarmerNavbar /> : <Login />}
        >
          <Route path="farmer" element={user ? <Farmer /> : <Login />} />
        </Route>
        <Route path="admin" element={user ? <Admin /> : <Login />}>
          {/* <Route path="fproducts" element={<Fproducts />} /> */}
        </Route>
        <Route
          path="edit/:id"
          element={user ? <EditProduct /> : <Login />}
        ></Route>
        <Route path="updateprod" element={<UpdateProd />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="users" element={<UserList />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
