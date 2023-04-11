import React,{useEffect,useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Cart.css";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { addItemToCart, clearCart, decreaseCart, removeFromCart } from '../../features/cart/CartSlice';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Announcement from "../Announcement";
import styled from 'styled-components';
import HashLoader from "react-spinners/HashLoader";


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
  
  const [loading,setLoading] = useState(false);
  const Button = styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer;
    margin-left:10px;
    margin-top:15px;
`;

  const [data, setData] = useState([]);
  //const [productPrice, setProductPrice] = useState([]);
  //const [photo, setPhoto] = useState([]);
  console.log('data', data)
    const dispatch = useDispatch();
    const cart =useSelector((state)=>state.cart);
    console.log(cart, "cart")
    const [disabled, setDisabled] = useState(false);
    const [disabled1, setDisabled1] = useState(false);
    const navigate = useNavigate();
    const [total,setTotal]=useState([]);
    let userId=JSON.parse(localStorage.getItem('user'));

  const getCartDetails = () => {
    fetch("http://localhost:5000/getcartdetails/"+userId._id, {
            method: "get",
            headers: {
              "Content-Type": "application/json",
            },
            }).then((response) => response.json())
            .then((result) => {
              setLoading(true)
              console.log(result, "result")
              setData(result.cart);
              let total=0;
              result.cart.forEach(element => {
                //setPhoto(element.photo);
                total=total+(element.productPrice*element.cartQuantity)
                //setProductPrice(element.productPrice);
                
              });
              setTotal(total);
              localStorage.setItem("subtotal",total);
            });
  }
    useEffect(()=>{
      // setLoading(true)
      // setTimeout(()=>{
      //   setLoading(false)
      // },5000)

      getCartDetails()
        //dispatch(getTotals());
    },[cart]);

    const handleRemove = (cartItems) =>{
        dispatch(removeFromCart(cartItems));
        fetch("http://localhost:5000/remove/"+cartItems._id, {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
           console.log(data.error);
          } else {
            console.log(data.message);
  
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const handleDecrease = (cartItems) =>{
        dispatch(decreaseCart(cartItems));
        if(parseInt(cartItems.cartQuantity,10)<=1){
            setDisabled1(true);
        }
        else{
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
            getCartDetails()
            console.log(data, "decrease");
            if (data.error) {
             console.log()
            }
          })
          .catch((err) => {
            console.log(err);
          });
          navigate('/cart')
    };

    const handleIncrease = (cartItems) =>{
        dispatch(addItemToCart(cartItems));
        if(parseInt(cartItems.cartQuantity+1,10)===cartItems.productQuantity){
            toast.error("Stock over");
            setDisabled(true);
        }else{
          setDisabled1(false);
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
            getCartDetails()
            console.log(data);
            if (data.error) {
              console.log(data.error);
            }
          })
          .catch((err) => {
            console.log(err);
          });
          navigate("/cart")
    };

    const handleClearCart = ()=>{
        dispatch(clearCart());
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
            console.log(data.error);
          } 
        })
        .catch((err) => {
          console.log(err);
        });
        navigate("/cart")
    };

    const onHomeClick=()=>{
      navigate("/products");
    }

    const handleCheckout =()=>{
      
      const user = JSON.parse(localStorage.getItem("user"));
      // fetch("http://localhost:5000/checkout", {
        //     method: "post",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body:JSON.stringify({
        //       userId:userid._id,
        //       address:{
        //         firstName: userId.firstName,
        //         email: userId.email,
        //         phone: userId.phone,
        //       },
        //      productPrice:productPrice,
        //     // photo:photo
        //     })
        //   })
        //     .then((res) => res.json())
        //     .then((data) => {
        //       console.log(data);
        //       if (data.error) {
        //         console.log(data.error);
        //       } 
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //     });
        //     toast.success("Order Placed Successfully")
        navigate(`/checkout/${user._id}`);
        
    }

  return (
    <>
{
  loading?

    <div>
         <Announcement />
    <Button onClick={onHomeClick} className="shopping"> <ArrowBackIcon /><span >Continue Shopping</span></Button>
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
                        <img src={cartItems.photo} alt="loading"/>
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
                        <button disabled={disabled1} onClick={() => handleDecrease(cartItems)}>-</button>
                        <div className='count'>{cartItems.cartQuantity}</div>
                        <button disabled={disabled} onClick={()=>handleIncrease(cartItems)}>+</button>
                    </div>
                    <div className='cart-product-total-price'>
                        {cartItems.productPrice * cartItems.cartQuantity}
                    </div>
                    </div>
            ))}
        </div>
        <div className='cart-summary'>
            <button className='clear-cart' onClick={()=>handleClearCart()}>Clear Cart</button>
            <div className='cart-checkout'>
                <div className='subtotal'>
                    <span>Subtotal</span>
                    <span className='amount'>{total}</span>
                    </div>
                    <p>Taxes and shipping charge included</p>
                    <br></br>
                    <button id="checkout" onClick={()=>handleCheckout()}>Checkout</button>
                    {/* <div className='continue-shopping'>
                        <Link to="/products">
                      
                    </Link>
                    </div> */}
                
            </div>
        </div>
      </div>)}
    </div>
    </div>
:  <div className='loader'>
<HashLoader 
        color={"#a9740e"}
        // loading={loading}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        <div color="#a9740e" className='loading-text'>Loading...</div>
      </div>
  }
    </>
  );
};

export default Cart