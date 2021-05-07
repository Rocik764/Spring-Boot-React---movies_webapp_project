import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import AdminMovieService from "../../service/admin/AdminMovieService";
import {connect} from "react-redux";
import {setMovie} from "../../actions/adminMoviesAction";

function EditMovies(props) {

    const [id, setId] = useState(props.movie.id)
    const [title, setTitle] = useState(props.movie.title)
    const [description, setDescription] = useState(props.movie.description)
    const [category, setCategory] = useState(props.movie.category)
    const [file, setFile] = useState(props.movie.file)
    const [url, setUrl] = useState(props.movie.url)

    const handleTitle = e => {
        setTitle(e.target.value)
    }

    const handleDescription = e => {
        setDescription(e.target.value)
    }

    const handleCategory = e => {
        setCategory(e.target.value)
    }

    const handleImage = e => {
        setFile(e.target.files[0])
    }

    const handleSubmit = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('id', id)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('file', file)

        AdminMovieService.editMovie(formData).then(
            (response) => {
                alert(response.data)
            }, error => {
                alert(error.response.data)
            })
    }

    return (
        <Container>
            <Row className="pt-5">
                <Col>
                    <img src={url} width={500} height={700} alt={title} />
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" value={title} onChange={handleTitle} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description} onChange={handleDescription} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={category} onChange={handleCategory}>
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
                        <Form.Group>
                            <Form.File id="file" label="Image" onChange={handleImage} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
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

export default connect(mapStateToProps)(EditMovies);