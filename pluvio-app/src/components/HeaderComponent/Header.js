import React, {Component, useState, useEffect} from "react";
import AppBar from '@mui/material/AppBar';
import { Avatar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Dropbox from '../Dropbox';
import logo from '../../pluvioFullLogo.png'
import Notification from './Notification';
import {io} from "socket.io-client"
import {Tester} from "../../mainPages/FriendsPage/FriendsPage";
import { ReviewNotify } from "../ReviewFormComponent/ReviewForm";

export const AppLogo = styled(Typography) ({
    fontSize: '30px',
    fontFamily: 'Poppins',
    fontWeight: 1000,
    color:"white"
})

export const HeaderTemp=()=>{
  const user = useSelector(selectUser);
  if (!user) {

    return (<></>)
  } else {
    return (<Header/>)
  }
}
const Header = () => {
const user = useSelector(selectUser);
const [users, setUsers] = useState("");
const [socket, setSocket] = useState(null);

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn!=null) {
    return <h3 style={{marginRight:"50px"}}>Welcome {isLoggedIn.name}!</h3>
    }
  }

  
var random = Math.floor(Math.random()*16777215).toString(16);


useEffect(()=>{
    setSocket(io("http://localhost:5002"));
  },[])


  useEffect(()=>{
    socket?.emit("newUser", user)
  },[socket,users])

  
// console.log(user)
if(user === null){
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
                    <img src={logo} style={{height: "50px"}}></img>
                </Link>
                {/* <Greeting isLoggedIn={user} /> */}
                <div style={{display:"flex"}}>
                <Dropbox></Dropbox>
                </div>
            </Toolbar>
          
      
        </AppBar>
    </>
  )
} else if(user !== null){ 

return (
  <>
<Tester socket={socket}/>
<ReviewNotify socket={socket}/>
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
              <div style={{display:"flex"}}>
              <Notification socket = {socket}></Notification>
              <Dropbox></Dropbox>
              </div>
          </Toolbar>  
    
      </AppBar>
      </>
  )
}
  
}

export default Header