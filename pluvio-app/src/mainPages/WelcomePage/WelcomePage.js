import React, { Component } from "react";
import Header from "../../components/HeaderComponent/Header";
import "./WelcomePage.css";
import thumbnail from "./thumbnail.png";
import SignInComponent from "../../components/LoginComponent/SignInComponent";
import SignUpComponent from "../../components/LoginComponent/SignUpComponent";

export default class WelcomePage extends Component {
  render() {
    return (
      <div id="contentContainer">
        <Header />
        <div id="welcomeTitle" style={{display: "flex",width: "fit-content"}}>
          <p id="welcomepage_header">Don't Know What To Watch?</p>
        </div>
        <div id="textImageContainer">
          <div id="textContainer">
            <p id="text">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div>
            <img id="thumbnail" src={thumbnail} alt="Thumbnail" />
          </div>
        </div>
        <div id="centered">
          <SignInComponent />
          <SignUpComponent />
        </div>
      </div>
    );
  }
}
