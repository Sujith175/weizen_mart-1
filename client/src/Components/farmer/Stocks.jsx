import React, { useState, useEffect } from "react";
import {
  CardList,
  Image,
  Heading,
  Name,
  CardContainer,
  Para,
  Button,
} from "./Stock.js";
import Sidebar from "./Sidebar/Sidebar.jsx";
import { FarmerContainer } from "./FarmerElements.js";


const Stocks = () => {
  
  const [data, setData] = useState([]);
  const [disp,setDisp] = useState(false);
  const [searchApiData,setSearchApiData] = useState([]);
  const [filterVal,setFilterVal] = useState("");
  

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

  const display=()=>{
    setDisp(true);
  }

  const handleFilter=(e)=>{
      if(e.target.value == ''){
        setData(searchApiData);
      }else{
      const filterResult = searchApiData.filter(product => product.productName.toLowerCase().includes(e.target.value.toLowerCase())
      ||product.createdAt.toLowerCase().includes(e.target.value.toLowerCase())
      )
      if(filterResult.length>0){
        setData(filterResult);
      }else{
        setData([{"productName":"No data found"}]);
        setData([{"createdAt":"No data found"}]);
      }
      
    }
    setFilterVal(e.target.value);
  }
  
  return (
    <>
   
    <Sidebar/>
    <div style={{margin:'20px 20%'}}>
     <input  type="search" style={{height:'35px',width:'25%'}} placeholder="Search Here" value={filterVal} onInput={(e)=>{handleFilter(e)}}/>
     
     </div>
      <Heading>Products Added</Heading>
      <CardList>
        {data.map((product) => (
          <CardContainer key={product._id} >
            <Name>{product.productName}</Name>
            <Image alt="" src={product.photo} />
            <Para>Date of Product Added: 
             {product.createdAt}
              </Para> 
            <Button onClick={display} >More Details</Button>
            {disp? <>
                    <Para>Product State: {product.productState}</Para>
                    <Para>Product Price(INR/Kg): {product.productPrice}</Para>
                    <Para>Product Quantity(Kg): {product.productQuantity}</Para>
                    <Para>Product description: {product.productDescription}</Para>
                  </>
            :""}
          </CardContainer>
        ))}
      </CardList>
      
    </>
  );
};

export default Stocks;
