import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RoomIcon from '@mui/icons-material/Room';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Container = styled.div`
display:flex;
`;

const Left = styled.div`
flex:1;
display:flex;
flex-direction:column;
padding:20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
margin:20px 0px;
`;
const SocialContainer = styled.div`
display:flex;
`;

const SocialIcon = styled.div`
weight:40px;
height:40px;
border-radius:50%;
color:white;
width:9%;
background-color: #${props=>props.color};
display:flex;
align-items:center;
justify-content:center;
margin-right:20px;
`;


const Center = styled.div`
flex:1;
padding:20px;
`;

const Right = styled.div`
flex:1;
padding:20px;
`;

const Title = styled.h3`
margin-bottom:30px;
`;
const List = styled.ul`
margin:0;
padding:0;
list-style:none;
display:flex;
flex-wrap:wrap;
`;
const ListItem = styled.li`
width:50%;
margin-bottom:10px;
`;

const ContactItem = styled.div`
margin-bottom:20px;
display:flex;
align-items:center;
`;

const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>WEIZEN</Logo>
            <Desc>Weizen is an online organic product market 
                that sells different types of wheat across India.</Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <FacebookIcon/>
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <InstagramIcon/>
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <TwitterIcon/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Register</ListItem>
                <ListItem>SignIn</ListItem>
                <ListItem>Categories</ListItem>
                <ListItem>Terms</ListItem>
                
            </List>
        </Center>
        <Right>
            <Title>Contact</Title>
            <ContactItem><RoomIcon style={{marginRight:"10px"}}/>
                Konni P.O Pathanamthitta , Kerala 689691
            </ContactItem>
            <ContactItem><PhoneIcon style={{marginRight:"10px"}}/>
                +91 75599 21615
            </ContactItem>
            <ContactItem><EmailIcon style={{marginRight:"10px"}}/>
                weizen@gmail.com
            </ContactItem>
        </Right>
    </Container>
  )
}

export default Footer;