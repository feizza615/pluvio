import React from "react";
import MovieCard from '../../components/MovieCard';

const data = {
  title: "Despicable Me 3",
  release: "June 30, 2017",
  score: 8,
  genre: [{ name: "Genre" }],
  duration: "120",
  description:
    "DespicableDespicable Me 3 is a 2017 American computer-animated comedy film produced by Illumination and distributed by Universal Pictures. It is the sequal to Despicable Me 2, the third main installment, and the fourth installment overall in the Despicable Me.",
};

const MatchPage = () => {
  return (
    <div>
      <MovieCard
        title={data.title}
        release={data.release}
        score={data.score}
        genre={data.genre}
        duration={data.duration}
        description={data.description}
        add={true}
        react={true}
      />
      <div>

      </div>
    </div>
  );
};

export default MatchPage;
