import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./stockRequests.scss";
import SendIcon from '@mui/icons-material/Send';
import { CardList } from "../../../UserProducts/ProductElements";
import axios from "axios";

const StockRequests = () => {
  const [data, setData] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:5000/allreqs", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.requests);
      });
  
  }, []);

const sendSms = (values)=>{
 // e.preventDefault();
 toast.success("SMS send to Customer")
  axios.post('http://localhost:5000/send-sms', { to: values.phone,message: values.productName})
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
};

const handleStockClick=(request)=>{

  axios.post('http://localhost:5000/send-sms-farmer', { to: request.postedBy.phone,message: request.productName})
  .then(response => console.log(response.data))
  .catch(error => console.log(error));

  const user = JSON.parse(localStorage.getItem("user"));
  fetch("http://localhost:5000/stockfarmer", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId:request.productId,
      productName:request.productName,
      productPrice:request.productPrice,
      productQuantity:request.productQuantity,
      productState:request.productState,
      postedBy:request.postedBy,
      UserId: request.UserId,
      firstName: request.firstName,
      email: request.email,
      phone: request.phone,
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
        toast.success("Request Send Sucessfully", {
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

}


  return (
    <>
          <table className="stocks">
            {data.map((reqs) => (
              <div>
             <tr>
              <th>Product Name</th>
              <td>{reqs.productName}</td>
             </tr>
             <tr>
              <th>Product State</th>
              <td>{reqs.productState}</td>
             </tr>
             <tr>
              <th>Farmer Name</th>
              <td>{reqs.postedBy.firstName}</td>
             </tr>
             <tr>
              <th>Farmer Phone</th>
              <td>{reqs.postedBy.phone}</td>
             </tr>
             <tr>
              <th>Farmer email</th>
              <td>{reqs.postedBy.email}</td>
             </tr>
             <tr>
              <th>Requested User</th>
              <td>{reqs.firstName}</td>
             </tr>
             <tr>
              <th>User Phone</th>
              <td>{reqs.phone}</td>
             </tr>
             <tr>
              <th>User Email</th>
              <td>{reqs.email}</td>
             </tr>
             <tr>
              <th>Requested Date</th>
              <td>{reqs.createdAt.substring(0,10)}</td>
             </tr>
             <br></br>
          
          <button className="bttn1" onClick={() => handleStockClick(reqs)}>Request Stock to Farmer <SendIcon/></button>
          {reqs.productQuantity>0?<h3 className="stockadded1" style={{fontWeight:"bold"}}>Stock Added</h3>:<h3 className="stocknotadded1" style={{fontWeight:"bold"}}>Stock not added</h3>}         
          {reqs.productQuantity>0?<button className="bttn1" onClick={() => sendSms(reqs)}>Send SMS to Customer</button>:""}        
        
          <hr style={{width:"35rem",borderBlockColor:"gold"}}></hr>
             <br></br>
             
             </div>
            ))}
          </table>
          
    </>
  );
};

export default StockRequests;
