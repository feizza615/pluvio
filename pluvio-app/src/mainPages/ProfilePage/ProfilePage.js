import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
//import ProfileBox from "../../components/ProfileBoxComponent/ProfileBox";
import ProfilePageBox from "../../components/ProfileBoxComponent/ProfilePageBox";
import ReviewBox from "../../components/ReviewBoxComponent/ReviewBox";
import ReviewForm from "../../components/ReviewFormComponent/ReviewForm";
import axios from "axios";
import { selectUser } from "../../features/userSlice";
import Watchlist from "../../components/WatchlistComponent/WatchList"



const ProfilePage = () => {
  const user = useSelector(selectUser);
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState(null);
  const [isLoaded2, setIsLoaded2] = useState(false);
  const [details2, setDetails2] = useState(null)

  let det = [];
  let det2 = [];
  const userdata = {
    username: user.name,
    following: 20,
    followers: 1,
    reviews: 21,
    color: user.color,
  };
  const configuration = {
    method: "get",
    url: "http://localhost:5001/reviews/user/" + user.name,
  };

  const name = user.name;

  const configurationwatchlist = {
    method: "get",
    url: "http://localhost:5001/users/watchlistid/" + user.name,
   
  };

  

  React.useEffect(() => {
    axios(configuration)
      .then((result) => {
        det.push(JSON.parse(JSON.stringify(result.data)));
        det = det[0]
        setIsLoaded(true);
        // console.log(det.length)
        setDetails(det);
      })
      .catch((error) => {
        error = new Error();
        setIsLoaded(false);
      });

      axios(configurationwatchlist)
      .then((result2) => {
        setDetails2(JSON.parse(JSON.stringify(result2.data)));
        setIsLoaded2(true);
        console.log("test")
      })
      .catch((error) => {
        error = new Error();
        setIsLoaded2(false);
      });
  }, []);


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
      <ProfilePageBox userdata={userdata} />
      {isLoaded2 ? details2.map((watchlist, index) =>
      <Watchlist key={index} watchlistdata={watchlist}/>) : <h1></h1>}
      {isLoaded && details ? details.map((review, index) =>
        <ReviewBox reviewdata={review} />
      ) : <h1>Loading...</h1>}


    </div>
  );
};

export default ProfilePage;
