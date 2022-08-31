import React from "react";
import "./Loginelements.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          alert(data.error);
        } else if (data.user.usertype === "Customer") {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("SignedIn Successfully");
          navigate("/");
        } else if (data.user.usertype === "Farmer") {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("SignedIn Successfully");
          navigate("/farmer");
        } else if (data.user.usertype === "Admin") {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          alert("SignedIn Successfully");
          navigate("/admin");
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
