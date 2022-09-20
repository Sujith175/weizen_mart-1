import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';
import Sidebar from "../Components/Sidebar/Sidebar";
import Topbar from "../Components/Topbar/Topbar";
import { Para } from "./ProductElemnts";
import {
    FarmerWrapper,
    FarmerCard,
    CardContainer,
    CardHeading,
    CardForm,
    Input,
    InputLabel,
    InputWrapper,
    FarmerContainer,
    SubmitButton,
    TextArea,
  } from "./UpdateProdElements";
  import { useNavigate } from "react-router-dom";
  
  const Error =styled.span`
  color:red;
  padding:5px;
  `;
const UpdateProd = () => {
  const [priceUpdated, setPriceUpdated] = useState("");
  const [data, setData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [priceErr,setPriceErr] = useState(false)
  const [productName,setProductName] = useState("")
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
        console.log(result.products);
      });
  }, []);

  const postDetails = () => {
    console.log("okey");
    fetch("http://localhost:5000/updateproduct", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
            priceUpdated,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
            setUpdatedData(response.products);
            console.log(response.products);
    }, []);
    };

    const handlePrice = (e1)=>{
        if(priceUpdated.match(/\d+(?:[.,]\d{0,2})?/)){
            console.log("Accepted")
        }
       else{
        setPriceErr(true)
       }
    }

  return (
      <div>
    <ToastContainer />
      <Topbar />
      <FarmerContainer>
        <Sidebar />
        <FarmerWrapper>
          <CardHeading>Add Products</CardHeading>
          <FarmerCard>
          {data.map((product)=>(
            <CardContainer>
              <CardForm>
              <InputWrapper>
                  <InputLabel>Product Name</InputLabel>
                  <Input
                    value={product.productName}
                    disabled
                    ></Input>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product State</InputLabel>
                  <Input
                    value={product.productState}
                    disabled
                    ></Input>
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Product Price in Kg</InputLabel>
                  <Input
                    type="number"
                    value={product.productPrice}
                    onChange={(e) => setPriceUpdated(e.target.value)}
                    onKeyUp={handlePrice}
                    required
                  ></Input>
                {priceErr&&!priceUpdated.match(/\d+(?:[.,]\d{0,2})?/)?<Error>Enter a valid price!</Error>:""}

                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product Quantity in Kg</InputLabel>
                  <Input
                    value={product.productQuantity}
                    disabled
                  ></Input>

                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product Description</InputLabel>
                  <TextArea
                    disabled
                    rows="4"
                    cols="50"
                    value={product.productDescription}
                  ></TextArea>

                </InputWrapper>
                <SubmitButton onClick={postDetails}>Add Product To Home</SubmitButton>
              </CardForm>
            </CardContainer>
            ))}
          </FarmerCard>
        </FarmerWrapper>
      </FarmerContainer>
    </div>
  );
}

export default UpdateProd
