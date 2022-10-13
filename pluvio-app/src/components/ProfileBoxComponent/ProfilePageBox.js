import Picture from "./ProfilePic.png";
import "./ProfilePageBox.css"
import Card from "../Card.js"
import React from 'react';
import balls from "../IntroBoxComponent/balls.png";
import { Avatar } from "@mui/material";


export default function ProfilePageBox({userdata}) {
 
    var random = Math.floor(Math.random()*16777215).toString(16);

    return (
        <Card style={{width: "auto", position: "relative"}} id="test">
            <div className="top">
                {/* <img src={Picture} alt="profile" style={{background:"blue",borderRadius:"50%",padding: "0px 10px"}}/> */}
                    <Avatar sx={{width: "75px", height: "75px", bgcolor: '#'+userdata.color,fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{userdata? userdata.username[0] : ""}</Avatar>
                    <div className="texts">
                        <p style={{ fontSize: "18px", }}>@{userdata ? userdata.username : "username"}</p>
                        <p style={{ color: "gray", fontSize: "14px", }}>Edit Profile</p>
                    </div>
                    <div className="bottom">
                        <div><p>Following</p> <p>{userdata ? userdata.following : "0"}</p></div>
                        <div><p>Follower</p> <p>{userdata ? userdata.followers : "0"}</p></div>
                        <div><p>Review</p> <p>{userdata ? userdata.reviews : "0"}</p></div>
                </div>
            </div> 
            <p> {/*Connect this w/user in database so it can be pulled in settings profilepage too*/}
                About Me: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            </p>
      </Card>
    );
  }