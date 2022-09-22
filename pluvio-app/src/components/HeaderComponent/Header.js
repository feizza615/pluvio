import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
export const AppLogo = styled(Typography) ({
    fontSize: '30px',
    fontFamily: 'Poppins',
    fontWeight: 1000,
    color:"white"
})


const Header = () => {
    
const user = useSelector(selectUser);

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn!=null) {
    return <h3 style={{marginRight:"50px"}}>Welcome {isLoggedIn.name}!</h3>
    }
  }
console.log(user)
  return (
    <>
        <AppBar
            sx={{
                background: "#000",
                marginBottom:"50px",
                width: "100%",
                margin: "0 auto",
                left: 0,
                right: 0,
                position: "static",
            }}
        >
            <div style={{display: "flex", justifyContent:"space-between"}}>
            <Toolbar>
            <Link to={"/"} style ={{textDecoration: 'none'}}>
                <AppLogo >pluvio</AppLogo>
            </Link>
            
            </Toolbar>
            <Greeting isLoggedIn={user} />
            </div>
            
        </AppBar>
    </>
  )
}

export default Header