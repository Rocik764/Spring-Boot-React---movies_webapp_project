import React, {useState} from 'react';
import './MovieCard.css'
import {setMovie} from "../../actions/adminMoviesAction";
import {connect} from "react-redux";
import { history } from '../../helpers/history'

const MovieCard = ({id, title, url, dispatch}) => {

    function showMovie(id) {
        dispatch(setMovie(id)).then(
            () => {
                console.log("XD")
                history.push("/movieDetails");
                window.location.reload();
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

function mapStateToProps(state) {
    const { movie } = state.adminMoviesReducer;
    return {
        movie
    };
}

export default connect(mapStateToProps)(MovieCard);