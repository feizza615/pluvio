import React from "react";
import styled from "styled-components";
import { Avatar, Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Stack } from "@mui/material";
import { useSelector } from 'react-redux';
import { selectUser } from "../features/userSlice";
import { NavLink } from "react-router-dom";
import { loginFunc } from "../features/userSlice";
import { useDispatch } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Dropbox() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const onClickHandler = (event) =>
    {
      dispatch(loginFunc(null));
      setOpen(false);
      window.location.reload(false);         
    };

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

    

  
    return (
      <Stack direction="row" spacing={2}>
        
        <div>
          <Button 
            sx={{textTransform:"none"}}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
          <Avatar sx={{bgcolor:user ? user.color: "#"+(random), fontFamily:"Poppins",fontWeight:800}}>{user? user.name[0] : ""}</Avatar>
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
                    <MenuList sx={{}}
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <NavLink style={{textDecoration: "None"}} to={"/profile/"+user.name}><MenuItem sx ={{fontSize: "17px", color: "white", gap: "10px"}} onClick={handleClose}><PersonIcon/> Profile </MenuItem></NavLink>
                      <NavLink style={{textDecoration: "None"}} to="/settings"><MenuItem sx ={{fontSize: "17px", color: "white", gap: "10px"}} onClick={handleClose}> <SettingsIcon/> Setting</MenuItem></NavLink>
                      <NavLink style={{textDecoration: "None"}} to="/welcome"><MenuItem sx ={{fontSize: "17px", color: "white", gap: "10px"}} onClick={onClickHandler}><LogoutIcon/> Logout</MenuItem></NavLink>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </Stack>
    );
  }