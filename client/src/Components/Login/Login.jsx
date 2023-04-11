import React from "react";
import "./Loginelements.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithGooglePopup } from "../../utils/Firebase/firebase.utils";
import { FcGoogle } from "react-icons/fc";
import styled from 'styled-components';
import ReCAPTCHA from "react-google-recaptcha";
import HashLoader from "react-spinners/HashLoader";
import { UserContext } from "../../App";
import { useContext } from "react";
import axios from "axios";


const Login = () => {

  const Error =styled.span`
  color:red;
  padding:5px;
  `;
  const { setEmail, setPage, email, setOTP } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  //const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr,setEmailErr] = useState(false)
  const [pwdErr,setPwdErr] = useState(false)
  const [verified,setVerified] = useState(false);

  function nagigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);

      axios
        .post("http://localhost:5000/send_recovery_email", {
          OTP,
          recipient_email: email,
        })
        .then(() => navigate("/otp"))
        .catch(console.log);
      return;
    }
    return alert("Please enter your email");
  }

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    localStorage.setItem("user", JSON.stringify(response));
    // console.log(response);
    navigate("/home");
  };

  //recaptcha
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerified(true)
  }

  const loginHandler = () => {

    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },10500)

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
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => navigate("/products"), 3000);
        } else if (data.user.usertype === "Farmer") {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          toast.success("SignedIn Successfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => navigate("/farmer"), 4450);
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
    if(email.match(/^(([a-zA-Z][a-zA-Z]{0,20}[a-zA-Z]+[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
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
    <>
    {loading ?
     <div className='loader'>
     <HashLoader 
             color={"#a9740e"}
             loading={loading}
             size={80}
             aria-label="Loading Spinner"
             data-testid="loader"
           />
      <div >Loading...</div>
           </div>
    :
  <div>
    <div className="name">
      <h1 className="weizen">WEIZEN MART</h1>
    </div>
    <div className="login-container">
    
      <div className="login-wrapper">
        <h1 className="login-title">Sign In</h1>
        <div className="login-form">
          <ToastContainer />

          <input
            type="text"
            id="uname"
            className="login-input"
            placeholder="Email ID"
            onChange={(e) => setEmail(e.target.value)}
            onKeyUp={handleEmail}
          />
        {emailErr&&!email.match(/^(([a-zA-Z][a-zA-Z]{0,20}[a-zA-Z]+[^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)?<Error>Please enter a valid email!</Error>:""}

          <input
            type="password"
            id="pwd"
            className="login-input"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={handlePassword}
          />
          {pwdErr&&!password.match(/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/)?<Error>Incorrect Password!</Error>:""}
         
          <ReCAPTCHA
          sitekey="6LcWpuUjAAAAAM-nuoCRnhO18zrWm04iKreSMR5Q"
          onChange={onChange}
          /> 
          
          <button className="login-button" id="btn" onClick={() => loginHandler()} disabled={!verified} >
            Login
          </button>
          
          <Link to="/signup" className="link">
            {" "}
            Don't have an Account?
          </Link>
          <a href="#!" onClick={() => nagigateToOtp()} className="link">
            Forget password?
          </a>
        </div>
      </div>
    </div>
    </div>

}
    </>
  );
};

export default Login;
