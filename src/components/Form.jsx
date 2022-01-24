import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const Form = () => {
  const [movieData, setMovieData] = useState([]);
  const [search, setSearch] = useState("a");
  const [goodOrBad, setGoodOrBad] = useState(null);
  
 

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=6cb855244bf89714c3f1fbc223b358c2&query=${search}&language=fr-FR&append_to_response`
      )
      .then((res) => setMovieData(res.data.results));
  }, [search, goodOrBad]);

  return (
    <div>
      <div className="form-component">
        <div className="form-container">
          <form>
            <input
              type="text"
              name=""
              id="search-input"
              placeholder="Enter le titre d'un film"
              onChange={(e) => setSearch(e.target.value)}
            />
            <input type="submit" value="Rechercher" />
          </form>
          <div className="btn-sort-container">
            <div
              className="btn-sort"
              id="goodToBad"
              onClick={() => setGoodOrBad("goodToBad")}
            >
              Top <span>➠</span>
            </div>
            <div
              className="btn-sort"
              id="badToGood"
              onClick={() => setGoodOrBad("badToGood")}
            >
              Flop <span>➠</span>
            </div>
          </div>
        </div>
      </div>
      <div className="result">
        {movieData
          .sort((a, b) => {
            if (goodOrBad === "goodToBad") {
             return b.vote_average - a.vote_average;
            } else if (goodOrBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
          })
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Form;
