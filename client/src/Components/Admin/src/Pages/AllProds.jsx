import React, { useState, useEffect, useRef } from "react";
import {
  CardList,
  Image,
  Heading,
  Name,
  CardContainer,
  Para,
  Button,
} from "../../../farmer/FarmerAddedProd.js";
import { useReactToPrint } from 'react-to-print';


const AllProds = () => {
  
  const [data, setData] = useState([]);
  const [disp,setDisp] = useState(false);
  const [searchApiData,setSearchApiData] = useState([]);
  const [filterVal,setFilterVal] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'WeizenMart-AllProducts',
  });

  useEffect(() => {
    fetch("http://localhost:5000/allproducts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.products);
        setSearchApiData(result.products);
      });
  }, []);

  const display=()=>{
    setDisp(true);
  }

  const handleFilter=(e)=>{
      if(e.target.value === ''){
        setData(searchApiData);
      }else{
      const filterResult = searchApiData.filter(product => product.productName.toLowerCase().includes(e.target.value.toLowerCase())
      ||product.createdAt.substring(0,10).toLowerCase().includes(e.target.value.toLowerCase())
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
    <div style={{margin:'20px 20%'}}>
     <input  type="search" style={{height:'35px',width:'25%'}} placeholder="Search Here" value={filterVal} onInput={(e)=>{handleFilter(e)}}/>
     </div>
     <div ref={componentRef}>
      <Heading>All Products</Heading>
      <CardList>
        {data.map((product) => (
          <CardContainer key={product._id} >
            <Image alt="" src={product.photo} />
            <div style={{position: "absolute",right: "0px",backgroundColor:"white",fontSize:"15px",padding:"5px",borderRadius:"0% 0% 0% 12px"}}>{product.productQuantity>0?<h3 style={{textAlign:"left",marginTop:"5px",fontFamily:"sans-serif",fontWeight:"bold"}}className="stockadded">IN STOCK</h3>:<h3 style={{textAlign:"center",marginTop:"5px",fontFamily:"sans-serif",fontWeight:"bold"}} className="stocknotadded">STOCK OVER</h3>}
            </div>
            <Name>{product.productName}</Name>
            <Para style={{fontSize:"18px"}}>Date of Product Added <br></br>
             {product.createdAt.substring(0,10)}
              </Para> 
            <Button onClick={display} >More Details</Button>
            {disp? <>
                    <Para>Product State  : {product.productState}</Para>
                    <Para>Product Price(INR/Kg)  : {product.productPrice}</Para>
                    <Para>Product Quantity(Kg)  : {product.productQuantity>0?product.productQuantity:"STOCK OVER"}</Para>
                    <Para>Product description  : {product.productDescription}</Para>
                    <Para>Product Added By : {product.postedBy.firstName} {product.postedBy.lastName}</Para>
                    <br></br>
                  </>
            :""}

          </CardContainer>
        ))}
      </CardList>
    </div>
    <button  onClick={handlePrint} style={{
                                marginLeft:"26rem",
                                marginBottom:"2rem",
                                border: "none",
                                padding: "10px",
                                backgroundColor: "teal",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "medium",
                                fontFamily: "sans-serif"}}> Download </button> 

    </>
  );
};

export default AllProds;
