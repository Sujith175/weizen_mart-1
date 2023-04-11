import styled from "styled-components";

export const Heading = styled.h1`
  margin-top: 5%;
  margin-bottom: 2%;
  margin-left: 9%;
  font-size: 30px;
  font-weight:bold;
  color: rgb(169, 116, 14);
`;
export const CardList = styled.div`
  width: 60vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 50px;
`;
export const Image = styled.img`
  height: 200px;
  width: 300px;
  
`;
export const Name = styled.h1`
  color: black;
  text-align:center;
  margin-bottom:2px;
  margin-top:5px;
  font-size: 25px;

`;
export const Para = styled.p`
  color: white;
  margin-top: 5%;
  text-align:center;
`;


export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d7b965;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  margin-top:0px;
  margin-left:100px;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
`;

export const Button = styled.button`
  border: none;
  outline: 0;
  padding: 10px;
  color: white;
  background-color: #a9740e;
  text-align: center;
  cursor: pointer;
  width: 50%;
  font-size: 18px;
  margin-top: 5%;
  margin-left:25%;
  margin-bottom:5%;
  border-radius:10px;
  &:hover {
    background-color: #caa906;
  }
`;
