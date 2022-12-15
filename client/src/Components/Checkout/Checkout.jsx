import React from "react";
import { useSelector } from 'react-redux';
import { useState,useEffect } from "react";
import "./CheckoutElement.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';



const Checkout = () => {
  const Error =styled.span`
  color:red;
  padding:5px;
  `;
  const cart = useSelector((state)=>state.cart);
  
console.log(cart)
const postData = () => {
   
    fetch("http://localhost:5000/checkout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:user._id,
        firstName:user.firstName,
        email:user.email,
        phone:user.phone,
        address,
        prodId:cartItems._id,
        productName:cart.productName,
        cartQuantity:cart.cartQuantity,
        productPrice:cart.productPrice
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
 
  const [address, setAddress] = useState("");
  const [addressErr,setAddressErr] = useState(false)

  const handleAddress = (e1)=>{
    if(address.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)){
        console.log("Accepted")
    }
   else{
    setAddressErr(true)
   }
}
  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        <h1 className="signup-title">CheckOut Page</h1>
        <div className="signup-form">
          <p>{cart.productName}</p>
          <p className="label">Name</p>
          <input
            className="forminput"
            type="text"
            value={user.firstName}
          />
         <p className="label">Email</p>
          <input
            className="forminput"
            type="email"
            value={user.email}
          />
          <p className="label">Contact</p>
          <input
            className="forminput"
            type="text"
            value={user.phone}
          />
          <p className="label">Enter your Address</p>
          <input
            className="forminput"
            required
            type="text"
            placeholder="Email"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyUp={handleAddress}
          />
        {addressErr&&!address.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)?<Error>Please enter a valid name!</Error>:""}

         <br/>
          <button className="signup-button" onClick={() => postData()}>
            Proceed to Payment
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
