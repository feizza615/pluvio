import React, { Component } from 'react'
import Card from "../../components/Card";
import ProfileBox from '../../components/ProfileBoxComponent/ProfileBox';



export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Card>Profile Page</Card>
        <ProfileBox></ProfileBox>
      </div>
    )
  }
}
