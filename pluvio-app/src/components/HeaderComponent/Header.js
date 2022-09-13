import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from "react-router-dom";
export const AppLogo = styled(Typography) ({
    fontSize: '30px',
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
                marginBottom:"50px"
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