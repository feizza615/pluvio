import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from "react-router-dom";
export const AppLogo = styled(Typography) ({
    fontSize: '18px',
    fontFamily: 'Poppins',
    fontWeight: 1000,
    color:"white"
})


const Header = () => {
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
            }}
        >
            <Toolbar>
            <Link to={"/welcome/"} style ={{textDecoration: 'none'}}>
                <AppLogo >pluvio</AppLogo>
            </Link>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header