import React from "react";
import { useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import "./Updateprof.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate,useParams } from "react-router-dom";
import axios from 'axios';



const Updateprof = () => {
  const navigate = useNavigate();
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const[data,setData] = useState("");

  let userId=JSON.parse(localStorage.getItem('user'));
  const { id } = useParams("");

  useEffect(()=>{
    fetch(`http://localhost:5000/customer/${id}`, {
      method:"GET",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("jwt"),
  },
})
  .then(response => response.json())
  .then(result => {
    console.log('Fetched document data:', result);
    setData(result);
  })
  .catch(error => console.error('Error fetching document data:', error));
},[]);

const handleClick = async(e) => {
  e.preventDefault();
 
    try {
      await axios.put(`/updateprofile/${id}`, { firstName,lastName, phone });
      alert('Profile updated successfully');
      navigate("/products")
    } catch (error) {
      console.error(error);
      alert('Failed to update profile');
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
            value={data.firstName}
            //defaultValue={userId.firstName}
            placeholder={data.firstName}
            onChange={(e) => setFname(e.target.value)}
          />
          <p className="label">Last Name</p>
          <input
            className="forminput"
            type="text"
            //defaultValue={userId.lastName}
            // default={user.lastName}
            value={lastName}
            onChange={(e) => setLname(e.target.value)}
          />
          <p className="label">Contact</p>
          <input
            className="forminput"
            type="text"
            //defaultValue={userId.phone}
            // default={user.phone}
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
