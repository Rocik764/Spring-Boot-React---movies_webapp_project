import React, {useState} from "react";
import {Button, Col, Container, Form, Row, Table, ListGroup} from 'react-bootstrap'
import {connect} from "react-redux";
import MovieService from "../../service/MovieService";
import Rate from 'react-star-rating-component';

function MovieDetails(props) {

    const [comment, setComment] = useState('')
    const [movie, setMovie] = useState(JSON.parse(localStorage.getItem("movie")))
    const [rate, setRate] = useState(1)

    React.useEffect(() => {
        let finalRate = 0
        for(let i = 0; movie.rates.length > i; i++) {
            finalRate += movie.rates[i].rate
        }
        finalRate = finalRate / movie.rates.length
        setRate(finalRate)
    }, [])

    const handleComment = e => {
        setComment(e.target.value)
    }

    const onStarClick = e => {
        if(!props.user) {
            alert("You must be logged in to do that")
            return ;
        }
        MovieService.rateMovie(movie.id, props.user.user.id, rate).then(
            (response) => {
                alert(response.data)
            },
            (error) => {
                alert(error.response.data)
            }
        )
    }

    const onStarHover = e => {
        setRate(e)
    }

    const handleSubmit = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('userId', props.user.user.id)
        formData.append('content', comment)

        MovieService.postComment(movie.id, formData).then(
            () => {
                MovieService.getMovie(movie.id).then(
                    (response) => {
                        localStorage.setItem("movie", JSON.stringify(response.data));
                        setMovie(response.data)
                    },
                    (error) => {
                        alert(error.response.data)
                    }
                )
            },
            (error) => {
                alert(error.response.data)
            }
        );
    }

    const directors = movie.directors.map((element, i) => {
        return (
            <ListGroup.Item key={i}>{element}</ListGroup.Item>
        );
    });

    const actors = movie.actors.map((element, i) => {
        return (
            <tr key={i}>
                <td>{++i}</td>
                <td>{element.name}</td>
                <td>{element.second_name}</td>
                <td>{element.role}</td>
            </tr>
        );
    });

    const comments = movie.comments.map((element, i) => {
        return (
            <ListGroup.Item key={i}>
                <b>{element.user.email}</b> {element.date} <br/>{element.content}
            </ListGroup.Item>
        )
    })

    return (
        <Container className="pb-5">
            <Row className="pt-5">
                <Col md={6}>
                    <img className="movie-image" src={movie.url} alt={movie.title} />
                </Col>
                <Col md={6}>
                    <h1>{movie.title}</h1>
                    <div style={{fontSize: 34}}>
                    <Rate
                        name="rate1"
                        starCount={5}
                        value={rate}
                        onStarClick={onStarClick}
                        onStarHover={onStarHover}
                    />
                    </div>
                    <p>{movie.description}</p>
                    <h4>Directors</h4>
                    {directors.length !== 0 ? (
                        <ListGroup variant="flush">
                            {directors}
                        </ListGroup>
                    ) : (
                        <p>No directors added</p>
                    )}
                    <h4 className="mt-3">Actors</h4>
                    {actors.length !== 0 ? (
                    <Table striped bordered hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Role</th>
                        </tr>
                        </thead>
                        <tbody>
                            {actors}
                        </tbody>
                    </Table>
                    ) : (
                        <p>No actors added</p>
                    )}
                </Col>
            </Row>
            <Row className="pt-4">
                <Col>
                    <h4>Comments</h4>
                    {comments.length !== 0 ? (
                    <ListGroup>
                        {comments}
                    </ListGroup>) : ( <p>No comments yet</p>)}
                </Col>
            </Row>
            {props.user ? (
                <Row className="pt-3">
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Add comment</Form.Label>
                                <Form.Control as="textarea" rows={3} value={comment} onChange={handleComment} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Post comment
                            </Button>
                        </Form>
                    </Col>
                </Row>
            ) : (
                <></>
            )}
        </Container>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(MovieDetails);