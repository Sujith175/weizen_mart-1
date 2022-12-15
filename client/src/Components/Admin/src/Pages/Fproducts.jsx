import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar.jsx";
import Topbar from "../Components/Topbar/Topbar.jsx";
import postDetails from "./UpdateProd";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Fproducts.scss";
import {
  CardList,
  Image,
  Heading,
  Name,
  CardContainer,
  Para,
  Button,
} from "./ProductElemnts.js";
import styled from "styled-components"

const Container = styled.div`
height: 25px;
background-color: #a9740e;   
align-items:center;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size:14px;
font-weight:500;
`;

const Fproducts = () => {
  const [data, setData] = useState([]);
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
      <Topbar />
      <Container/>
      <div style={{margin:'20px 20%'}}>
     <input  type="search" style={{height:'35px',width:'25%'}} placeholder="Search Here" value={filterVal} onInput={(e)=>{handleFilter(e)}}/>
     
     </div>
      <Heading>Products</Heading>
      <ToastContainer />

      <CardList>
        {/* <CardContainer>
          // <Name>{product.productName}</Name>
          // <Image alt="" src={product.photo} />
          // <Para> Price: {product.productPrice}</Para>
          // <Para>State: {product.productState}</Para>
          // <Para> Quantity: {product.productQuantity} Kg</Para>
          // <Para> {product.productDescription}</Para>
          // <Button onClick={display}>Add Product to Home</Button>
          //{" "}
        </CardContainer> */}
        <>
          <table className="products">
            <tr>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Price (INR/Kg)</th>
              <th>State</th>
              <th>Quantity (Kg)</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            {data.map((product) => (
              <tr>
                <td>{product.productName}</td>

                <td>
                  <img height="100px" width="100px" src={product.photo} />
                </td>

                <td>{product.productPrice}</td>
                <td>{product.productState}</td>
                <td>{product.productQuantity}</td>
                <td>{product.productDescription}</td>
                <td>
                  <Link className="btn" to={`/edit/${product._id}`}>
                    Validate Product
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </>
      </CardList>
    </>
  );
};

export default Fproducts;
