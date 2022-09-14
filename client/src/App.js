import { Routes, Route, useNavigate } from "react-router-dom";
import Farmer from "./Components/farmer/Farmer";
import Home from "./Components/home/Home";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Signup from "./Components/Signup/Signup";
import { useEffect, createContext, useReducer } from "react";
import { reducer, initialState } from "./Reducers/UserReducer";
import Admin from "./Components/Admin/Admin";
import UserList from "./Components/Admin/src/Pages/UserList";
import FarmerNavbar from "./Components/farmer/Navbar/FarmerNavbar";

export const UserContext = createContext();
const App = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Routes>
        <Route path="/" element={user ? <Navbar /> : <Login />}>
          <Route path="home" element={user ? <Home /> : <Login />} />
          <Route path="farmer" element={user ? <Farmer /> : <Login />} />
        </Route>
        <Route path="farmernavbar" element={<FarmerNavbar />}>
          <Route path="farmer" element={user ? <Farmer /> : <Login />} />
        </Route>
        <Route path="admin" element={<Admin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="users" element={<UserList />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
