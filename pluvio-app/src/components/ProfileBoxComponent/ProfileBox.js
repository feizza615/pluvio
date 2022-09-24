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
                        <p style={{ fontSize: "25px", }}>@{userdata ? userdata.username : "username"}</p>
                        <p style={{ color: "gray", fontSize: "17px", }}>Edit Profile</p>
                    </div>
            </div>
            <div className="bottom">
                <p>Following {userdata ? userdata.following : "0"}</p>
                <p>Follower {userdata ? userdata.followers : "0"}</p>
                <p>Review {userdata ? userdata.reviews : "0"}</p>
            </div>
      </Card>
    );
  }


  