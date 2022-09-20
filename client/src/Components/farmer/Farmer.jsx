import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';

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
} from "./FarmerElements";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [productName, setProductName] = useState("");
  const [productState,setProductState] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [pnameErr,setPNameErr] = useState(false)
  const[pstateErr,setPstateErr] = useState(false)
  const [priceErr,setPriceErr] = useState(false)
  const [priceDesc,setPriceDesc] = useState(false)
  const [KgErr,setKgErr] = useState(false)
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

   const Error =styled.span`
    color:red;
    padding:5px;
    `;

  const navigate = useNavigate();
  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/addproduct", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          productName,
          productState,
          productPrice,
          productQuantity,
          productDescription,
          url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            toast.error(data.error, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.success("Product Added Successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setProductName("");
            setProductPrice("");
            setProductQuantity("");
            setProductDescription("");
            setProductState("");
          }
        });
      navigate("/farmernavbar/farmer");
    }
  }, [url]);
  const postDetails = () => {
    console.log("okey");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "uploads");
    data.append("cloud_name", "dbcd93z96");
    fetch("https://api.cloudinary.com/v1_1/dbcd93z96/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  const handleProductName = (e1)=>{
    if(productName.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)){
        console.log("Accepted")
    }
   else{
    setPNameErr(true)
   }
}
  const handleProductState = (e1)=>{
    if(productState.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)){
        console.log("Accepted")
    }
   else{
    setPstateErr(true)
   }
}
  const handlePrice = (e1)=>{
    if(productPrice.match(/\d+(?:[.,]\d{0,2})?/)){
        console.log("Accepted")
    }
   else{
    setPriceErr(true)
   }
}
  const handleKg = (e1)=>{
    if(productQuantity.match(/\d+(?:[.,]\d{0,2})?/)){
        console.log("Accepted")
    }
   else{
    setKgErr(true)
   }
}
  const handleDesc = (e1)=>{
    if(productQuantity.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)){
        console.log("Accepted")
    }
   else{
    setPriceDesc(true)
   }
}

  return (
    <div>
    <ToastContainer />

      <FarmerContainer>
        <Sidebar />
        <FarmerWrapper>
          <CardHeading>Add Products</CardHeading>
          <FarmerCard>
            <CardContainer>
              <CardForm>
                <InputWrapper>
                  <InputLabel>Product Name</InputLabel>
                  <Input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    onKeyUp={handleProductName}
                    required
                  ></Input>
                {pnameErr&&!productName.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)?<Error>Enter a valid product name!</Error>:""}
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product State</InputLabel>
                  <Input
                    type="text"
                    value={productState}
                    onChange={(e) => setProductState(e.target.value)}
                    onKeyUp={handleProductState}
                    required
                  ></Input>
                {pstateErr&&!productState.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)?<Error>Enter a valid state name!</Error>:""}
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Product Price in Kg</InputLabel>
                  <Input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    onKeyUp={handlePrice}
                    required
                  ></Input>
                {priceErr&&!productPrice.match(/\d+(?:[.,]\d{0,2})?/)?<Error>Enter a valid price!</Error>:""}

                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product Quantity in Kg</InputLabel>
                  <Input
                    type="number"
                    value={productQuantity}
                    onKeyUp={handleKg}
                    required
                    onChange={(e) => setProductQuantity(e.target.value)}
                  ></Input>
                {KgErr&&!productQuantity.match(/\d+(?:[.,]\d{0,2})?/)?<Error>Enter a valid quantity!</Error>:""}

                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product Description</InputLabel>
                  <TextArea
                    rows="4"
                    cols="50"
                    value={productDescription}
                    onKeyUp={handleDesc}
                    onChange={(e) => setProductDescription(e.target.value)}
                  ></TextArea>
                {priceDesc&&!productDescription.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)?<Error>Enter a valid description!</Error>:""}

                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Select Image</InputLabel>
                  <Input
                    type="file"
                    required
                    onChange={(e) => setImage(e.target.files[0])}
                  ></Input>
                </InputWrapper>
                <SubmitButton onClick={postDetails}>Submit</SubmitButton>
              </CardForm>
            </CardContainer>
          </FarmerCard>
        </FarmerWrapper>
      </FarmerContainer>
    </div>
  );
};

export default Admin;
