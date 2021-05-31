import React from "react";
import {Form, Button, Col, Row, Accordion, Card, Table, Container} from 'react-bootstrap'
import MovieService from "../../service/MovieService";
import AdminMovieService from "../../service/admin/AdminMovieService";
import {history} from "../../helpers/history";

export default class ManageMovies extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: []
        };

        this.handleCategory = this.handleCategory.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
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

    handleCategory(event) {
        if(event.target.value === 'All') {
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
        else {
            MovieService.listMoviesByCategory(event.target.value).then(
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
    }

    deleteMovie(id) {
        AdminMovieService.deleteMovie(id).then(
            response => {
                window.location.reload();
            },
            error => {
                alert(error.response.data)
            }
        )
    }

    setMovie(movie) {
        localStorage.setItem("movie", JSON.stringify(movie));
        history.push("/editMovie");
        window.location.reload();
    }

    render() {

        let movies = []
        if(typeof this.state.movies !== 'undefined') {
            movies = this.state.movies.map((element, i) => {
                i++
                return (
                    <Card key={i++}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey={i}>
                                {element.title}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={i}>
                            <Card.Body>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{element.title}</td>
                                            <td>{element.description}</td>
                                            <td>{element.category}</td>
                                            <td><img src={element.url} alt={element.title} width={100} height={100}/></td>
                                            <td>
                                                <Button variant="danger" onClick={() => this.setMovie(element)}>Edit</Button>
                                                <Button variant="danger" onClick={() => this.deleteMovie(element.id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                );
            });
        }

        return (
            <Container className="pb-5">
                <Row className="pt-5">
                    <Col>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={this.state.category} onChange={this.handleCategory}>
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
                <Row>
                    <Col>
                        <Accordion defaultActiveKey="0">
                            {movies}
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        )
    }
}