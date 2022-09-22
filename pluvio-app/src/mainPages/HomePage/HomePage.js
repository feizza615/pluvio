import { Container } from "@mui/material";
import React, { Component } from "react";
import Header from "../../components/HeaderComponent/Header";
import MovieCard from "../../components/MovieCard";
import NavigationBar from "../../components/NavigationBarComponent/NavigationBar";
import Card from "../../components/Card";
import "./HomePage.css";
import styled from "styled-components";
import Picture from "./ProfilePic.png";



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
        <div id="container">
          <div id="header">
            <Header />
          </div>
          <NavigationBar />
          <Container>
            <MovieCard />
          </Container>
        </div>
        <Card>
          <div style={{ marginTop: "-1em" }} className="top">
            <img src={Picture} alt="profile" />
            <div className="texts">
              <Text style={{ fontSize: "25px", marginBottom: "-0.5em" }}>@Username</Text>
              <Text style={{ color: "gray", fontSize: "17px", }}>Edit Profile</Text>
            </div>
          </div>
          <div className="bottom">
            <Text> Following </Text>
            <Text> Follower </Text>
            <Text> Review </Text>
          </div>
        </Card>
      </>
    );
  }
}



