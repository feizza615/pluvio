import React, { useRef, Component, useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard";
import { ToggleCard, TinderLikeCard, StackCard } from "react-stack-cards";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import "../../components/ReccomendationComponents/ReactionButtons.css";
import "./MatchPage.css";
import { Button } from "@mui/material";
import axios from "axios";
import { config } from "../../config";

const baseURL =
  "https://api.themoviedb.org/3/movie/3/recommendations?api_key=" +
  config.DB_KEY;

const data = [
  {
    title: "Despicable Me 3",
    release: "June 30, 2017",
    score: 8,
    genre: [{ name: "Genre" }],
    duration: "120",
    description:
      "DespicableDespicable Me 3 is a 2017 American computer-animated comedy film produced by Illumination and distributed by Universal Pictures. It is the sequal to Despicable Me 2, the third main installment, and the fourth installment overall in the Despicable Me.",
  },
  {
    title: "My Little Mermaid",
    release: "June 30, 2017",
    score: 8,
    genre: [{ name: "Genre" }],
    duration: "120",
    description:
      "DespicableDespicable Me 3 is a 2017 American computer-animated comedy film produced by Illumination and distributed by Universal Pictures. It is the sequal to Despicable Me 2, the third main installment, and the fourth installment overall in the Despicable Me.",
  },
  {
    title: "Avengers",
    release: "June 30, 2017",
    score: 8,
    genre: [{ name: "Genre" }],
    duration: "120",
    description:
      "DespicableDespicable Me 3 is a 2017 American computer-animated comedy film produced by Illumination and distributed by Universal Pictures. It is the sequal to Despicable Me 2, the third main installment, and the fourth installment overall in the Despicable Me.",
  },
];

export default function MatchPage() {
  const [directionTinder, setDirection] = useState("swipeCornerDownRight");
  const [directionToggle, setToggle] = useState("sideSlide");
  const [directionStack, setStack] = useState("topRight");
  const [isOpen, setOpen] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movie, setMovie] = useState("spiderman");
  const [submit, setSubmit] = useState(true);
  var Tinder = null;

  const onTinderSwipeRight = () => {
    setDirection("swipeCornerDownRight");
    Tinder.swipe();
  };
  const onTinderSwipeLeft = () => {
    setDirection("swipeCornerDownLeft");
    Tinder.swipe();
  };
  const onToggle = () => {
    setOpen(!isOpen);
  };

  const arr = ["first", "second", "third", "fourth"];

  return (
    <>
      <div className="matchDeck">
        <TinderLikeCard
          images={arr}
          width="100%"
          height="250"
          direction={directionTinder}
          ref={(node) => (Tinder = node)}
          className="tinder"
        >
          {data.map((data, index) => (
            <MovieCard
              key={index}
              title={data.title}
              release={data.release}
              score={data.score}
              genre={data.genre}
              duration={data.duration}
              description={data.description}
              add={true}
              react={false}
            />
          ))}
        </TinderLikeCard>

        <div id="buttonContainer">
          <Button onClick={onTinderSwipeLeft}>
            <div className="circle">
              <ThumbUpOffAltIcon
                className="icon"
                sx={{ fontSize: 55, paddingTop: 1 }}
              />
            </div>
          </Button>
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
