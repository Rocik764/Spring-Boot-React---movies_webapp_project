import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from 'react-bootstrap'
import MovieService from "../../service/MovieService";
import {connect} from "react-redux";

function MovieDetails(props) {

    const [comment, setComment] = useState('')

    const handleComment = e => {
        setComment(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('comment', comment)

        // MovieService.postComment(formData).then(
        //     (response) => {
        //         alert(response.data)
        //     }, error => {
        //         alert(error.response.data)
        //     })
    }

    return (
        <Container>
            <Row className="pt-5">
                <Col>
                    <img src={props.movie.url} width={500} height={700} alt={props.movie.title} />
                </Col>
                <Col>
                    <h1>{props.movie.title}</h1>
                    <p>{props.movie.description}</p>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Comment</Form.Label>
                            <Form.Control as="textarea" rows={3} value={comment} onChange={handleComment} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Post comment
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    const { movie } = state.adminMoviesReducer;
    return {
        movie
    };
}

export default connect(mapStateToProps)(MovieDetails);