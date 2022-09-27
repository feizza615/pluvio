import React, { Component } from 'react'
import Card from "../../components/Card";
import ProfileBox from '../../components/ProfileBoxComponent/ProfileBox';
import ReviewBox from '../../components/ReviewBoxComponent/ReviewBox';
import ReviewForm from '../../components/ReviewFormComponent/ReviewForm';




export default class ProfilePage extends Component {
  render() {
    return (
      <div>
        <Card>Profile Page</Card>
        <br/>
        <ProfileBox/>
        <br/>
        <ReviewBox/>
        <br/>
        <ReviewBox/>
        <br/>
        <ReviewForm/>
      </div>
    )
  }
}
