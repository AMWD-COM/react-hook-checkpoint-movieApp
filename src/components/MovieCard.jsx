import React from "react";

const key = "movies";

const MovieCard = ({ movie, selectMovie }) => {
    //// useLocaleStorage

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
                onClick={() => selectMovie(movie)}
            />
            <h2>{movie.title}</h2>

            {movie.genre_ids ? (
                <div className="btn" onClick={() => addMovieLiked()}>
                    J'AIME 👍
                </div>
            ) : (
                <div className="btn" onClick={() => deleteMovieLiked()}>
                    👎 J'AIME PAS
                </div>
            )}
        </div>
    );
};

export default MovieCard;
