import React, { Component } from 'react'
import { useSelector } from 'react-redux';
import Card from "../../components/Card";
import ProfileBox from '../../components/ProfileBoxComponent/ProfileBox';
import ReviewBox from '../../components/ReviewBoxComponent/ReviewBox';
import { selectUser } from '../../features/userSlice';



const ProfilePage = () => {
  
  const user = useSelector(selectUser);

  const userdata = {
    username: user.name,
    following: 20,
    followers: 1,
    reviews: 21
  }
  
  return (
      <div>
        <Card>Profile Page</Card>
        <br/>
        <ProfileBox userdata={userdata}/>
        <br/>
        <ReviewBox/>
        <br/>
        <ReviewBox/>
      </div>
    )
  
}

export default ProfilePage;
