import axios from "axios";
import React, { useEffect, useState } from "react";

const key = "movies";

const MovieCard = ({ movie }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=6cb855244bf89714c3f1fbc223b358c2&language=fr-FR`
      )
      .then((res) => setGenres(res.data.genres));
  }, []);

  const dateFormat = (date) => {
    let dateArray = date.split("-"); // let [yy,mm,dd] = date.split('-')
    return dateArray.reverse().join("/"); // [dd,mm,yy].join('/')
  };

  const getGenre = () => {
    const genreArray = [];

    if (movie.genre_ids) {
      for (let j = 0; j < movie.genre_ids.length; j++) {
        const movieGenreId = movie.genre_ids[j];
        for (let i = 0; i < genres.length; i++) {
          const genreId = genres[i].id;
          const genreName = genres[i].name;
          if (movieGenreId === genreId) {
            genreArray.push(genreName);
          }
        }
      }
    }
    return genreArray.map((genre, index) => <li key={index}>{genre}</li>);
  };

  // useLocaleStorage

  const addMovieLiked = () => {
    let storedData = localStorage.getItem(key)
      ? localStorage.getItem(key).split(",")
      : [];
    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id);
      localStorage.setItem(key, storedData);
    }
  };

  const deleteMovieLiked = (e) => {
    let storedData = localStorage.getItem(key)
      ? localStorage.getItem(key).split(",")
      : [];
    let newData = storedData.filter((id) => id != movie.id);
    localStorage.setItem(key, newData);
    location.reload();
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : `./img/poster.jpg`
        }
        alt="Affiche Film"
      />
      <h2>{movie.title}</h2>
      {movie.release_date ? (
        <h5>Sortie le : {dateFormat(movie.release_date)}</h5>
      ) : (
        ""
      )}
      <h4>
        {movie.vote_average}/10 <span style={{ fontSize: "20px" }}>✨</span>
      </h4>
      <ul>
        {movie.genre_ids
          ? getGenre()
          : movie.genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
      </ul>{" "}
      {movie.overview ? <h3>Synopsys :</h3> : ""}
      <p>{movie.overview}</p>
      {movie.genre_ids ? (
        <div className="btn" onClick={() => addMovieLiked()}>
          Ajouter aux coups de coeur
        </div>
      ) : (
        <div className="btn" onClick={() => deleteMovieLiked()}>
          Supprimer des favories
        </div>
      )}
    </div>
  );
};

export default MovieCard;
