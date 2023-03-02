import { Routes, Route, useNavigate } from "react-router-dom";
import Farmer from "./Components/farmer/Farmer";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import { useEffect, createContext, useReducer } from "react";
import { reducer, initialState } from "./Reducers/UserReducer";
import UserList from "./Components/Admin/src/Pages/UserList";
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
import AdminHome from "./Components/Admin/src/Pages/AdminHome";
import StockRequests from "./Components/Admin/src/Pages/StockRequests";
import FarmerHome from "../src/Components/farmer/FarmerHome";
import StockReqs from "./Components/farmer/StockReqs";
import EditQuantity from "./Components/farmer/EditQuantity";
import Reciept from "./Components/Orders/Reciept";
import Farmers from "./Components/Admin/src/Pages/Farmers";
import Customers from "./Components/Admin/src/Pages/Customers";
import Example from "./Components/Admin/src/Pages/Analytics";
import { CropPage } from "./Components/farmer/crops/CropPage";
import { CropResult } from "./Components/farmer/result/CropResult";
import { FertilizerPage } from "./Components/farmer/fertilizers/FertilizerPage";
import { FertilizerResult } from "./Components/farmer/result/FertilizerResult";

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
      if(location.includes('/cart') || location.includes('/products') || location.includes('/checkout') || location.includes('/orders')
      || location.includes('/admin')|| location.includes('/farmer')
      ){
      }else{

        if (user.usertype === "Admin") {
          navigate("/admin");
        } 
        // else {
        //   navigate("/login");
        // }
        if (user.usertype === "Farmer") {
          navigate("/farmer");
        } 
        // else {
        //   navigate("/login");
        // }
        if (user.usertype === "Customer") {
          navigate("/home");
        }
        //  else {
        //   navigate("/login");
        // }
      }
      } else {
        navigate("/login");
      }
  }, []);

store.dispatch(getTotals());

  return (
    <Provider store={store}>
    <UserContext.Provider value={{ state, dispatch }}>
    <ToastContainer/>
      <Routes>
      <Route path="/" element={user?.usertype === 'Customer' || user?.usertype === 'Farmer' ? <Navbar /> : <Home />}>
          <Route path="home" element={user ? <Home /> : <Login />} />
          <Route path="products" element={user ? <Products /> : <Login />} />
          <Route path="cart" element={user ? <Cart/> : <Login />} />
          <Route path="orders/:id" element={user ? <Orders/> : <Login />} />
        </Route>

        <Route path="/" element={user ? <CommNavbar/>:<Login/>}>
          <Route path="updateprof/:id" element={user ? <Updateprof/> : <Login />} />
        </Route>

        {/* <Route
          path="farmernavbar"
          element={user ? <FarmerNavbar /> : <Login />}
        > */}
          
          <Route path="farmer" element={user ? <FarmerHome/> : <Login />} >
          <Route path="addprods" element={user ? < Farmer/> : <Login />} />  
          <Route path="addedprods" element={user ? <FarmerAddedProds/> : <Login />} />
          <Route path="stockrequests/:id" element={user?<StockReqs />:<Login />} />
          <Route path="crops" element={user?<CropPage/>:<Login />} />
          <Route path="fertilizers" element={user?<FertilizerPage/>:<Login />} />
          <Route path="crop_result" element={user?<CropResult/>:<Login />} />
          <Route path="fertilizer_result" element={user?<FertilizerResult/>:<Login />} />
          
        </Route>
        <Route path="admin" element={user ? <AdminHome/> : <Login />}>
          <Route path="fproducts" element={user?<Fproducts />:<Login />} /> 
          <Route path="addedprods" element={user ? <FarmerAddedProds/> : <Login />} />
          <Route path="stockreqs" element={user ? <StockRequests />:<Login />} /> 
          <Route path="farmers" element={user?<Farmers/>:<Login />} /> 
          <Route path="customers" element={user?<Customers/>:<Login />} /> 
          <Route path="analytics" element={user?<Example/>:<Login />} /> 
        </Route>
        <Route
          path="edit/:id"
          element={user ? <EditProduct /> : <Login />}
        ></Route>
        <Route
          path="editquantity/:id"
          element={user ? <EditQuantity /> : <Login />}
        ></Route>
        <Route
          path="reciept/:id"
          element={user ? <Reciept/> : <Login />}
        ></Route>
        <Route path="updateprod" element={<UpdateProd />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="users" element={<UserList />} />
        <Route path="pwd-reset" element={<PswdReset/>}/>
        <Route path="forget-pass" element={<ForgetPswd/>}/>
        <Route path="checkout/:id" element={user ? <Checkout/> : <Login />} />
      </Routes>
    </UserContext.Provider>
    </Provider>
  );
};

export default App;
