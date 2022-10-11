import RatingArea from "./RatingArea";
import "./ReviewBox.css"
import React from 'react';
import Card from "../Card";
import ButtonComponent from "../LoginComponent/ButtonComponent";
import MoviePicture from "./MoviePic.png";
import Picture from "./ProfilePic.png";
import { Avatar, Skeleton } from "@mui/material";

export default function ReviewBox({reviewdata}) {

    var random = Math.floor(Math.random()*16777215).toString(16);

    console.log(reviewdata)

    return (
        <Card>
            <div className="view">
                <div>
                    <div style={{display: "flex", alignItems: "center",gap:"20px"}}>
                        <Avatar sx={{width: "75px", height: "75px", bgcolor: '#'+random,fontSize:"36px",fontFamily:"Poppins",fontWeight:800}}>u</Avatar>
                        <div style={{}}>
                            <p className = "topLine" style={{ fontSize: "25px", margin: 0}}>@{reviewdata ? reviewdata.name : "username"}</p>
                            <RatingArea ratingdata={reviewdata ? reviewdata.score : 5}/>
                        </div>
                    </div>
                    <p className = "bottomLine">{reviewdata ? reviewdata.description : "I really enjoyed this movie, I believe many others should try this out if they like this genre. I really enjoyed this movie, I believe many others should try this out if they like this genre. I really enjoyed this movie, I believe many others should try this out if they like this genre."} </p>
                </div>
                <div className="side">
                {reviewdata && reviewdata.image ? <img src={"https://image.tmdb.org/t/p/w500"+reviewdata.image} alt="" style={{height:"150px",borderRadius:"5px"}}/> :<Skeleton  sx={{ bgcolor: '#333', borderRadius: "15px" }} variant="rounded" width={100} height={150}/>}
                    {/* <ButtonComponent style={{height: "30px", width: "100px", borderRadius: "25px 25px", fontSize: "15px"}}>View</ButtonComponent> */}
                </div>
            </div>
        </Card>
    );
  }