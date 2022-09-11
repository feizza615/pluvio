import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Toolbar, Typography } from '@mui/material';
import styled from '@emotion/styled';

export const AppLogo = styled(Typography) ({
    fontSize: '25px',
    fontFamily: 'Poppins',
    fontWeight: 1000,
})


const Header = () => {
  return (
    <>
        <AppBar
            sx={{
                background: "#000",

            }}
        >
            <Toolbar>
                <AppLogo>pluvio</AppLogo>
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Header