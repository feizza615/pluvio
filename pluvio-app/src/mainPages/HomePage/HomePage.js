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

export const Text = styled.p`
  color: white;
  font-family: "Poppins";
  font-size: 20px;
  font-weight: bold;
`;



export default class HomePage extends Component {
  render() {
    return (
      <>
        <div style={{display: "flex", flexDirection: "column", gap: "40px"}}>
          <MovieCard />
          <h2>
            Recent Activity
          </h2>
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
        <Spoiler>
          <ProfileBox />
        </Spoiler>
      </>
    );
  }
}
