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

export default class HomePage extends Component {
  render() {
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
}
