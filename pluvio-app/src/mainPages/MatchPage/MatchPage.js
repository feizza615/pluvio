import axios from "axios";
import React, { useState } from "react";
import {config} from "../../config"
import NavigationBar from "../../components/NavigationBarComponent/NavigationBar";

const baseURL = "https://api.themoviedb.org/3/movie/popular?api_key="+config.DB_KEY;

const Movies = (data) => {
  let results = data.data.results;
  return(
    <>
      {results.map((movie,x) => 
        <div style={{display: "flex", alignItems: "center"}}>
          <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
          <img src={"https://image.tmdb.org/t/p/w500"+movie.poster_path} alt={movie.poster_path}
          style={{height: "20vh",borderRadius: "5px"}}
          ></img>
        </div>
      )}
    </>
  )
}

export default function MatchPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPost(JSON.parse(JSON.stringify(response.data)));
        console.log("data found!")
        setLoading(false);
    });
  }, []);

  return (
    <>
      <div>
        {loading ? <h1>Loading...</h1> : <Movies data={post}/>}
      </div>
      
    </>
  );
}