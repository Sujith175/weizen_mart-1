import React from 'react'
import styled from "styled-components"

const Container = styled.div`
height: 30px;
background-color: #a9740e;   
align-items:center;
color:white;
display:flex;
align-items:center;
justify-content:center;
font-size:14px;
font-weight:500;
`;
const Announcement = () => {
  return (
    <Container>
        Super Deal! Free Shipping on Orders Above $500
    </Container>
  )
}

export default Announcement;