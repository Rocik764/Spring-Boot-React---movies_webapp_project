import React from 'react';
import './MovieCard.css'
import {connect} from "react-redux";
import { history } from '../../helpers/history'
import MovieService from "../../service/MovieService";

const MovieCard = ({id, title, url, dispatch}) => {

    function showMovie(id) {
        MovieService.getMovie(id).then(
            (response) => {
                localStorage.setItem("movie", JSON.stringify(response.data));
                history.push("/movieDetails");
                window.location.reload();
            },
            (error) => {
                alert(error.response.data)
            }
        )
    }

    return(
        <>
            <div className="movie-card-container" onClick={() => showMovie(id)}>
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