import Picture from "./ProfilePic.png";
import "./ProfileBox.css"
import Card from "../Card.js"
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

export default function ProfileBox({userdata}) {
    const user = useSelector(selectUser);

    function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (isLoggedIn!=null) {
        return <p style={{ fontSize: "18px", }}>@{isLoggedIn.name}</p>
        }
      }
 
    return (
        <Card style={{width: "auto", position: "sticky", top: "10vh"}}>
            <div className="top">
                <img src={Picture} alt="profile" />
                    <div className="texts">
                        <Greeting isLoggedIn={user}/>
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


  