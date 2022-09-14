import React, { useEffect, useState } from "react";
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
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");

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
          } else {
            console.log("Product Added Successfully");
          }
        });
      // navigate("/")
    }
  }, [url]);
  const postDetails = () => {
    console.log("okey");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instaClone");
    data.append("cloud_name", "sujith101");
    fetch("https://api.cloudinary.com/v1_1/sujith101/image/upload", {
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
  return (
    <div>
      <Topbar />
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
                  ></Input>
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Product Price</InputLabel>
                  <Input
                    type="text"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  ></Input>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product Quantity in Kg</InputLabel>
                  <Input
                    type="text"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  ></Input>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product Description</InputLabel>
                  <TextArea
                    rows="4"
                    cols="50"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                  ></TextArea>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Select Image</InputLabel>
                  <Input
                    type="file"
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
