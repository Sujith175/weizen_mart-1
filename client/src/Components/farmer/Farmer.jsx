import React from "react";
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

const Admin = () => {
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
                  <Input type="text"></Input>
                </InputWrapper>

                <InputWrapper>
                  <InputLabel>Product Price</InputLabel>
                  <Input type="text"></Input>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product Quantity in Kg</InputLabel>
                  <Input type="text"></Input>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Product Description</InputLabel>
                  <TextArea rows="4" cols="50"></TextArea>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Select Image</InputLabel>
                  <Input type="file"></Input>
                </InputWrapper>
                <SubmitButton>Submit</SubmitButton>
              </CardForm>
            </CardContainer>
          </FarmerCard>
        </FarmerWrapper>
      </FarmerContainer>
    </div>
  );
};

export default Admin;
