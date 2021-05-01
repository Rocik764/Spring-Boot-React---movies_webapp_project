import React from "react";
import {Col, Row} from 'react-bootstrap'
import MovieService from '../../service/MovieService'
import MovieCard from "../cards/MovieCard";

export default class AddMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };
    }

    componentDidMount() {
        MovieService.listMovies().then(
            response => {
                this.setState({
                    movies: response.data
                })
            },
            error => {
                console.log(error.response)
            }
        )
    }

    render() {

        let movies = []
        if(typeof this.state.movies !== 'undefined') {
            movies = this.state.movies.map((element, i) => {
                return (
                    <Col xl={3} key={i}>
                        <MovieCard title={element.title} description={element.description} url={element.url}/>
                    </Col>
                );
            });
        }

        return (
            <Row className="pt-5">
                {movies}
            </Row>
        )
    }
}