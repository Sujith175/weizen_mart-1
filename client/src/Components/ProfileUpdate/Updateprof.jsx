import React from "react";
import { useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import "./Updateprof.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,useParams } from "react-router-dom";



const Updateprof = () => {
  const navigate = useNavigate();
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [phone, setPhone] = useState("");

  let userId=JSON.parse(localStorage.getItem('user'));


const handleClick = () => {

   toast.success("Profile updated")
   navigate("/home");
   fetch("http://localhost:5000/updateprofile/"+userId._id, {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
      }),
    })
      .then((res) => res.json())
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
  
  const user = JSON.parse(localStorage.getItem("user"));
 
  

  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1 className="signup-title">Update Profile</h1>
        <div className="signup-form">
          <p className="label">First Name</p>
          <input
            className="forminput"
            type="text"
            defaultValue={user.firstName}
            onChange={(e) => setFname(e.target.value)}
          />
          <p className="label">Last Name</p>
          <input
            className="forminput"
            type="text"
            defaultValue={user.lastName}
            onChange={(e) => setLname(e.target.value)}
          />
          <p className="label">Contact</p>
          <input
            className="forminput"
            type="text"
            defaultValue={user.phone}
            onChange={(e) => setPhone(e.target.value)}
          />

         <br/>
          <button className="signup-button" onClick={() => handleClick()}>
            Update
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Updateprof;
