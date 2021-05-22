import React from 'react';
import './MovieCard.css'
import { history } from '../../helpers/history'

const MovieCard = ({id, title, url, movie}) => {

    function showMovie() {
        localStorage.setItem("movie", JSON.stringify(movie));
        history.push("/movieDetails");
        window.location.reload();
    }

    return(
        <>
            <div className="movie-card-container" onClick={() => showMovie()}>
                <img className="movie-card-image" src={url} alt="some img"/>
                <div className="card-img-overlay d-flex flex-column justify-content-end text-center">
                    <div className="movie-card-shadow">
                        <h1 className="movie-card-title">{title}</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieCard