import React, { Component, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import GroupIcon from "@mui/icons-material/Group";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "./NavigationBar.css";
import { NavLink } from "react-router-dom";
import { Fab, Typography } from "@mui/material";
import WelcomePage from "../../mainPages/WelcomePage/WelcomePage";
import { loginFunc } from "../../features/userSlice";
import { useDispatch } from "react-redux";

const NavigationBar = () => {
  const [flip, setFlip] = useState(false)
  const [style, setStyle] = useState("")
  const [click, setIsClicked] = useState(false)
  const dispatch = useDispatch();

  const handleClick = () => {
    setFlip(!flip);
    flip ? setStyle("showNav") : setStyle("")
  }

  const onClickHandler = value => () => {
      console.log(value)
      if(value==="Logout"){
        dispatch(loginFunc(null))
      }
      setIsClicked(!click)
  }

  const iconArray = [
    <HomeIcon />,
    <AccountBoxIcon />,
    <GroupIcon />,
    <TheaterComedyIcon />,
    <LogoutIcon/>
  ];

  const linkArray = ["/home/","/profile/","/friends/","/match/","/", "/welcome/"]

  if (window.location.pathname === "/welcome") 
    return <div></div>;
  else if  (window.location.pathname === "/")
    return <div></div>;

  return (
    <>
      <div id="navContainer" className={style}>
        <List sx={{width: "100%"}}>
          <Typography variant="h5" 
            sx={{
              fontFamily: "Poppins",
              fontSize: "16px",
              color: "white",
              margin: "16px 16px 0px 16px",
              padding: 1
            }} 
          >Menu</Typography>
          {["Home", "Profile", "Friends", "Match","Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <NavLink to={linkArray[index]} 
                onClick={onClickHandler(text)}
                style = {{
                  textDecoration: 'none',
                  width: "100%"
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
      <Fab sx={{display: {sm:"none"},position: "fixed", left: "-25px", top: "50%", backgroundColor:"#4930ff !important"}} onClick={handleClick}>
        <ArrowForwardIosIcon sx={{color:"white"}}/>
      </Fab>
    </>
  );
}

export default NavigationBar;