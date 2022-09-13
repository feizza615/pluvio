import { Container } from "@mui/material";
import React, { Component } from "react";
import Header from "../../components/HeaderComponent/Header";
import MovieCard from "../../components/MovieCard";
import NavigationBar from "../../components/NavigationBarComponent/NavigationBar";
import "./HomePage.css";

export default class HomePage extends Component {
  render() {
    return (
      <>
        <Header />
        <NavigationBar />
        <Container>
          <MovieCard />
        </Container>
      </>
    );
  }
}
