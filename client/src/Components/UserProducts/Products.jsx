import React, { useState, useEffect } from "react";
import {
  CardList,
  Image,
  Heading,
  Name,
  CardContainer,
  Para,
  Button,
} from "./ProductElements.js";
const Products = () => {
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
        console.log(result.products);
      });
  }, []);
  return (
    <>
      <Heading>Products</Heading>
      <CardList>
        {data.map((product) => (
          <CardContainer>
            <Name>{product.productName}</Name>
            <Image alt="" src={product.photo} />
            <Para> Price: {product.productPrice}</Para>
            <Para> Quantity: {product.productQuantity} Kg</Para>
            <Para> {product.productDescription}</Para>
            <Button>Add to Cart</Button>
          </CardContainer>
        ))}
      </CardList>
    </>
  );
};

export default Products;
