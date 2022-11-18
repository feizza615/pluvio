import Picture from "./ProfilePic.png";
import "./ProfileBox.css"
import Card from "../Card.js"
import React from 'react';
import { Avatar } from "@mui/material";


export default function ProfileBox({userdata}) {
 
    var random = Math.floor(Math.random()*16777215).toString(16);

    return (
        <Card style={{width: "auto", position: "sticky", top: "10vh"}} id="test">
            <div className="top">
                {/* <img src={Picture} alt="profile" style={{background:"blue",borderRadius:"50%",padding: "0px 10px"}}/> */}
                    <Avatar sx={{width: "75px", height: "75px", bgcolor: userdata.color,fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>{userdata? userdata.username[0] : ""}</Avatar>
                    <div className="texts">
                        <p style={{ fontSize: "18px", }}>@{userdata ? userdata.username : "username"}</p>
                        <p style={{ color: "gray", fontSize: "14px", }}>Edit Profile</p>
                    </div>
            </div>
            <div className="bottom">
                <div><p>Following</p> <p>{userdata ? userdata.following : "0"}</p></div>
                <div><p>Follower</p> <p>{userdata ? userdata.followers : "0"}</p></div>
                <div><p>Review</p> <p>{userdata ? userdata.reviews : "0"}</p></div>
            </div>
      </Card>
    );
  }


  