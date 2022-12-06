import React, {useState} from "react";
import Card from "./Card";
import "../components/WatchlistComponent/watchlist.css"
import styled from "styled-components";
import ReviewForm from "./ReviewFormComponent/ReviewForm";
import { Chip, Rating, Skeleton } from "@mui/material";
import Watchlist from "../components/WatchlistComponent/WatchlistButton"
import ReactionButtons from "./ReccomendationComponents/ReactionButtons";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MovieViewComponent from "./MovieViewComponent/MovieViewComponent";
import axios from "axios";
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';


//Review Button not implemented

export const Container = styled.div`
  * {
    margin: 0;
  }
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 20px;
  position: relative;
  overflow: hidden;
  isolation: isolate;
`;

export const Image = styled.div`
  width: 150px;
  height: 200px;
  background: red;
  border-radius: 15px;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "60%",
  minHeight:"70%",
  color: "white",
  borderRadius: "15px",
  bgcolor: "#0B0725",
  boxSizing: "border-box",
  boxShadow: 15,
  p: 5,

  "@media (max-width: 640px)": {
  }
};
const MovieCard = ({
  title,
  release,
  score,
  genre,
  duration,
  description,
  image,
  watchlist,
  id,
  add,
  react
}) => {
  if (release) {
    const [year, month, day] = release.split("-");
    release = new Date([month, day, year].join("/"));
    var options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    var n = release.toLocaleDateString("en-US", options);
    release = n.replace(new RegExp(",", "g"), " ");
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hr " + rminutes + " min";
  }

  function AddReviewWatch(props) {
    const interact = props.addVal;
    if (interact) {
      return (
        <Watchlist
          id={props.id}
          title={props.title}
          image={props.image}
          description={props.description}
        />
      );
    }
  }

  function LikeDislike(props) {
    const react = props.react;
    if (react) {
      return (
        <ReactionButtons />
      )
    }
  }
  return (
    <>
      <Card style={{ width: "auto"}} >
        <RowContainer  >
          {image ? (
            <img
              src={"https://image.tmdb.org/t/p/w500" + image}
              alt=""
              style={{ height: "20vh", borderRadius: "5px" }}
            />
          ) : (
            <Skeleton
              sx={{ bgcolor: "#333", borderRadius: "15px" }}
              variant="rounded"
              width={150}
              height={200}
            />
          )}
          <div className="container" onClick={handleOpen} >
            <h2 style={{ margin: "0px", textAlign: "left" }}>
              {title ? title : "Unknown"}
            </h2>
            <Rating
              name="read-only"
              precision={0.5}
              value={score / 2}
              readOnly
            />
            <br />
            {genre.map((gen, g) => (
              <Chip
                key={g}
                sx={{
                  background: "#180F53",
                  color: "white",
                  margin: "5px",
                  fontFamily: "Poppins",
                }}
                label={gen.name}
              />
            ))}
            <Container>
              <h4>{watchlist}</h4>
              <h4>{duration ? timeConvert(duration) : ""}</h4>
              <h4>{release ? release : ""}</h4>
            </Container>
          </div>
        </RowContainer>
        <br/>
        <p style={{ textAlign: "left", fontSize: "16px",  overflow: "hidden",display: "-webkit-box",  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical" }} onClick={handleOpen} >
          {description ? description : ""}
        </p>
        <AddReviewWatch
          addVal={add ? add : false}
          id={id}
          title={title}
          image={image}
          description={description}
        />

      </Card>
      <LikeDislike react={react ? react : false} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{
          ".MuiBackdrop-root": {
            backdropFilter: "blur(10px)",
            width:1
          },
        }}
      >
        <Box sx={style}>
          <MovieViewComponent
          title={title}
          release={release}
          score={score}
          genre={genre}
          duration={duration}
          description = {description}
          image = {image}
          watchlist = {watchlist}
          id={id}
          add={add}
          react/>
        </Box>
      </Modal>
    </>
  );
};



export const WatchListCard = ({
  image,
  movie,
}) => {
  const [close, setClose] = useState(false);

  const user = useSelector(selectUser);
  const name = user.name;

  const handleMouseOver = (e) => {
    const button = e.target.parentElement.firstChild;
    button.style.width="25px";
    button.style.opacity="100%";
  }

  const handleMouseOut = (e) => {
    const button = e.target.parentElement.firstChild;
    if (button.id !== "closeButton") {
      button.style.width="0";
      button.style.opacity="0";
    }
  }

  const handleClick = (e) => {
    e.target.parentElement.remove();
    console.log(name, movie);
    const configuration = {
      method: "delete",
      url: "http://localhost:5001/users/watchlist",
      data: {
        name,
        movie,
      },
    }
    axios(configuration)
      .then((result) => {

      })
  }

  return (
    <>
      <li id="watchlistImage" style={{position: "relative"}} >
        <button id="closeButton" onClick={handleClick}
          style={{
            position: "absolute", 
            background: "red",
            width: "0",
            height: "auto",
            top: "-12px",
            right: "-12px",
            textAlign: "center",
            margin: 0,
            borderRadius: "50%",
            opacity: 0,
            color: "white",
            border: "none",
            transition: "width 500ms ease, opacity 500ms ease",
          }}
        >
          X
        </button>
        <img src={image} alt="" style={{ height: "20vh", borderRadius: "5px"}} onMouseEnter={handleMouseOver} onMouseLeave={handleMouseOut} />
      </li>
    </>
  );
};

export default MovieCard
