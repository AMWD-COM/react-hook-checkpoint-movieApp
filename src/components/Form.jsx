import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";

const Form = () => {
    const API_URL = "https://api.themoviedb.org/3/movie";

    const [movieData, setMovieData] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [search, setSearch] = useState("a");
    const [goodOrBad, setGoodOrBad] = useState(null);
    const [selectMovie, setSelectMovie] = useState(null);

   
    useEffect(() => {
        axios
            .get(
                `https://api.themoviedb.org/3/search/movie?api_key=6cb855244bf89714c3f1fbc223b358c2&query=${search}&language=fr-FR&append_to_response`
            )
            .then((res) => setMovieData(res.data.results));
    }, [search, goodOrBad, selectMovie]);

    const handleSubmit = (e) => {
        e.preventDefault();
        searchValue ? setSearch(searchValue) : setSearch("a");
    };

    return (
        <div>
            {selectMovie ? (
                <MovieDetail
                    movieSelected={selectMovie}
                    setSelectMovie={setSelectMovie}
                />
            ) : (
                <div className="form-component">
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="search-input"
                                placeholder="Enter le titre d'un film"
                                onChange={(e) => setSearchValue(e.target.value)}
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
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                    selectMovie={setSelectMovie}
                                />
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Form;
