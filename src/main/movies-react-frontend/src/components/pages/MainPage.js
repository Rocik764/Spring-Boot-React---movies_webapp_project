import React, {useEffect, useState} from "react";
import {Col, Container, Form, Row} from 'react-bootstrap'
import MovieService from '../../service/MovieService'
import MovieCard from "../cards/MovieCard";

export default function MainPage(props) {

    const [movies, setMovies] = useState()
    const [mostCommented, setMostCommented] = useState()

    useEffect(() => {
        MovieService.listTopRated().then(
            response => {
                setMovies(response.data)
            },
            error => {
                console.log(error.response)
            }
        )

        MovieService.listMostCommented().then(
            response => {
                setMostCommented(response.data)
            },
            error => {
                console.log(error.response)
            }
        )

    }, [])

    let movieCards = []
    if(typeof movies !== 'undefined') {
        movieCards = movies.map((element, i) => {
            return (
                <Col xl={3} md={4} sm={6} key={i}>
                    <MovieCard id={element.id} title={element.title} url={element.url} movie={element} />
                </Col>
            );
        });
    }

    let mostCommentedMovieCards = []
    if(typeof mostCommented !== 'undefined') {
        mostCommentedMovieCards = mostCommented.map((element, i) => {
            return (
                <Col xl={3} md={4} sm={6} key={i}>
                    <MovieCard id={element.id} title={element.title} url={element.url} movie={element} />
                </Col>
            );
        });
    }

    return (
        <>
            <Container className="pb-5">
                <h1 className="pt-5">Top rated</h1>
                <Row className="pt-2">
                    {movieCards}
                </Row>
                <h1 className="pt-5">Most commented</h1>
                <Row className="pt-2">
                    {mostCommentedMovieCards}
                </Row>
            </Container>
        </>
    )
}