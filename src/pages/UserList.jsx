import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const key = "movies";


const UserList = () => {

  const [dataList, setDataList] = useState([]);

  useEffect(() => {

    let movieId = localStorage.getItem(key)
      ? localStorage.getItem(key).split(",")
      : [];
    
    for (let i = 0; i < movieId.length; i++) {
      const id = movieId[i];

      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=6cb855244bf89714c3f1fbc223b358c2&language=fr-FR`
        )
        .then((res) => setDataList((dataList) => [...dataList, res.data]));
    }
  }, []);

  return (
    <div className="user-list-page">
      <h2>
        <span>💗</span>Coup de coeur <span>💗</span>{" "}
      </h2>
      <div className="result">
        {dataList.length > 0 ? (
          dataList.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        ) : (
          <h2>Aucun coup de coeur pour le moment</h2>
        )}
      </div>
    </div>
  );
};

export default UserList;
