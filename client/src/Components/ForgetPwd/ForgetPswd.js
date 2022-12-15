import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgetPswd.css';
import { ToastContainer, toast } from "react-toastify";


const ForgetPswd = () => {
  const otp = useState("");
  const password = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    fetch("http://localhost:5000/submitotp", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        password,
      }),
    }) .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.error) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => navigate("/login"), 6000);
      }
    })
  .catch((err) => {
    console.log(err);
  });
  };
  return (
    <>
    <h1 className="center">  FORGET PASSWORD </h1>

<div className="outcard">
    OTP
    <input
    value={otp}
        style={{ marginBottom: '15px' }}
        onChange={(e) => {
            
        }}
        className="inputs"
        type="text"
    />
    New Password
    <input
    value={password}
        style={{ marginBottom: '20px' }}
        className="inputs"
        type="text"
    />
    <button
       onClick={handleSubmit}
        className="btns"> CHANGE PASSWORD </button>
</div>
</>
  )
}

export default ForgetPswd