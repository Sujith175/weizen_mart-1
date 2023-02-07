import React, { useEffect,useState } from 'react'
import Announcement from '../Announcement'

const Orders = () => {
  const [data, setData] = useState([]);
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
    <div className='cart-container'>
    <h2>My Orders</h2>
    
      <div className='titles'>
      
          <h3 className='product-title'>Product</h3>
          <h3 className='price'>Ordered Date</h3>
          <h3 className='quantity'>Quantity(Kg)</h3>
          <h3 className='total'>Price(INR)</h3>
          
      </div>
      <div className='cart-items'>
      {data?.map(cartItems=>(
                <div className='cart-item' key={cartItems._id}>
                    <div className='cart-product'>
                   
                        <div>
                        <h3 value={cartItems.productName}>{cartItems.productName}</h3>
                        </div>
                    </div>
                    <div className='cart-product-price'>{cartItems.createdAt}</div>
                    <div className='cart-product-quantity'>
                        
                        <div className='count'>{cartItems.cartQuantity}</div>
                        
                    </div>
                    <div className='cart-product-total-price'>
                        {cartItems.productPrice}
                    </div>
                    </div>
            ))}
        </div>

    </div>
      
  </>
  )
}

export default Orders