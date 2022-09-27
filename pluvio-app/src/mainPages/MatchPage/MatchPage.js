import axios from "axios";
import React, { useEffect, useState } from "react";
import {config} from "../../config"
import MovieCard from "../../components/MovieCard";
import { Chip, Pagination, Rating } from '@mui/material';
import Watchlist from "../../components/Watchlist";
const baseURL = "https://api.themoviedb.org/3/movie/top_rated?api_key="+config.DB_KEY;

const Movies = ({data, page}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState(null)
  let results = data.results;

  useEffect(()=> {
    console.log("...")
    let det = []
    async function test() {
      setIsLoaded(false)
      for(var i=0;i<results.length;i++) {
        axios
          .get("https://api.themoviedb.org/3/movie/"+results[i].id+"?api_key="+config.DB_KEY)
          .then((response) => {
            det.push(JSON.parse(JSON.stringify(response.data)));
        })
      }
    }
    test().then(
      setDetails(det),
      setIsLoaded(true))
  },[page])

  function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hr " + rminutes + " min";
    }

  return(
    <>    
      <div style={{display:"flex",flexDirection:"column", gap:"20px"}}>
        {isLoaded && details ? details.map((movie,x) =>
        <Watchlist>
            <MovieCard 
              // watchlist = {<Watchlist/>}
              key={movie.title}
              id={movie.id}
              title={movie.title}
              description={movie.overview}
              image={movie.poster_path}
              release={movie.release_date}
              score={<Rating name="read-only" precision={0.5} value={movie.vote_average/2} readOnly />}
              genre={movie.genres.map((gen,g)=> <Chip key={g} sx={{background:"#180F53",color:"white",margin:"5px",fontFamily:"Poppins"}} label={gen.name} />)}
              duration={timeConvert(movie.runtime)}
              
            /></Watchlist>
            
        ) : <h1>Loading...</h1>}
      </div>
    </>
  )
}

export default function MatchPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [test, setTest] = useState(true)

  React.useEffect(() => {
    axios
      .get(baseURL+"&language=en-US&page="+page)
      .then((response) => {
        setPost(JSON.parse(JSON.stringify(response.data)));
        console.log("reloading.."+page)
        setLoading(false);
    });
  }, [page]);

  const handleChange = (e, v) => {
    e.preventDefault()
    window.localStorage.setItem("page", page)
    setPage(v);
  }

  return (
    <>
      <div>
        <Pagination sx={{"button":{color:"white"},"& button.Mui-selected":{background: "#180F53"}}} page={page} onChange={handleChange} count={100} />
        {loading ? <h1>Loading...</h1> : <Movies data={post} page={page}/>}
        <Pagination sx={{"button":{color:"white"},"& button.Mui-selected":{background: "#180F53"}}} page={page} onChange={handleChange} count={100} />
      </div>
      
    </>
  );
}