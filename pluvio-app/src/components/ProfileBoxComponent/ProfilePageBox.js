import React, { useEffect, useState } from 'react'
import Picture from "./ProfilePic.png";
import "./ProfileBox.css"
import Card from "../Card.js"
import balls from "../IntroBoxComponent/balls.png";
import { Avatar, Box, Button, Modal } from "@mui/material";
import axios from 'axios';
import Tag from '../TagComponent/Tag'
import styled from "styled-components";
import ButtonComponent from '../LoginComponent/ButtonComponent';

export const TextField = styled.textarea`
  width: 100%;
  height: 200px;
  border-radius: 15px;
  border: none;
  outline: none;
  padding: 10px 15px;
  font-size: 20px;
  font-family: "Poppins";
  box-sizing: border-box;
  transition: box-shadow 500ms ease, transform 500ms ease;
  resize: none;
  background: #06021C; 
  color: white;
  

  &:focus {
    box-shadow: 5px 5px 0px 2px #4930ff;
    transform: translateY(5px);
  }
`;



const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(600px, 90%)",
    bgcolor: "#0B0725",
    border: "2px solid #000",
    boxSizing: "border-box",
    boxShadow: 15,
    p: 5,
    borderRadius: 10,

  };

export default function ProfilePageBox({userdata}) {
 
    const [about, setAbout] = useState("")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=> {
    
          axios
          .get(`http://localhost:5001/users/aboutid/${userdata.username}`)
          .then( response => {
              console.log(response)
              //setLoading(false)
              setAbout(response.data);
            }
          )
      },[])

      var random = Math.floor(Math.random()*16777215).toString(16);

    return (
        <>
        <Card style={{width: "auto", position: "relative"}}>
            <div className="top">
                {/* <img src={Picture} alt="profile" style={{background:"blue",borderRadius:"50%",padding: "0px 10px"}}/> */}
                    <Avatar sx={{width: "75px", height: "75px", bgcolor: '#'+userdata.color,fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{userdata? userdata.username[0] : ""}</Avatar>
                    <div className="texts">
                        <p style={{ fontSize: "18px", }}>@{userdata ? userdata.username : "username"}</p>
                        <Button sx ={{ color: "gray", fontSize: "12px", textAlign: "left", p: 0, m:0, textTransform: "none" }} onClick={handleOpen}>Edit Profile</Button>
                    </div>
                    <div className="bottom">
                        <div><p>Following</p> <p>{userdata ? userdata.following : "0"}</p></div>
                        <div><p>Follower</p> <p>{userdata ? userdata.followers : "0"}</p></div>
                        <div><p>Review</p> <p>{userdata ? userdata.reviews : "0"}</p></div>
                </div>
            </div> 
            <Tag text = "About Me"/>
            <p> {/*Connect this w/user in database so it can be pulled in settings profilepage too*/}
                {about}
            </p>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx = {style}>
            <div className='top'>
            <div style ={{display: "grid", gap: "5px"}}>
            <Avatar sx={{width: "75px", height: "75px", bgcolor: '#'+userdata.color,fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{userdata? userdata.username[0] : ""}</Avatar> 
            <Button sx = {{backgroundColor: "#4930FF", fontSize: "15px", p: 0, m:0, textTransform: "none", color: "white", width: "75px" , height: "fit-content", fontFamily: "Poppins"}}>Change</Button>   
            </div>                        
                    <div className="texts">
                        <p style={{ fontSize: "25px"}}>@{userdata ? userdata.username : "username"}</p>
                        <p> {/*Connect this w/user in database so it can be pulled in settings profilepage too*/}
                            {about}
                        </p>
                    </div>
            </div>
            <TextField placeholder='Edit About Me'></TextField>
            <br/><br/>
            <div style={{float: "right"}}>
            <ButtonComponent style = {{width: "115px" , height: "40px", fontSize: "17px"}}>Confirm</ButtonComponent>
            </div>
            </Box>
        </Modal>
        </>
    );
  }