import React from "react";
import "./Loginelements.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithGooglePopup } from "../../utils/Firebase/firebase.utils";
import { FcGoogle } from "react-icons/fc";
import styled from 'styled-components';

const Login = () => {

  const Error =styled.span`
  color:red;
  padding:5px;
  `;

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr,setEmailErr] = useState(false)
  const [pwdErr,setPwdErr] = useState(false)

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    localStorage.setItem("user", JSON.stringify(response));
    // console.log(response);
    navigate("/home");
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
          setTimeout(() => navigate("/home"), 4450);
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
          setTimeout(() => navigate("/farmernavbar/farmer"), 4450);
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
          setTimeout(() => navigate("/admin"), 4450);
        } else {
          console.log("error");
        }
      });
  };
  const handleEmail = (e1)=>{
    if(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
        console.log("Accepted")
    }
   else{
    setEmailErr(true)
   }
}

const handlePassword = (e1)=>{
  if(password.match(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/)){
      console.log("Accepted")
  }
 else{
  setPwdErr(true)
 }
}

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
            onKeyUp={handleEmail}
          />
        {emailErr&&!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?<Error>Please enter a valid email!</Error>:""}

          <input
            type="password"
            className="login-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={handlePassword}
          />
          {pwdErr&&!password.match(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/)?<Error>Incorrect Password!</Error>:""}
          <button className="login-button" onClick={() => loginHandler()}>
            Login
          </button>
          
          
          <Link to="/signup" className="link">
            {" "}
            Don't have an Account?
          </Link>
          <Link to="/forgetpassword" className="link">
            Forget password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
