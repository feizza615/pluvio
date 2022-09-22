import { Container } from "@mui/material";
import React, { Component } from "react";
import Header from "../../components/HeaderComponent/Header";
import MovieCard from "../../components/MovieCard";
import NavigationBar from "../../components/NavigationBarComponent/NavigationBar";
import Card from "../../components/Card";
import "./HomePage.css";
import styled from "styled-components";


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
      </>
    );
  }
}



