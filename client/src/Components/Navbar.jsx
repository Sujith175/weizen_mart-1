import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {useDispatch,useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

//For Styling Elements styled-components library is used
const Container = styled.div` 
    height:60px;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items:center;
`;

//Left Side
const Left = styled.div`
flex:1;
display:flex;
align-items:center;
`;

const Language = styled.span`
font-size:14px;
cursor:pointer;
`;

const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display:flex;
align-items:center;
margin-left:25px;
padding:5px;
`;

const Input = styled.input`
border:none;

`;
//Center side
const Center = styled.div`
flex:1;
text-align:center;
`;
const Logo = styled.h1`
font-weight:bold;
`
const MenuItem = styled.div`
font-size:14px;
cursor:pointer;
margin-left:25px;
`

//Right side
const Right = styled.div`
flex:1;
display:flex;
align-items:center;
justify-content:flex-end;
`;

const Navbar = () => {
  //const user = useSelector((state)=>state.user.currentUser);


  //const dispatch = useDispatch();

 // const navigate = useNavigate()

  return (
    <Container>
          <Wrapper>
          <Left>
            <Language>EN</Language>
            <SearchContainer>
              <Input/>         
            <SearchIcon style={{color:'grey',fontSize:'16px'}}/>
            </SearchContainer>
          </Left>

          <Center><Logo>WEIZEN MART</Logo></Center>

          <Right>
            <MenuItem>
            <Link style={{textDecoration:'none',color:"black"}} to="/register">REGISTER</Link>
            </MenuItem>
            <MenuItem>
            <Link style={{textDecoration:'none',color:"black"}} to="/login">LOGIN</Link>
            </MenuItem>
          <MenuItem>
          <Badge badgeContent={4} color="primary">
          <ShoppingCartOutlinedIcon/></Badge>
          </MenuItem>
          </Right>
          </Wrapper>  
    </Container>
  );
};

export default Navbar;