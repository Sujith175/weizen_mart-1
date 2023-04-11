import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import Announcement from "../Announcement";

import {
  CardList,
  Image,
  Heading,
  Name,
  CardContainer,
  Para,
  Button,
} from "./ProductElements.js";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { addItemToCart } from "../../features/cart/CartSlice";
import { toast, ToastContainer } from "react-toastify";
import Slider from "../Slider";
import KommunicateChat from "../ChatBot/Chat";
import Footer from "../Footer";


const Products = () => {
  const [data, setData] = useState([]);
  const [searchApiData,setSearchApiData] = useState([]);
  const [filterVal,setFilterVal] = useState("");
  //const [displayBox,setDisplayBox] = useState("");
  const cart = useAppSelector((state) => state.cart);
	const dispatcher = useAppDispatch();
	const navigate = useNavigate();

 
  useEffect(() => {
   
    fetch("http://localhost:5000/allproducts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.products);
        //console.log(result.products);
        setSearchApiData(result.products);
      });
  }, []);

  const addToCart = (product) => {

    if(product.productQuantity<=0){
      toast.error("Stock Over");
    }
    const user = JSON.parse(localStorage.getItem("user"));

		if(product.productQuantity>0){
    dispatcher(addItemToCart(product));
		navigate("/cart");
    fetch("http://localhost:5000/cart", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId:product._id,
        productName:product.productName,
        productPrice:product.productPrice,
        productQuantity:1,
        productState:product.productState,
        postedBy:product.postedBy,
        UserId: user._id,
        firstName: user.firstName,
        email: user.email,
        phone: user.phone,
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
    }
	};

  const handleFilter=(e)=>{
    if(e.target.value === ''){
      setData(searchApiData);
    }else{
    const filterResult = searchApiData.filter(product => product.productName.toLowerCase().includes(e.target.value.toLowerCase())
    ||product.productState.toLowerCase().includes(e.target.value.toLowerCase())
    )
    if(filterResult.length>0){
      setData(filterResult);
    }else{
      setData([{"productName":"No data found"}]);
    }
    
  }
  setFilterVal(e.target.value);
}

const handleClick=(product)=>{
  const user = JSON.parse(localStorage.getItem("user"));
  fetch("http://localhost:5000/stockreq", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId:product._id,
      productName:product.productName,
      productPrice:product.productPrice,
      productQuantity:product.productQuantity,
      productState:product.productState,
      postedBy:product.postedBy,
      UserId: user._id,
      firstName: user.firstName,
      email: user.email,
      phone: user.phone,
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
    toast.success("Request send successfully",{
      autoClose: 2000,
    })
}

//   const handleFilter1=(e)=>{
//     if(e.target.value == ''){
//       setData(searchApiData);
//     }else{
//     const filterResult = searchApiData.filter(product => product.productName.toLowerCase().includes(e.target.value.toLowerCase())
//     ||product.productState.toLowerCase().includes(e.target.value.toLowerCase())
//     )
//     if(filterResult.length>0){
//       setData(filterResult);
//     }else{
//       setData([{"productName":"No data found"}]);
//     }
    
//   }
  
// }

// const {
//   transcript,
//   listening,
//   resetTranscript,
//   browserSupportsSpeechRecognition
// } = useSpeechRecognition();

// if (!browserSupportsSpeechRecognition) {
//   return <span>Browser doesn't support speech recognition.</span>;
// }


return (
  <>
  <div>
  <Announcement />
  <Slider/>
  <KommunicateChat/>
  {/* <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div> */}
    <Heading>Products</Heading>
    {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
    <div style={{margin:'20px 20%'}}>
     <input type="search" style={{height:'30px',width:'25%'}} placeholder="Search Here " value={filterVal} onInput={(e)=>{handleFilter(e)}}
     />
     <br></br>
     <br></br>
     {/* <MicIcon onClick={SpeechRecognition.startListening}/>
     <CloseIcon onClick={resetTranscript}/> */}
     {/* <p>{transcript}</p> */}
     </div>
    {/* <div style={{margin:'20px 20%'}}>
     <input  type="search" style={{height:'35px',width:'25%'}} placeholder="Search Here By Typing" value={filterVal} onInput={(e)=>{handleFilter(e)}}/>
     </div> */}

    

    <ToastContainer/>
    <CardList>
      {data.map((product) => (
        <CardContainer>
          <Image alt="" src={product.photo} />
          <div style={{position: "absolute",right: "0px",backgroundColor:"white",fontSize:"15px",padding:"5px",borderRadius:"0% 0% 0% 12px"}}>{product.productQuantity>0?<h3 style={{textAlign:"left",marginTop:"5px",fontFamily:"sans-serif",fontWeight:"bolder"}}className="stockadded">IN STOCK</h3>:<h3 style={{textAlign:"center",marginTop:"5px",fontFamily:"sans-serif",fontWeight:"bolder"}} className="stocknotadded">STOCK OVER</h3>}
            </div>
          <Name>{product.productName}</Name>
          <Para> Price(INR/Kg): {product.productPrice}</Para>
          <Para>State: {product.productState}</Para>
          <Para> Quantity(Kg): {product.productQuantity>0 ? product.productQuantity :  "STOCK OVER" }</Para>
          <Para> {product.productDescription}</Para>
          <Button
          name="cart"
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </Button>
          {product.productQuantity>0? "" :<Button
            onClick={() => {
              handleClick(product);
            }}
          >
            Request Stock
          </Button>} 
          <br></br>
        </CardContainer>
      ))}
    </CardList>
    </div>
  <Footer/>
  </>
);
};

export default Products;
