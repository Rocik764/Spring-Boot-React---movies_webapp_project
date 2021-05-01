import React, {useState} from 'react';
import './MovieCard.css'
import MovieCardModal from './MovieCardModal';

const MovieCard = ({title, description, url}) => {

    const [isOpen, setIsOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return(
        <>
            <div className="movie-card-container" onClick={showModal}>
                <img className="movie-card-image" src={url} alt="some img"/>
                <div className="card-img-overlay d-flex flex-column justify-content-end text-center">
                    <div className="movie-card-shadow">
                        <h1 className="movie-card-title">{title}</h1>
                    </div>
                </div>
            </div>
            <MovieCardModal showModal={isOpen} hideModal = {hideModal} title={title} description={description} url={url}/>
        </>
    );
}

export default MovieCard