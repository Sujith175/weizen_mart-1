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
const Fproducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allproducts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.products);
      });
  }, []);

  const display = () => {
    toast.success("Product added to home");
  };

  return (
    <>
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
              <th>Price</th>
              <th>State</th>
              <th>Quantity</th>
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
