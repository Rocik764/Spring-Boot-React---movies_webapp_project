import React from "react";
import {Form, Button, Col, Row} from 'react-bootstrap'
import AdminMovieService from '../../service/admin/AdminMovieService'

export default class AddMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            file: '',
            category: ''
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleImage = this.handleImage.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitle(event) {
        this.setState({title: event.target.value})
    }

    handleDescription(event) {
        this.setState({description: event.target.value})
    }

    handleCategory(event) {
        this.setState({category: event.target.value})
    }

    handleImage(event) {
        this.setState({file: event.target.files[0]})
    }

    handleSubmit(event) {
        event.preventDefault()
        let formData = new FormData()
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('category', this.state.category)
        formData.append('file', this.state.file)

        AdminMovieService.addMovie(formData).then(
            (response) => {
                alert(response.data)
            }, error => {
                alert(error.response.data)
            })
    }

    render() {
        return (
            <Row className="pt-5">
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitle} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={this.state.description} onChange={this.handleDescription} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" value={this.state.category} onChange={this.handleCategory}>
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
                            <Form.File id="file" label="Image" onChange={this.handleImage} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}