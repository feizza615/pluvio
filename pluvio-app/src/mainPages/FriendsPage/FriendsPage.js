import React, { Component } from 'react'
import MovieCard from '../../components/MovieCard';
import Card from '../../components/Card';
import "styled-components";

//Testing Sample Data for MovieCard
const data = {
  title: "Despicable Me 3",
  release: "June 30, 2017",
  platform: "Netflix, Hulu",
  score: "8/10",
  rating: "PG-13",
  genre: "Comedy, Children",
  duration: "2 Hours",
  description: "blah blah blah"
};

export default class FriendsPage extends Component {
  render() {
    return (
      //<h1>FriendsPage</h1>
      //Testing MovieCard.js Here
      <div className="App">
      <MovieCard
        title={data.title}
        release={data.release}
        platform={data.platform}
        score={data.score}
        rating={data.rating}
        genre={data.genre}
        duration={data.duration}
        decsription={data.description}
      />
    </div>
    )
  }
}
