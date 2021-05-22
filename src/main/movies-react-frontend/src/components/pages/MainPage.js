import React, {useEffect, useState} from "react";
import {Col, Container, Row} from 'react-bootstrap'
import MovieService from '../../service/MovieService'
import MovieCard from "../cards/MovieCard";

export default function MainPage(props) {

    const [movies, setMovies] = useState()

    useEffect(() => {
        MovieService.listMovies().then(
            response => {
                setMovies(response.data)
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

    return (
        <>
            <Container>
                <h1 className="pt-5">Top rated</h1>
                <Row className="pt-2">
                    {movieCards}
                </Row>
            </Container>
            <Container>
                <h1 className="pt-5">Most commented</h1>
            </Container>
        </>
    )
}