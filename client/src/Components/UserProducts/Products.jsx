import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';

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

const Products = () => {

  const [data, setData] = useState([]);
  const [searchApiData,setSearchApiData] = useState([]);
  const [filterVal,setFilterVal] = useState("");
  const cart = useAppSelector((state) => state.cart);
	const dispatcher = useAppDispatch();
	const navigate = useNavigate();

  const addToCart = (product) => {
		dispatcher(addItemToCart(product));
		navigate("/cart");
	};

  useEffect(() => {
    fetch("http://localhost:5000/allproducts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.products);
        console.log(result.products);
        setSearchApiData(result.products);
      });
  }, []);

  
  const handleFilter=(e)=>{
    if(e.target.value == ''){
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
return (
  <>
    <Heading>Products</Heading>
    <div style={{margin:'20px 20%'}}>
     <input  type="search" style={{height:'35px',width:'25%'}} placeholder="Search Here" value={filterVal} onInput={(e)=>{handleFilter(e)}}/>
     </div>
    <ToastContainer/>
    <CardList>
      {data.map((product) => (
        <CardContainer>
          <Name>{product.productName}</Name>
          <Image alt="" src={product.photo} />
          <Para> Price: {product.productPrice}</Para>
          <Para>State: {product.productState}</Para>
          <Para> Quantity: {product.productQuantity} Kg</Para>
          <Para> {product.productDescription}</Para>
          <Button
            onClick={() => {
              addToCart(product);
            }}
          >
            Add to Cart
          </Button>
        </CardContainer>
      ))}
    </CardList>
  </>
);
};

export default Products;
