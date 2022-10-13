import { Container, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/HeaderComponent/Header";
import MovieCard from "../../components/MovieCard";
import NavigationBar from "../../components/NavigationBarComponent/NavigationBar";
import Card from "../../components/Card";
import "./HomePage.css";
import styled from "styled-components";
import ProfileBox from "../../components/ProfileBoxComponent/ProfileBox";
import Spoiler from "../../components/SpoilerComponent/Spoiler";
import ReviewBox from '../../components/ReviewBoxComponent/ReviewBox';
import IntroBox from "../../components/IntroBoxComponent/IntroBox"
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Text = styled.p`
  color: white;
  font-family: "Poppins";
  font-size: 20px;
  font-weight: bold;
`;

const userdata = {
  username: "tamim",
  following: 20,
  followers: 1,
  reviews: 21
}

const HomePage = () => {
    const [addedUsers, setAddedUsers] = useState([])
    const [reviews, setReviews] = useState([])
    const user = useSelector(selectUser);
    let navigate = useNavigate(); 

    if (!user) {
      let path = "/welcome/"; 
      navigate(path);
    }

    if (user) {
      console.log("here")
      userdata.username = user.name;
    }

    useEffect(()=> {
        axios
        .get(`http://localhost:5001/users/friendsid/${user.name}`)
        .then( response => {
            setAddedUsers(response.data);
            console.log(response.data)
          }
        )

        axios
        .get('http://localhost:5001/reviews')
        .then( response => {
          setReviews(response.data);
        })
    },[])

    return (
      <>
        <div style={{display: "flex", flexDirection: "column", gap: "40px"}}>
          <IntroBox />
          <h2>
            Recent Activity
          </h2>
          {reviews ? reviews.filter(review => review.name === user.name || addedUsers.includes(review.name)).reverse().map((review, key) => <ReviewBox reviewdata={review}/>) : <Skeleton />}
        </div>
        <ProfileBox userdata={userdata} />
      </>
    );
}

export default HomePage;