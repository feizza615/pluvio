import React, { Component } from 'react'
import MovieCard from '../../components/MovieCard';
import Card from '../../components/Card';
import "styled-components";
import Watchlist from "../../components/Watchlist";
import Tag from '../../components/TagComponent/Tag';

//Testing Sample Data for MovieCard
const data = {
  title: "Despicable Me 3",
  release: "June 30, 2017",
  score: 8,
  genre: [{name:"Genre"}],
  duration: "120",
  description: "Despicable Me 3 is a 2017 American computer-animated comedy film produced by Illumination and distributed by Universal Pictures. It is the sequal to Despicable Me 2, the third main installment, and the fourth installment overall in the Despicable Me."
};

export default class FriendsPage extends Component {
  render() {
    return (
      //<h1>FriendsPage</h1>
      //Testing MovieCard.js Here
      <MovieCard
        title={data.title}
        release={data.release}
        score={data.score}
        genre={data.genre}
        duration={data.duration}
        description={data.description}
      />
    )
  }
}
