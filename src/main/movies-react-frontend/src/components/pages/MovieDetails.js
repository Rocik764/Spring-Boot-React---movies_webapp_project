import React, {useState} from "react";
import {Button, Col, Container, Form, Row, Table, ListGroup} from 'react-bootstrap'
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

    const directors = props.movie.directors.map((element, i) => {
        return (
            <ListGroup.Item>{element}</ListGroup.Item>
        );
    });

    const actors = props.movie.actors.map((element, i) => {
        return (
            <tr>
                <td>{++i}</td>
                <td>{element.name}</td>
                <td>{element.second_name}</td>
                <td>{element.role}</td>
            </tr>
        );
    });

    return (
        <Container>
            <Row className="pt-5">
                <Col>
                    <img src={props.movie.url} width={500} height={700} alt={props.movie.title} />
                </Col>
                <Col>
                    <h1>{props.movie.title}</h1>
                    <p>{props.movie.description}</p>
                    <h4>Directors</h4>
                    <ListGroup variant="flush">
                        {directors}
                    </ListGroup>
                    <h4 className="mt-3">Actors</h4>
                    <Table striped bordered hover>
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
                    <div>

                    </div>
                </Col>
            </Row>
            <Row>
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