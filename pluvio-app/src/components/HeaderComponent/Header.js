import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Avatar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Dropbox from '../Dropbox';
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

var random = Math.floor(Math.random()*16777215).toString(16);

// console.log(user)
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
                position: "sticky",
            }}
        >
            <Toolbar sx={{justifyContent: "space-between", alignItems: "center"}}>
                <Link to={"/"} style ={{textDecoration: 'none'}}>
                    <AppLogo >pluvio</AppLogo>
                </Link>
                {/* <Greeting isLoggedIn={user} /> */}
                <Dropbox></Dropbox>
            </Toolbar>
            
        </AppBar>
    </>
  )
}

export default Header