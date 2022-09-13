import React, { Component } from "react";
import Header from "../../components/HeaderComponent/Header";
import NavigationBar from "../../components/NavigationBarComponent/NavigationBar";
import "./HomePage.css";

export default class HomePage extends Component {
  render() {
    return (
      <div id="container">
        <div id="header">
          <Header />
        </div>

        <NavigationBar />
      </div>
    );
  }
}
