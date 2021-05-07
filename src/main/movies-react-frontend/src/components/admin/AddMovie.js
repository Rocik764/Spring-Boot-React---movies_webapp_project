import React, {useState} from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import AdminMovieService from '../../service/admin/AdminMovieService'

export default function AddMovie(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')
    const [category, setCategory] = useState('')

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
        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('file', file)

        AdminMovieService.addMovie(formData).then(
            (response) => {
                props.history.push("/list");
                window.location.reload();
            }, error => {
                alert(error.response.data)
            })
    }

    return (
        <Container>
            <Row className="pt-5">
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