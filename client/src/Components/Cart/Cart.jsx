import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Cart.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Cart = () => {
    const cart = useSelector((state)=>state.cart);
  return (
    <div className='cart-container'>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0?(
        <div className='cart-empty'>
            <p>Your cart is currently empty</p>
            <div className='start-shopping'>
                <Link to="/products" style={{color:"black"}}>
                    <ArrowBackIcon/>
                    <span>Start Shopping</span>
                </Link>
            </div>
        </div>
      ):(<div>
        <div className='titles'>
            <h3 className='product-title'>Product</h3>
            <h3 className='price'>Price</h3>
            <h3 className='quantity'>Quantity</h3>
            <h3 className='total'>Total</h3>
        </div>
        <div className='cart-items'>
            {cart.cartItems?.map(cartItems=>(
                <div className='cart-item' key={cartItems._id}>
                    <div className='cart-product'>
                        <img src={cartItems.photo}/>
                        <div>
                        <h3>{cartItems.productName}</h3>
                        <p>{cartItems.productDescription}</p>
                        <button>Remove  
                        <div>
                        <DeleteOutlineIcon/>
                        </div>
                        </button>
                        </div>
                    </div>
                    <div className='cart-product-price'>Price(INR/Kg):{cartItems.productPrice}</div>
                    <div className='cart-product-quantity'>
                        <button>-</button>
                        <div className='count'>{cartItems.cartQuantity}</div>
                        <button>+</button>
                    </div>
                    <div className='cart-product-total-price'>
                        {cartItems.productPrice * cartItems.cartQuantity}
                    </div>
                </div>
            ))}
        </div>
        <div className='cart-summary'>
            <button className='clear-cart'>Clear Cart</button>
            <div className='cart-checkout'>
                <div className='subtotal'>
                    <span>Subtotal</span>
                    <span className='amount'>{cart.cartTotalAmount}</span>
                    </div>
                    <p>Taxes and shipping calculated at checkout</p>
                    <button>Checkout</button>
                    <div className='continue-shopping'>
                        <Link to="/products">
                    <ArrowBackIcon/> <span>Continue Shopping</span> 
                    </Link>
                    </div>
                
            </div>
        </div>
      </div>)}
    </div>
  );
};

export default Cart
