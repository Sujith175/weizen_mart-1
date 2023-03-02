import React from "react";
import { useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import "./Updateprof.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,useParams } from "react-router-dom";
import { async } from "@firebase/util";



const Updateprof = () => {
  const navigate = useNavigate();
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [phone, setPhone] = useState("");

  let userId=JSON.parse(localStorage.getItem('user'));
  const { id } = useParams("");


const handleClick = async(e) => {
  e.preventDefault();
 const res = await  fetch(`http://localhost:5000/updateprofile/${id}`, {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName:firstName,
        lastName:lastName,
        phone:phone,
      }),
    })
      const data = await res.json();
      console.log("res===============",res)
      if (res.status === 422 || data) {
        alert("profile Updated SuccessFully");
        navigate("/products");
      } else {
        alert("data updated successfully");
      }
  };
  
  //const user = JSON.parse(localStorage.getItem("user"));
 
  

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1 className="signup-title">Update Profile</h1>
        <div className="signup-form">
          <p className="label">First Name</p>
          <input
            className="forminput"
            type="text"
            value={firstName}
            //defaultValue={userId.firstName}
            placeholder={userId.firstName}
            onChange={(e) => setFname(e.target.value)}
          />
          <p className="label">Last Name</p>
          <input
            className="forminput"
            type="text"
            //defaultValue={userId.lastName}
            placeholder={userId.lastName}
            value={lastName}
            onChange={(e) => setLname(e.target.value)}
          />
          <p className="label">Contact</p>
          <input
            className="forminput"
            type="text"
            //defaultValue={userId.phone}
            placeholder={userId.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

         <br/>
          <button className="signup-button" onClick={(e) => handleClick(e)}>
            Update
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Updateprof;
