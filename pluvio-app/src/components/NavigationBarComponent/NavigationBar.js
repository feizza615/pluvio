import React, { Component } from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import GroupIcon from '@mui/icons-material/Group';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import "./NavigationBar.css"
export default class NavigationBar extends Component {

  render() {

    const iconArray = [
      <HomeIcon/>, <AccountBoxIcon/>, <GroupIcon/>,<TheaterComedyIcon/>
      ];



    return (

      <div id="navContainer">
          <List>
            {["Home", "Profile", "Friends", "Match"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  sx={[
                    {
                      "&:hover": {
                        backgroundColor: "#180F53",
                      },
                    },
                    {
                      bgcolor: "#0B0725",
                      boxShadow: 1,
                      borderRadius: 5,
                      margin: 2,
                      minWidth: 70,
                      maxHeight: 50,
                      transition: "background-color 500ms ease"
                    },
                  ]}
                >
                  <ListItemIcon sx={{ color: "white" }}>
                    {iconArray[index]}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "white" }}
                    primary={<h5>{text}</h5>}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
    
      </div>

    );
  }
}
