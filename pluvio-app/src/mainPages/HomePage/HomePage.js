import { Container } from "@mui/material";
import React, { Component } from "react";
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

    return (
      <>
        <div style={{display: "flex", flexDirection: "column", gap: "40px"}}>
          <IntroBox />
          <h2>
            Recent Activity
          </h2>
          <ReviewBox />
          <Spoiler>
            <ReviewBox />
          </Spoiler>
          <ReviewBox />
        </div>
        <ProfileBox userdata={userdata} />
      </>
    );
}

export default HomePage;