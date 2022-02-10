import axios from "axios";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const MovieDetail = ({ movieSelected, setSelectMovie }) => {
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
    const API_URL = "https://api.themoviedb.org/3/movie";
    const [genres, setGenres] = useState([]);
    const [video, setVideo] = useState();
    const [playTrailer, setPlayTrailer] = useState(false);

    const fetchVedio = async () => {
        const { data } = await axios.get(`${API_URL}/${movieSelected.id}`, {
            params: {
                api_key: "6cb855244bf89714c3f1fbc223b358c2",
                append_to_response: "videos",
            },
        });

        return setVideo(data.videos);
    };

    useEffect(() => {
        fetchVedio();
    }, []);

    useEffect(async () => {
        await axios
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

        if (movieSelected.genre_ids) {
            for (let j = 0; j < movieSelected.genre_ids.length; j++) {
                const movieGenreId = movieSelected.genre_ids[j];
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
    const renderTrailer = () => {
        const trailer = video.results.find(
            (vid) => vid.name === "Official Trailer"
        );
        const key = trailer ? trailer.key : video.results[0].key;

        // console.log(trailer.key);
        return (
            <YouTube
                videoId={key}
                containerClassName={"youtube-container"}
                opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1,
                        controls: 0,
                    },
                }}
            />
        );
    };

    ////===============================================================
    return (
        <div
            className="movieSelected"
            style={{
                backgroundImage: movieSelected.backdrop_path
                    ? `linear-gradient(90deg,
        hsla(236, 47%, 49%, 0.8) 0%,
        hsla(235, 45%, 67%, 0.5) 64%,
        hsla(180, 6%, 97%, 0.3) 100%),url('${IMAGE_PATH}${movieSelected.backdrop_path}')`
                    : `./img/poster.jpg`,
            }}
        >
            {playTrailer ? (
                <button
                    className="btn-close-trailer"
                    onClick={() => setPlayTrailer(false)}
                >
                    Close
                </button>
            ) : null}
            {video && playTrailer ? renderTrailer() : null}
            <div className="title">
                <button
                    className="btn-play-trailer"
                    onClick={() => setPlayTrailer(true)}
                >
                    Play Trailer
                </button>
                <h1> {movieSelected.title}</h1>
            </div>

            <h2>
                {movieSelected.vote_average}/10{" "}
                <span style={{ fontSize: "20px" }}>✨</span>
            </h2>
            <ul>
                {movieSelected.genre_ids
                    ? getGenre()
                    : movieSelected.genres.map((genre, index) => (
                          <li key={index}>{genre.name}</li>
                      ))}
            </ul>
            {movieSelected.release_date ? (
                <h3>Sortie le : {dateFormat(movieSelected.release_date)}</h3>
            ) : (
                ""
            )}
            {movieSelected.overview ? <h2>Synopsys :</h2> : ""}
            <p>{movieSelected.overview}</p>
            <button
                className="btn-go-home"
                on
                onClick={() => {
                    setSelectMovie(null);
                }}
            >
                Go To Home
            </button>
        </div>
    );
};

export default MovieDetail;
