import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Cart.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { addItemToCart, clearCart, decreaseCart, getTotals, removeFromCart,getPosts } from '../../features/cart/CartSlice';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Announcement from "../Announcement";

const Cart = () => {
  // let cart={};
  // fetch("http://localhost:5000/getcartdetails/"+localStorage.getItem('user._id'), {
	// method: "get",
	// headers: {
	//   "Content-Type": "application/json",
	// },
  // }).then((response) => response.json())
  // .then((json) => {
  //   cart={
  //   cartItems: json.cart,
	// 	loading: "idle",
	// 	cartTotalQuantity:0,
	// 	cartTotalAmount:0, 
  //   }
  //   console.log("cart=====",cart);
  // });

  const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const cart =useSelector((state)=>state.cart);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      let userId=JSON.parse(localStorage.getItem('user'));
      fetch("http://localhost:5000/getcartdetails/"+userId._id, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
            }).then((response) => response.json())
            .then((result) => {
              setData(result.cart);
            });
        // dispatch(getTotals());
    },[]);

    const handleRemove = (cartItems) =>{
        // dispatch(removeFromCart(cartItems));
        fetch("http://localhost:5000/remove/"+cartItems._id, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json())
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

    const handleDecrease = (cartItems) =>{
        // dispatch(decreaseCart(cartItems));
        if(parseInt(cartItems.cartQuantity,10)<=cartItems.productQuantity){
            setDisabled(false);
        }
        let userId=JSON.parse(localStorage.getItem('user'));

        fetch("http://localhost:5000/updatequantity", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productQuantity:parseInt(cartItems.cartQuantity,10)-1,
            productId:cartItems.productId,
            userId:userId._id,
            cartId:cartItems._id
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
              toast.success(cartItems.productName, {
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
          navigate('/cart')
    };

    const handleIncrease = (cartItems) =>{
        // dispatch(addItemToCart(cartItems));
        if(parseInt(cartItems.cartQuantity+1,10)==cartItems.productQuantity){
            toast.error("Stock over");
            setDisabled(true);
        }
        let userId=JSON.parse(localStorage.getItem('user'));

        fetch("http://localhost:5000/updatequantity", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productQuantity:parseInt(cartItems.cartQuantity,10)+1,
            productId:cartItems.productId,
            userId:userId._id,
            cartId:cartItems._id
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
          navigate("/cart")
    };

    const handleClearCart = ()=>{
        // dispatch(clearCart());
        let userId=JSON.parse(localStorage.getItem('user'));
        fetch("http://localhost:5000/clearcart/"+userId._id, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json())
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
        navigate("/cart")
    };

    const handleCheckout =()=>{
        let userid=JSON.parse(localStorage.getItem('user'));
        fetch("http://localhost:5000/checkout", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              userId:userid._id,
              address:{
                firstName: "ammu",
                email: "user.email",
                phone: "user.phone",
                address: "address"
              }
            })
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

        toast.success("Checkout in Process");
        navigate("/checkout");
        
    }

  return (
    <>
    <div>
         <Announcement />
    </div>
    <div className='cart-container'>
      <h2>Shopping Cart</h2>
      {data.length === 0?(
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
            <h3 className='price'>Price(INR/Kg)</h3>
            <h3 className='quantity'>Quantity(Kg)</h3>
            <h3 className='total'>Total(INR)</h3>
        </div>
        <div className='cart-items'>
            {data?.map(cartItems=>(
                <div className='cart-item' key={cartItems._id}>
                    <div className='cart-product'>
                        <img src={cartItems.photo}/>
                        <div>
                        <h3 value={cartItems.productName}>{cartItems.productName}</h3>
                        <p>{cartItems.productDescription}</p>
                        <button onClick={()=>handleRemove(cartItems)}>Remove  
                        <div>
                        <DeleteOutlineIcon/>
                        </div>
                        </button>
                        </div>
                    </div>
                    <div className='cart-product-price'>Price:{cartItems.productPrice}</div>
                    <div className='cart-product-quantity'>
                        <button onClick={() => handleDecrease(cartItems)}>-</button>
                        <div className='count'>{cartItems.cartQuantity}</div>
                        <button disabled={disabled} onClick={()=>handleIncrease(cartItems)}>+</button>
                    </div>
                    <div className='cart-product-total-price'>
                        {cartItems.productPrice * cartItems.productQuantity}
                    </div>
                </div>
            ))}
        </div>
        <div className='cart-summary'>
            <button className='clear-cart' onClick={()=>handleClearCart()}>Clear Cart</button>
            <div className='cart-checkout'>
                <div className='subtotal'>
                    <span>Subtotal</span>
                    <span className='amount'>{cart.cartTotalAmount}</span>
                    </div>
                    <p>Taxes and shipping calculated at checkout</p>
                    <button onClick={()=>handleCheckout()}>Checkout</button>
                    <div className='continue-shopping'>
                        <Link to="/products">
                    <ArrowBackIcon/> <span>Continue Shopping</span> 
                    </Link>
                    </div>
                
            </div>
        </div>
      </div>)}
    </div>
    
    </>
  );
};

export default Cart