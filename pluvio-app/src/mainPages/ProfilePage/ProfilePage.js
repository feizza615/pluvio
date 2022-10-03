import React, { Component, useEffect, useState  } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import ProfileBox from "../../components/ProfileBoxComponent/ProfileBox";
import ReviewBox from "../../components/ReviewBoxComponent/ReviewBox";
import ReviewForm from "../../components/ReviewFormComponent/ReviewForm";
import axios from "axios";
import { selectUser } from "../../features/userSlice";




const ProfilePage = () => {
  const user = useSelector(selectUser);
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState(null)

  let det = [];
  const userdata = {
    username: user.name,
    following: 20,
    followers: 1,
    reviews: 21,
  };
  const configuration = {
    method: "get",
    url: "http://localhost:5001/reviews/user/"+user.name,
  };

  React.useEffect(() => {

   
    axios(configuration)
      .then((result) => {
        det.push(JSON.parse(JSON.stringify(result.data)));
        det = det[0]
        setIsLoaded(true);
        console.log(det.length)
        setDetails(det);
      })
      .catch((error) => {
        error = new Error();
        setIsLoaded(false);
      });
  },[]);

  return (
    <div style={{display: "flex", flexDirection: "column", gap: "40px"}}>
      <ProfileBox userdata={userdata} />
      {isLoaded && details ? details.map((review,index) =>
        <ReviewBox reviewdata={review}/>
      ): <h1>Loading...</h1>}
   
    </div>
  );
};

export default ProfilePage;
