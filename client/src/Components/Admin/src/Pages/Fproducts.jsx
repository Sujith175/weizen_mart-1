import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Fproducts.scss";
import {
  CardList,
  Heading,
} from "./ProductElemnts.js";



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

  return (
    <>
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
                  <img height="100px" width="100px" src={product.photo} alt="loading" />
                </td>

                <td>{product.productPrice}</td>
                <td>{product.productState}</td>
                <td>{product.productQuantity}</td>
                <td>{product.productDescription}</td>
                <td>
                  <Link className="btn" to={`/edit/${product._id}`}>
                    ValidateProduct
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
