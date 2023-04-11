import styled from "styled-components";
export const FarmerContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;
export const FarmerWrapper = styled.div`
  margin-left: 10%;
  margin-top: 1%;
  margin-right: 10%;
`;
export const FarmerCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  height: 89%;
  width: 45vw;
  position: relative;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
export const CardContainer = styled.div`
  padding: 2px 16px;
`;
export const CardHeading = styled.h1`
  color: rgb(169, 116, 14);
  margin-bottom: 5%;
  font-size:25px;
  font-weight:bold;
`;
export const Input = styled.input`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: 30rem;
  height: fit-content;
  font-size: medium;
`;

export const TextArea = styled.textarea`
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  width: 30rem;
  height: fit-content;
  font-size: medium;
`;

export const CardForm = styled.div`
  padding: 2rem 1rem 0;
`;
export const InputLabel = styled.label`
  color: #c05c0f;

  transition: 0.25s ease;
  padding-bottom: 10%;
  font-size: large;
  font-weight: 400;
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`;
export const SubmitButton = styled.button`
  background-color: #91940a;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: rgb(169, 116, 14);
  }
`;
