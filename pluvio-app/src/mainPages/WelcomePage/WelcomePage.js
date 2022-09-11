import React, { Component } from 'react'
import Header from "../../components/HeaderComponent/Header";
import NavigationBar from "../../components/NavigationBarComponent/NavigationBar";

export default class WelcomePage extends Component {
  render() {
    return (
      <div id="container">
        <div id="header">
          <Header />
        </div>

        <NavigationBar />
      </div>
      
      
    )
  }
}
