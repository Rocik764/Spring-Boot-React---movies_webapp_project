import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import AdminMovieService from "../../service/admin/AdminMovieService";

export default function EditMovies(props) {

    const [movie, setMovie] = useState(JSON.parse(localStorage.getItem("movie")))
    const [id, setId] = useState(movie.id)
    const [title, setTitle] = useState(movie.title)
    const [description, setDescription] = useState(movie.description)
    const [category, setCategory] = useState(movie.category)
    const [file, setFile] = useState(movie.file)
    const [url, setUrl] = useState(movie.url)
    const [directorsList, setDirectorsList] = useState(movie.directors);
    const [actorsList, setActorsList] = useState(movie.actors);

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

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        const list = [...directorsList];
        list[index] = value;
        setDirectorsList(list);
    }

    const handleActorsInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...actorsList];
        list[index][name] = value;
        setActorsList(list);
    }

    const handleSubmit = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('id', id)
        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('file', file)
        for (let i = 0; i < directorsList.length; i++) {
            formData.append('directorsList[]', directorsList[i])
        }
        formData.append('actorsList', JSON.stringify(actorsList))

        AdminMovieService.editMovie(formData).then(
            () => {
                props.history.push("/manageMovies");
                window.location.reload();
            }, error => {
                console.log("XD")
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
                        <Form.Label className="pt-2">Directors</Form.Label>
                        {directorsList.map((x, i) => {
                            console.log(x)
                            return (
                                <div key={i}>
                                    <InputGroup className="mb-3">
                                        <Form.Control name="director" type="text" value={x} onChange={e => handleInputChange(e, i)} />
                                    </InputGroup>
                                </div>
                            );
                        })}
                        <Form.Label className="pt-4">Actors</Form.Label>
                        {actorsList.map((x, i) => {
                            return (
                                <div key={i}>
                                    <InputGroup className="mb-3">
                                        <Form.Control name="name" type="text" placeholder="Name" value={x.name} onChange={e => handleActorsInputChange(e, i)} />
                                        <Form.Control name="second_name" type="text" placeholder="Last name" value={x.second_name} onChange={e => handleActorsInputChange(e, i)} />
                                        <Form.Control name="role" type="text" placeholder="Role" value={x.role} onChange={e => handleActorsInputChange(e, i)} />
                                    </InputGroup>
                                </div>
                            );
                        })}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

