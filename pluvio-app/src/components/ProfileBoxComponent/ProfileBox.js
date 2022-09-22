import Picture from "./ProfilePic.png";
import "./ProfileBox.css"
import Card from "../Card.js"
import React from 'react';


export default function ProfileBox() {
    return (
        <Card>
            <div className="top">
                <img src={Picture} alt="profile" />
                    <div className="texts">
                        <p style={{ fontSize: "25px", }}>@Username</p>
                        <p style={{ color: "gray", fontSize: "17px", }}>Edit Profile</p>
                    </div>
            </div>
            <div className="bottom">
                <p>Following</p>
                <p>Follower</p>
                <p>Review</p>
            </div>
      </Card>
    );
  }


  