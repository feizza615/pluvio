import axios from "axios";
import React, { useEffect, useState } from "react";
import { config } from "../../config";
import MovieCard from "../../components/MovieCard";
import { Chip, CircularProgress, LinearProgress, Pagination, Rating } from "@mui/material";
import Watchlist from "../../components/WatchlistComponent/WatchList";
import ButtonComponent from "../../components/LoginComponent/ButtonComponent";
import styled from "styled-components";


const baseURL =
  "https://api.themoviedb.org/3/search/movie?api_key=" + config.DB_KEY;

export const InputField = styled.input`
  width: 250px;
  height: 40px;
  margin-right: 20px;
  border-radius: 15px;
  border: none;
  outline: none;
  padding: 10px 15px;
  font-size: 1em;
  font-family: "Poppins";
  box-sizing: border-box;
  transition: box-shadow 500ms ease, transform 500ms ease;

  &:focus {
    box-shadow: 5px 5px 0px 2px #4930ff;
    transform: translateY(-5px);
  }
`;

const Movies = ({ data, page }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState(null);
  

  let results = data.results;

  useEffect(() => {
    console.log("...");
    let det = [];
    setIsLoaded(false);
    async function test() {
      for (var i = 0; i < results.length; i++) {
        await axios
          .get(
            "https://api.themoviedb.org/3/movie/" +
              results[i].id +
              "?api_key=" +
              config.DB_KEY
          )
          .then((response) => {
            det.push(JSON.parse(JSON.stringify(response.data)));
          });
      }
      setDetails(det)
    }
    test().then(
      console.log(data.movie),
      setIsLoaded(true)
    );
  }, [data]);


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {isLoaded && details ? (
          details.map((movie, x) => (
          <>
              <div>
              <MovieCard
                key={x}
                id={movie.id}
                title={movie.title}
                description={movie.overview}
                image={movie.poster_path}
                release={movie.release_date}
                score={movie.vote_average}
                genre={movie.genres}
                duration={movie.runtime}
                add={true}

              />
              </div>
              
            </>
      
          ))
        ) : (
          <LinearProgress /> 
        )
        
        
        }
         
        
      </div>
    </>
  );
};

export default function MoviesPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movie, setMovie] = useState("spiderman");
  const [submit, setSubmit] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    console.log(movie, page)
    axios
      .get(
        baseURL +
          "&language=en-US&query=" +
          movie +
          "&page=" +
          page +
          "&include_adult=false"
      )
      .then((response) => {
        setPost(JSON.parse(JSON.stringify(response.data)));
        setLoading(false);
        console.log(post);

      })
  }, [page,movie]);

  const handleChange = (e, v) => {
    e.preventDefault();
    window.localStorage.setItem("page", page);
    setPage(v);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmit(!submit);
    setPage(1);
    console.log(page,movie);
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <form onSubmit={handleSubmit}>
          <InputField
            type="search"
            onChange={(event) => setMovie(event.target.value)}
          />
          <ButtonComponent
            type="submit"
            style={{
              height: "30px",
              width: "100px",
              borderRadius: "25px 25px",
              fontSize: "15px",
            }}
          >
            {" "}
            SEARCH{" "}
          </ButtonComponent>
        </form>
        <Pagination
          sx={{
            button: { color: "white" },
            "& button.Mui-selected": { background: "#180F53" },
          }}
          page={page}
          onChange={handleChange}
          count={loading ? totalPages : post.total_pages}
        />
        {loading ? <LinearProgress />  : <Movies data={post} page={page} />}
        <Pagination
          sx={{
            button: { color: "white" },
            "& button.Mui-selected": { background: "#180F53" },
          }}
          page={page}
          onChange={handleChange}
          count={loading ? totalPages : post.total_pages}
        />
      </div>
    </>
  );
}