import React from "react";
import "./Loginelements.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithGooglePopup } from "../../utils/Firebase/firebase.utils";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    localStorage.setItem("user", JSON.stringify(response));
    // console.log(response);
    navigate("/");
  };
  const loginHandler = () => {
    fetch("http://localhost:5000/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else if (data.user.usertype === "Customer") {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("SignedIn Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => navigate("/"), 6000);
        } else if (data.user.usertype === "Farmer") {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("SignedIn Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => navigate("/farmer"), 6000);
        } else if (data.user.usertype === "Admin") {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("SignedIn Succesfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => navigate("/admin"), 6000);
        } else {
          console.log("error");
        }
      });
  };
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-title">Sign In</h1>
        <div className="login-form">
          <ToastContainer />

          <input
            type="text"
            className="login-input"
            placeholder="Email ID"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login-button" onClick={() => loginHandler()}>
            Login
          </button>
          <button className="google-button" onClick={logGoogleUser}>
            <FcGoogle style={{ marginRight: "10%" }} />
            Signin With Google
          </button>
          <Link to="/forgotpassword" className="link">
            Forgot Password
          </Link>
          <Link to="/signup" className="link">
            {" "}
            Don't have an Account?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
