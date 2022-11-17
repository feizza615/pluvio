import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Avatar, Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Stack } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectUser } from "../../features/userSlice";
import { NavLink } from "react-router-dom";
import Card from "../Card";
import NotificationsIcon from '@mui/icons-material/Notifications';
import {io} from "socket.io-client"

const Notification = ({socket}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const user = useSelector(selectUser);
    const [notifications, setNotifications] = useState([])
    const [notify, setNotify] = useState(false)
    useEffect(() => {
      if(socket !== null){

      socket.on("getNotification", (data) => {
        console.log(data)
        setNotifications((prev)=>[...prev,data]);
        setNotify(true)
      });
    }
    }, [socket]);
  
    
    const mappedNotifications = notifications.map((data) => data);
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      } else if (event.key === 'Escape') {
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    var random = Math.floor(Math.random()*16777215).toString(16);
    const displayNotification = ({senderName, type}) => {
      let action;

      if(type === 1){
        action = "followed you!"
      }
      else if (type === 2){
        action = "just posted a review!"
      }

      setNotify(false);
      return (
        <span style={{marginLeft:"20px"}} className="notification">{`${senderName} ${action}`}<br></br></span>
      );
    };
  

    
    
    

    return (
      <>
          <Button 
            sx={{textTransform:"none"}}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <div style={{display:"flex"}}>
          <NotificationsIcon style={{color:"#4930FF"}}></NotificationsIcon>{notify? <div style={{color:"#faaf00"}}>!</div>:<div style={{color:"#faaf00"}}></div>}
          </div>
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper sx={{backgroundColor: "#0b0725"}}>
                  <ClickAwayListener onClickAway={handleClose}>
                    { <MenuList sx={{}}
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      
            <div>
          {notifications.map((n) => displayNotification(n))}
          </div>
                    </MenuList> }
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
    );
  }

  export default Notification;