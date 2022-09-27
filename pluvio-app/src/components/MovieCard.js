import React from 'react'
import Card from './Card'
import styled from "styled-components";
import { Skeleton } from '@mui/material';
import ReviewForm from './ReviewFormComponent/ReviewForm';
import { Chip, Rating, Skeleton } from '@mui/material';

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

const MovieCard = ({
  title,
  release,
  score,
  genre,
  duration,
  description,
  image,
  id
}) => {

  if (release) {
    const [year, month, day] = release.split('-')
    release = new Date([month, day, year].join('/'))
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    var n = release.toLocaleDateString('en-US', options);
    release = n.replace(new RegExp(',', 'g'), ' ')
  }

  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hr " + rminutes + " min";
    }

  return (
    <Card style={{width: "auto"}}>
      <RowContainer>
      {image ? <img src={"https://image.tmdb.org/t/p/w500"+image} alt="" style={{height:"20vh",borderRadius:"5px"}}/> :<Skeleton  sx={{ bgcolor: '#333', borderRadius: "15px" }} variant="rounded" width={150} height={200}/>}
      <div className="container">
        <h2 style={{margin: "0px", textAlign: "left"}}>{title ? title : "Unknown"}</h2>
        <Rating name="read-only" precision={0.5} value={score/2} readOnly /><br />
        {genre.map((gen,g)=> <Chip key={g} sx={{background:"#180F53",color:"white",margin:"5px",fontFamily:"Poppins"}} label={gen.name} />)}
        <Container>
          <h4>{duration ? timeConvert(duration) : ""}</h4> 
          <h4>{release ? release : ""}</h4> 
        </Container>
      </div>
      </RowContainer>
      <p style={{textAlign: "left", fontSize: "16px", padding: "20px",
      }}>{description ? description : ""}</p>
      <br/>
      <div style={{float: "right", transform: "scale(0.8)",}}><ReviewForm/></div>
    </Card>
  )
}

export default MovieCard;