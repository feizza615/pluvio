import React from 'react'
import Card from './Card'
import styled from "styled-components";

//Review Button not implemented

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  h4 {
    width: 50%;
    box-sizing: border-box;
    text-align: left;
    margin: 5px 0;
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
  width: 300px;
  height: 200px;
  background: red;
  border-radius: 15px;
`;

const MovieCard = ({
  title,
  release,
  platform,
  score,
  rating,
  genre,
  duration,
  description,
}) => {
  return (
    <Card style={{width: "800px"}}>
      <RowContainer>
        <Image />
        <div className="container">
          <h2 style={{marginBottom: "5px", textAlign: "left" }}>{title}</h2>
          <Container>
            <h4>Release: {release} </h4> 
            <h4>Rating: {rating} </h4> 
            <h4>Platform: {platform} </h4> 
            <h4>Genre: {genre} </h4> 
            <h4>Rating: {rating} </h4> 
            <h4>Duration: {duration} </h4> 
          </Container>
        </div>
      </RowContainer>
      <p style={{textAlign: "left", fontSize: "20px", padding: "20px"}}>{description}</p>
    </Card>
  )
}

export default MovieCard