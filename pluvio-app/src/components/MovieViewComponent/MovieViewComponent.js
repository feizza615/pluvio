import React, { Component, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-simple-tabs-component/dist/index.css";
import { Chip, Rating, Skeleton } from "@mui/material";
import styled from "styled-components";
import Card from "../Card";
import Watchlist from "../WatchlistComponent/WatchlistButton";
import ReactionButtons from "../ReccomendationComponents/ReactionButtons";
import axios from "axios";
import ReviewBox from "../ReviewBoxComponent/ReviewBox";
import { maxHeight } from "@mui/system";
import "./MovieViewComponent.css";

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

const divScroll = {
  height: "calc(65vh - 70px)",
  minHeight: "100%",
  overflowY: 'scroll',
  overflowX:'hide',
  
  '::-webkit-scrollbar':{
          display:'none'
      }



};



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "fit-content",
  color: "white",
  borderRadius: "15px",
  bgcolor: "#0B0725",
  boxSizing: "border-box",
  boxShadow: 15,
  p: 5,
 
  "@media (max-width: 640px)": {},
};

const TabOne = (props) => {
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
      return <ReactionButtons />;
    }
  }
  return (
    <>
      <Card style={{ width: "100%", height: "fit-content" }}>
        <RowContainer>
          {props.image ? (
            <img
              src={"https://image.tmdb.org/t/p/w500" + props.image}
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
          <div className="container">
            <h2 style={{ margin: "0px", textAlign: "left" }}>
              {props.title ? props.title : "Unknown"}
            </h2>
            <Rating
              name="read-only"
              precision={0.5}
              value={props.score / 2}
              readOnly
            />
            <br />
            {props.genre.map((gen, g) => (
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
              <h4>{props.watchlist}</h4>
              <h4>{props.duration ? timeConvert(props.duration) : ""}</h4>
              <h4>{props.release ? props.release : ""}</h4>
            </Container>
          </div>
        </RowContainer>
        <br/>
        <p style={{ textAlign: "left", fontSize: "16px" }}>
          {props.description ? props.description : ""}
        </p>
        <AddReviewWatch
          addVal={props.add ? props.add : false}
          id={props.id}
          title={props.title}
          image={props.image}
          description={props.description}
        />
      </Card>
      <LikeDislike react={props.react ? props.react : false} />
    </>
  );
};
const TabTwo = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState(null);
  let det = [];

  const configuration = {
    method: "get",
    url: "http://localhost:5001/reviews/movie/" + props.id,
  };


  React.useEffect(() => {
    axios(configuration)
      .then((result) => {
        det.push(JSON.parse(JSON.stringify(result.data)));
        det = det[0]
        setIsLoaded(true);
        setDetails(det);
      })
      .catch((error) => {
        error = new Error();
        setIsLoaded(false);
      });
    }, []);

  return (
    <>

       {isLoaded && details ? details.map((review, index) =>
        <ReviewBox reviewdata={review} />
      ) : <h1></h1>}

    </>
  );
};

// Tabs structure Array
const tabs = [
  {
    label: "Details", // Tab Title - String
    Component: TabOne, // Tab Body - JSX.Element
  },
  {
    label: "Reviews",
    Component: TabTwo,
  },
];
const MovieViewComponent = ({
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
  react,
}) => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Reviews</Tab>
        </TabList>
        <div style={divScroll} className="scrollDiv">
        <TabPanel>
          <TabOne
            tabs={tabs}
            title={title}
            release={release}
            score={score}
            genre={genre}
            duration={duration}
            description={description}
            image={image}
            watchlist={watchlist}
            id={id}
            add={true}
            react={false}
          />
        </TabPanel>
        <TabPanel>
          <TabTwo id={id}/>
        </TabPanel>
        </div>
      </Tabs>
    </div>
  );
};

export default MovieViewComponent;
