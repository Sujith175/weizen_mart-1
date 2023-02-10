import React, { useEffect,useState } from 'react';
import Announcement from '../Announcement';
import "./Orders.css";
import jsPDF from 'jspdf';
import { Link } from "react-router-dom";


const Orders = () => {
  const [data, setData] = useState([]);
  //const [username, setUsername] = useState([]);
useEffect(()=>{
  let userId=JSON.parse(localStorage.getItem('user'));
  
          fetch("http://localhost:5000/checkout/"+userId._id, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          })
              .then((res) => res.json())
              .then((data) => {
                  setData(data.orders);
              })
              .catch((err) => {
                  console.log(err);
              });
    
            
});


  return (
    <>
    <Announcement/>
    <div className='cart-container1'>
    <h2>My Orders</h2>
    
      <div className='titles1'>
      
          <h3 className='product-title1'>Product</h3>
          <h3 className='price1'>Ordered Date</h3>
          <h3 className='quantity1'>Quantity(Kg)</h3>
          <h3 className='total1'>Price(INR)</h3>
          <h3 className='reciept1'>Download Reciept</h3>
          
      </div>
      <div className='cart-items1'>
      {data?.map(cartItems=>(
                <div className='cart-item1' key={cartItems._id}>
                    <div className='cart-product1'>
                   
                        <div>
                        <h3 value={cartItems.productName}>{cartItems.productName}</h3>
                        </div>
                    </div>
                    <div className='cart-product-price1'>{cartItems.createdAt}</div>
                    <div className='cart-product-quantity1'>
                        
                        <div className='count1'>{cartItems.cartQuantity}</div>
                        
                    </div>
                    <div className='cart-product-total-price1'>
                        {cartItems.productPrice}
                    </div>
                    <div className='reciept-dwnload'>
                     <Link className="bttn" to={`/reciept/${cartItems._id}`}> Download 
                    </Link>   
                    </div>
                    </div>
            ))}
        </div>

    </div>
      
  </>
  )
}

export default Orders