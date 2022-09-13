import React, { Component, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import GroupIcon from "@mui/icons-material/Group";
import "./NavigationBar.css";
import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import WelcomePage from "../../mainPages/WelcomePage/WelcomePage";



const NavigationBar = () => {
  const [click, setIsClicked] = useState(false)

  const onClickHandler = () => {
      setIsClicked(!click)
  }

  const iconArray = [
    <HomeIcon />,
    <AccountBoxIcon />,
    <GroupIcon />,
    <TheaterComedyIcon />,
  ];

  const linkArray = ["/home/","/profile/","/friends/","/match/","/welcome/"]

  return (
    <div id="navContainer">
      <List>
        <Typography variant="h5" 
          sx={{
            fontFamily: "Poppins",
            fontSize: "16px",
            color: "white",
            margin: "16px 16px 0px 16px",
            padding: 1
          }} 
        >Menu</Typography>
        {["Home", "Profile", "Friends", "Match","Welcome"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <NavLink to={linkArray[index]} 
              onClick={onClickHandler}
              style = {{
                textDecoration: 'none',
              }}
            >
            <ListItemButton
              sx={[
                {
                  "&:hover": {
                    backgroundColor: "#180F53",
                  },
                  ".active &": {
                    background: "#180F53",
                  }
                },
                {
                  bgcolor: "#0B0725",
                  boxShadow: 1,
                  borderRadius: 5,
                  margin: 2,
                  width: "200px",
                  maxHeight: 50,
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
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default NavigationBar;