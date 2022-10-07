import styled from "styled-components";

export const Heading = styled.h1`
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 9%;
  font-size: 30px;
  color: rgb(169, 116, 14);
`;
export const CardList = styled.div`
  width: 85vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 50px;
`;
export const Image = styled.img`
  height: 200px;
  width: 200px;
`;
export const Name = styled.h1`
  color: black;
  text-align:center;
`;
export const Para = styled.p`
  color: white;
  margin-top: 5%;
  text-align:center;
`;


export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d2b051;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 25px;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.25s ease-out;
`;

export const Button = styled.button`
  border: none;
  outline: 0;
  padding: 12px;
  color: white;
  background-color: #745b15;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  margin-top: 5%;
  &:hover {
    background-color: #eacd7e;
  }
`;
