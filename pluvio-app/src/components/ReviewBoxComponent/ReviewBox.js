import RatingArea from "./RatingArea";
import "./ReviewBox.css"
import React from 'react';
import Card from "../Card";
import ButtonComponent from "../LoginComponent/ButtonComponent";
import MoviePicture from "./MoviePic.png";
import Picture from "./ProfilePic.png";

export default function ReviewBox({reviewdata}) {
    return (
        <Card>
            <div className="view">
                <div>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <img src={Picture} alt="profile" />
                        <div style={{}}>
                            <p className = "topLine" style={{ fontSize: "25px", margin: 0}}>@{reviewdata ? reviewdata.username : "username"}</p>
                            <RatingArea/>
                        </div>
                    </div>
                    <p className = "bottomLine">{reviewdata ? reviewdata.description : "I really enjoyed this movie, I believe many others should try this out if they like this genre. I really enjoyed this movie, I believe many others should try this out if they like this genre. I really enjoyed this movie, I believe many others should try this out if they like this genre."} </p>
                </div>
                <div className="side">
                    <img src={MoviePicture} alt="profile" />
                    <ButtonComponent style={{height: "30px", width: "100px", borderRadius: "25px 25px", fontSize: "15px"}}>View</ButtonComponent>
                </div>
            </div>
        </Card>
    );
  }