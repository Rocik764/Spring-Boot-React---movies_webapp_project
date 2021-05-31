import React, {useEffect, useState} from "react";
import {Col, Container, Form, Row} from 'react-bootstrap'
import MovieService from '../../service/MovieService'
import MovieCard from "../cards/MovieCard";

export default function MoviesList(props) {

    const [movies, setMovies] = useState()
    const [category, setCategory] = useState()

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

    const handleCategory = e => {
        if(e.target.value === 'All') {
            MovieService.listMovies().then(
                response => {
                    setMovies(response.data)
                },
                error => {
                    console.log(error.response)
                }
            )
        }
        else {
            MovieService.listMoviesByCategory(e.target.value).then(
                response => {
                    setMovies(response.data)
                },
                error => {
                    console.log(error.response)
                }
            )
        }
    }

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
        <Container className="pb-5">
            <Row className="pt-5">
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>Category</Form.Label>
                        <Form.Control as="select" value={category} onChange={handleCategory}>
                            <option value="All">All</option>
                            <option value="Documentaries">Documentaries</option>
                            <option value="Family">Family</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Horror">Horror</option>
                            <option value="Comedies">Comedies</option>
                            <option value="Action & Adventure">Action & Adventure</option>
                            <option value="Romantic">Romantic</option>
                            <option value="Dramas">Dramas</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="pt-3">
                {movieCards}
            </Row>
        </Container>
    )
}