import React, { useRef, Component, useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import { ToggleCard, TinderLikeCard, StackCard } from "react-stack-cards";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import "../../components/ReccomendationComponents/ReactionButtons.css";
import "./MatchPage.css";
import { Button } from "@mui/material";
import axios from "axios";
// import { config } from "../../config";
import { LinearProgress } from "@mui/material";
import Watchlist from "../../components/WatchlistComponent/WatchListAlt"

// One array to hold disliked movies from userSlice
// One URL for the Jupyter API
// One URL for MovieDB URL
// One array for recommended movie id's
const notebookURL = "/convert?index=";
const baseURL =
  "https://api.themoviedb.org/3/search/movie?api_key=" + process.env.DB_KEY;

export default function MatchPage() {
  const [isLoaded, setIsLoaded] = useState(true);
  const [directionTinder, setDirection] = useState("swipeCornerDownRight");
  const [isOpen, setOpen] = useState(false);
  const [reccList, setReccList] = useState([]);
  const [id, setId] = useState(118);
  const [like, setLike] = useState(null);
  const [dislike, setMap] = useState(new Map());
  const [details, setDetails] = useState([
    {
      title: "Despicable Me 3",
      release: "June 30, 2017",
      score: 8,
      genre: [{ name: "Genre" }],
      duration: "120",
      description:"DespicableDespicable Me 3 is a 2017 American computer-animated comedy film produced by Illumination and distributed by Universal Pictures. It is the sequal to Despicable Me 2, the third main installment, and the fourth installment overall in the Despicable Me.",
    },
  ]);
  function AddReviewWatch(props) {

      return (
        <Watchlist
          id={props.id}
          title={props.title}
          description={props.description}
        />
      );
    
  }


  useEffect(() => {
    let det = [];
    setIsLoaded(false);

    if (like == null) {
      fetch(notebookURL + id)
        .then((res) => res.json())
        .then(
          (result) => {
            setReccList(result); //[23,24,25,26]
          },
          (error) => {
            console.log(error);
          }
        );
      console.log(reccList);
    }
    //Dislike: Continue showing movies from reccList
    else if(reccList.length>2){
      //If user dislikes a movie add it to the map
      if(like == false){
        console.log("I dislike " + reccList[0]);
        if(dislike.has(reccList[0])==false){
          setMap(new Map(dislike.set(reccList[0], reccList[0])));
        }
        console.log([...dislike]);

      }
      
      //delete current movie
      let temp = reccList;
      temp.shift();
      setReccList(temp);
      console.log(reccList);

      if(like == true){
        fetch(notebookURL + reccList[0])
        .then((res) => res.json())
        .then(
          (result) => {
            setReccList(result);
          },
          (error) => {
            console.log(error);
          }
        );
      console.log(reccList);
      }



      //While the first movie is disliked, and length of list > 2 -> delete disliked movie
      while(dislike.has(reccList[0])){
        console.log("IN WHILE LOOP");
        if(reccList.length>2){
          console.log("Removing Movie" + reccList[0])
          let temp = reccList;
          temp.shift();
          setReccList(temp);
        }
      }      
      
    }
    //Like: Grab current ID and grab  
    else{
      console.log("DISLIKE**")
      let temp = reccList;
      temp.shift();
      setReccList(temp);
      fetch(notebookURL + reccList[0])
        .then((res) => res.json())
        .then(
          (result) => {
            setReccList(result);
          },
          (error) => {
            console.log(error);
          }
        );
      console.log(reccList);
    }

    async function test() {
      console.log("CURRNT MOVIE"+reccList[0]);
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            reccList[0] +
            "?api_key=" +
            process.env.DB_KEY
        )
        .then((response) => {
          console.log(JSON.parse(JSON.stringify(response.data)));
          det.push(JSON.parse(JSON.stringify(response.data)));
          console.log(det);
          if (det.length > 0) {
            setDetails(det);
          } else {
            setDetails([
              {
                title: "Despicable Me 3",
                release: "June 30, 2017",
                score: 8,
                genre: [{ name: "Genre" }],
                duration: "120",
                description:
                  "DespicableDespicable Me 3 is a 2017 American computer-animated comedy film produced by Illumination and distributed by Universal Pictures. It is the sequal to Despicable Me 2, the third main installment, and the fourth installment overall in the Despicable Me.",
              },
            ]);
          }
        });
    }
    test().then(console.log("DATA SET"), setIsLoaded(true));
  }, [id]); // <- add the count variable here

  var Tinder = null;

  const onTinderSwipeRight = () => {
    setId((id) => id + 1);
    setLike(false);
    console.log("Dislike");
    setDirection("swipeCornerDownRight");
    Tinder.swipe();
  };
  const onTinderSwipeLeft = () => {
    setLike(true);
    setId((id) => id - 1);
    console.log("Like");
    setDirection("swipeCornerDownLeft");
    Tinder.swipe();
  };
  const onToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <div className="matchDeck">
        <TinderLikeCard
          images={[]}
          width="100%"
          height="250"
          direction={directionTinder}
          ref={(node) => (Tinder = node)}
          className="tinder"
        >
          <MovieCard
            title={details[0].title}
            release={details[0].release}
            score={details[0].vote_average}
            genre={[{ name: "Genre" }]}
            duration={details[0].runtime}
            description={details[0].overview}
            add={false}
            react={false}
          />
        </TinderLikeCard>

        <div class="buttonContainer">
        
        </div>
        <div class="buttonContainer">
        
          <Button onClick={onTinderSwipeLeft}>
            <div className="circle">
              <ThumbUpOffAltIcon
                className="icon"
                sx={{ fontSize: 55, paddingTop: 1 }}
              />
            </div>
          </Button>
          <AddReviewWatch
          id={details[0].id}
          title={details[0].title}
          description={details[0].description}
        />
          <Button>
            <div onClick={onTinderSwipeRight} className="circle">
              <ThumbDownOffAltIcon
                className="icon"
                sx={{ fontSize: 55, paddingTop: 1 }}
              />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
