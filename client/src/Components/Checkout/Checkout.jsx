import React from "react";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import "./CheckoutElement.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import CommNavbar from "../CommNavbar/CommNavbar"

const Checkout = () => {

    const Button = styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer;
    margin-right:6rem;
    margin-bottom:48rem;
    `;

  const Error = styled.span`
  color:red;
  padding:5px;
  `;
    let userId=JSON.parse(localStorage.getItem('user'));
    // const [data, setData] = useState([]);
    // const [productPrice, setProductPrice] = useState([]);

    let cart=[];

            fetch("http://localhost:5000/checkoutlist/"+userId._id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    cart=data.cart;
                })
                .catch((err) => {
                    console.log(err);
                });
    const user = JSON.parse(localStorage.getItem("user"));
    const subtotal = localStorage.getItem("subtotal");
    const [address, setAddress] = useState("");
    const [addressErr, setAddressErr] = useState(false);
    const [locality, setLocality] = useState("");
    const [localityErr, setLocalityErr] = useState(false);
    const [pincode, setPincode] = useState("");
    const [pincodeErr, setPincodeErr] = useState(false);
    const [city, setCity] = useState("");
    const [cityErr, setCityErr] = useState(false);
    const [State,setState] = useState("");
    const [landmark, setLandmark] = useState("");
    const [landmarkErr, setLandmarkErr] = useState(false);
    const navigate = useNavigate();
    let values=[];
    for(let i=0;i<cart.length;i++){
    let value = {
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        phone: user.phone,
        address: address,
        prodId: cart[i]._id,
        productName: cart[i].productName,
        cartQuantity: cart[i].cartQuantity,
        productPrice: cart[i].productPrice,
        
    }
    
    values.push(value);
}
const onHomeClick=()=>{
    navigate("/products");
  }

  const handleState = (e1)=>{
    if(State.match("")){
        console.log("Not Accepted")
    }
//    else{
//     setstateErr(true)
//    }
}
    const postData = (e) => {

        // if (" ".test(State)) {
        //     toast.error("Invalid Email ID");
        //     return;
        //   }
      e.preventDefault();
        if (!/(^[a-zA-Z][a-zA-Z\s]{0,100}[a-zA-Z]$)/.test(address)) {
            toast.error("Invalid Address");
            return;
          }
        if (!/(^[a-zA-Z][a-zA-Z\s]{0,100}[a-zA-Z]$)/.test(locality)) {
            toast.error("Invalid Locality");
            return;
          }
        if (!/^\d{4}$|^\d{6}$/.test(pincode)) {
            toast.error("Invalid Pincode");
            return;
          }
        if (!/(^[a-zA-Z][a-zA-Z\s]{0,100}[a-zA-Z]$)/.test(city)) {
            toast.error("Invalid City");
            return;
          }
       

        // fetch("http://localhost:5000/getcartdetails/"+userId._id, {
        //     method: "get",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     }).then((response) => response.json())
        //     .then((result) => {
        //       console.log(result, "result")
        //       setData(result.cart);
        //       let total=0;
        //       result.cart.forEach(element => {
        //         //setPhoto(element.photo);
        //         //total=total+(element.productPrice*element.cartQuantity)
        //         setProductPrice(element.productPrice);
        //       })
        //       });

       var options = {
        key:"rzp_test_T4qIUo1QAdXGT9",
        key_secret:"avsueVgqVIdZiaJm1q7x2lsn",
        amount:subtotal*100,
        currency:"INR",
        name:"WEIZEN MART",
        description:"for test purpose",
        handler:function(response){
            console.log(response.razorpay_payment_id);

            let userid=JSON.parse(localStorage.getItem('user'));
            fetch("http://localhost:5000/checkout", {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                },
                body:JSON.stringify({
                  userId:userid._id,
                  address:{
                    firstName: userId.firstName,
                    lastName: userId.lastName,
                    email: userId.email,
                    phone: userId.phone,
                    address:address,
                    locality:locality,
                    pincode:pincode,
                    city:city,
                    State:State,
                    landmark:landmark,
                  },
                
                 
                 subtotal:subtotal,
                // photo:photo
                })
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.error) {
                    console.log(data.error);
                  } 
                })
                .catch((err) => {
                  console.log(err);
                });
                //toast.success("Order Placed Successfully")
    
            toast.success("Payment successfull")
            navigate("/products")
        },
        prefill:{
            name:user.firstName,
            email:user.email,
            contact:user.phone,
        },
        notes:{
            address:"Razorpay Corporate Office"
        },
       };
        var pay = new window.Razorpay(options);
        pay.open();
    };



    const handleAddress = (e1) => {
        e1.preventDefault()
        if (address.match(/(^[a-zA-Z][a-zA-Z\s]{0,100}[a-zA-Z]$)/)) {
            console.log("Accepted")
        }
        else {
            setAddressErr(true)
        }
    }
    const handlePincode = (e1) => {
        e1.preventDefault()
        if (pincode.match(/^\d{4}$|^\d{6}$/)) {
            console.log("Accepted")
        }
        else {
            setPincodeErr(true)
        }
    }
    const handleLocality = (e1) => {
        e1.preventDefault()
        if (locality.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)) {
            console.log("Accepted")
        }
        else {
            setLocalityErr(true)
        }
    }
    const handleLandmark = (e1) => {
        e1.preventDefault()
        if (landmark.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)) {
            console.log("Accepted")
        }
        else {
            setLandmarkErr(true)
        }
    }
    const handleCity = (e1) => {
        e1.preventDefault()
        if (city.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)) {
            console.log("Accepted")
        }
        else {
            setCityErr(true)
        }
    }
    return (
        <>
         <CommNavbar/>
        <div className="checkout-container">
            <div>
        <Button onClick={onHomeClick}>Home</Button></div>
            <div className="checkout-wrapper">
                <h1 className="checkout-title">CheckOut Page</h1>
                <form>
                <div className="checkout-form">
                    <p className="label">First Name</p>
                    <input
                        className="forminput"
                        type="text"
                        value={user.firstName}
                    />
                    <p className="label">Last Name</p>
                    <input
                        className="forminput"
                        type="text"
                        value={user.lastName}
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
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onKeyUp={handleAddress}
                    />
                    {addressErr && !address.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/) ? <Error>Please enter a valid address!</Error> : ""}
                    <p className="label">Enter your Locality</p>
                    <input
                        className="forminput"
                        required
                        type="text"
                        placeholder="Locality"
                        onChange={(e) => setLocality(e.target.value)}
                        onKeyUp={handleLocality}
                    />
                    {localityErr && !locality.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/) ? <Error>Please enter a valid locality!</Error> : ""}

                     <p className="label">Enter your Pincode</p>
                    <input
                        className="forminput"
                        required
                        type="number"
                        placeholder="Pincode"
                        onChange={(e) => setPincode(e.target.value)}
                        onKeyUp={handlePincode}
                    />
                    {pincodeErr && !pincode.match(/^\d{4}$|^\d{6}$/) ? <Error>Please enter a valid pincode!</Error> : ""}

                     <p className="label">Enter your City/Town</p>
                    <input
                        className="forminput"
                        required
                        type="text"
                        placeholder="City/Town"
                        onChange={(e) => setCity(e.target.value)}
                        onKeyUp={handleCity}
                    />
                    {cityErr && !city.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/) ? <Error>Please enter a valid city!</Error> : ""}
                     <p className="label">Enter your State</p> <br></br>
                    <select style={{height:30}} onChange={(e) => setState(e.target.value)} 
                    required
                  
                    >
                    <option defaultValue={true}   value={State}>
                    Select State
                  </option>
                    <option>UP</option>
                    <option>Bihar</option>
                    <option>Punjab</option>
                    <option>Kerala</option>
                    <option>Tamil Nadu</option>
                    <option>Karnataka</option>
                    <option>Maharashtra</option>
                    <option>Andhra Pradesh</option>
                    <option>Telengana</option>
                    </select>
                    
                     <p className="label">Enter your Landmark(optional)</p>
                     <input
                        className="forminput"
                        type="text"
                        placeholder="Landmark"
                        onChange={(e) => setLandmark(e.target.value)}
                        onKeyUp={handleLandmark}
                    />
                    {landmarkErr && !landmark.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/) ? <Error>Please enter a valid landmark!</Error> : ""}

                    <br />
                    <button className="signup-button" onClick={(e) => postData(e)}>
                        Proceed to Payment
                    </button>
                    <ToastContainer />
                </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default Checkout;