import { Routes, Route, useNavigate } from "react-router-dom";
import Farmer from "./Components/farmer/Farmer";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import { useEffect, createContext, useReducer, useState } from "react";
import { reducer, initialState } from "./Reducers/UserReducer";
import Admin from "./Components/Admin/src/Pages/Fproducts";
import UserList from "./Components/Admin/src/Pages/UserList";
import FarmerNavbar from "./Components/farmer/Navbar/FarmerNavbar";
import Products from "./Components/UserProducts/Products";
import Fproducts from "./Components/Admin/src/Pages/Fproducts";
import UpdateProd from "./Components/Admin/src/Pages/UpdateProd";
import ForgetPswd from "./Components/ForgetPwd/ForgetPswd";
import PswdReset from "./Components/ForgetPwd/PswdReset";
import EditProduct from "./Components/Admin/src/Pages/EditProduct";
import FarmerAddedProds from "./Components/farmer/FarmerAddedProds";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Components/Cart/Cart";
import { getTotals } from "./features/cart/CartSlice";
import CommNavbar from "./Components/CommNavbar/CommNavbar"
import Checkout from "./Components/Checkout/Checkout";
import Updateprof from "./Components/ProfileUpdate/Updateprof";
import Orders from "./Components/Orders/Orders";

export const UserContext = createContext();
const App = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user);
  const location = window.location.href
  useEffect(() => {
    if (user) {
      dispatch({ type: "USER", payload: user });
      if(location.includes('/cart') || location.includes('/products') || location.includes('/checkout') || location.includes('/orders')){
      }else{

        if (user.usertype === "Admin") {
          navigate("/admin");
        } else {
          navigate("/login");
        }
        if (user.usertype === "Farmer") {
          navigate("/farmernavbar/farmer");
        } else {
          navigate("/login");
        }
        if (user.usertype === "Customer") {
          navigate("/home");
        } else {
          navigate("/login");
        }
      }
      } else {
        
      }
  }, []);

store.dispatch(getTotals());

  return (
    <Provider store={store}>
    <UserContext.Provider value={{ state, dispatch }}>
    <ToastContainer/>
      <Routes>
        <Route path="/" element={user ? <Navbar /> : <Home />}>
          <Route path="home" element={user ? <Home /> : <Login />} />
          <Route path="products" element={user ? <Products /> : <Login />} />
          <Route path="cart" element={user ? <Cart/> : <Login />} />
          <Route path="orders" element={user ? <Orders/> : <Login />} />
        </Route>

        <Route path="/" element={user ? <CommNavbar/>:<Login/>}>
          <Route path="updateprof/:id" element={user ? <Updateprof/> : <Login />} />
        </Route>

        <Route
          path="farmernavbar"
          element={user ? <FarmerNavbar /> : <Login />}
        >
          
          <Route path="addedprods" element={user ? <FarmerAddedProds/> : <Login />} />
          <Route path="farmer" element={user ? <Farmer/> : <Login />} />
          {/* <Route path="addproducts" element={user ? < /> : <Login />} />  */}
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
        <Route path="pwd-reset" element={<PswdReset/>}/>
        <Route path="forget-pass" element={<ForgetPswd/>}/>
        <Route path="checkout" element={user ? <Checkout/> : <Login />} />
      </Routes>
    </UserContext.Provider>
    </Provider>
  );
};

export default App;
