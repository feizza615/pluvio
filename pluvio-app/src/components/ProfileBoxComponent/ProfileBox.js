import Picture from "./ProfilePic.png";
import "./ProfileBox.css"
import Card from "../Card.js"
import React from 'react';


export default function ProfileBox({userdata}) {

 
    return (
        <Card style={{width: "auto", position: "sticky", top: "10vh"}}>
            <div className="top">
                <img src={Picture} alt="profile" />
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


  