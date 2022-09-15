import React, { Component } from "react";
import Header from "../../components/HeaderComponent/Header";
import "./WelcomePage.css";
import thumbnail from "./thumbnail.png";
import SignInComponent from "../../components/LoginComponent/SignInComponent";
import SignUpComponent from "../../components/LoginComponent/SignUpComponent";

export default class WelcomePage extends Component {
  render() {
    return (
      <>
        <div id="contentContainer">
          <Header />
          <div id="textImageContainer">
            <div id="textContainer">
              <h1>DON'T KNOW WHAT TO WATCH?</h1>
              <p id="text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <div id="centered">
                <SignInComponent />
                <SignUpComponent />
              </div>
            </div>
            <div id="thumbnail_container">
              <img id="thumbnail" src={thumbnail} alt="Thumbnail" />
            </div>

          </div>
      </div>
    </>
    );
  }
}
