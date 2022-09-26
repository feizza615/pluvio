import React from 'react'
import Card from './Card'
import styled from "styled-components";
import { Skeleton } from '@mui/material';

//Review Button not implemented

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  h4 {
    box-sizing: border-box;
    text-align: left;
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

const MovieCard = ({
  title,
  release,
  score,
  genre,
  duration,
  description,
  image,
  watchlist,
  id
}) => {
  return (
    <Card style={{width: "auto"}}>
      <RowContainer>
      {image ? <img src={"https://image.tmdb.org/t/p/w500"+image} alt="" style={{height:"20vh",borderRadius:"5px"}}/> :<Skeleton  sx={{ bgcolor: 'blue', borderRadius: "15px" }} variant="rounded" width={150} height={200}/>}
      <div className="container">
        <h2 style={{margin: "0px", textAlign: "left"}}>{title ? title : "One Piece"}</h2>
        {score}<br />
        {genre}
        <Container>
          <h4>{duration ? duration : "20 min"}</h4> 
          <h4>{release ? release : "tomorrow"}</h4> 
          <h4>{watchlist}</h4>
        </Container>
      </div>
      </RowContainer>
      <p style={{textAlign: "left", fontSize: "16px", padding: "20px",
      }}>{description ? description : "One Piece"}</p>
    </Card>
  )
}

export default MovieCard;