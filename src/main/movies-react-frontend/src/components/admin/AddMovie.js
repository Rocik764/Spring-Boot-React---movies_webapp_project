import React, {useState} from "react";
import {Form, Button, Col, Row, Container, InputGroup} from 'react-bootstrap'
import AdminMovieService from '../../service/admin/AdminMovieService'

export default function AddMovie(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState('')
    const [category, setCategory] = useState('Documentaries')
    const [directorsList, setDirectorsList] = useState([{director:''}]);
    const [actorsList, setActorsList] = useState([{name:'', second_name: '', role: ''}]);

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
        const { name, value } = e.target;
        const list = [...directorsList];
        list[index][name] = value;
        setDirectorsList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...directorsList];
        list.splice(index, 1);
        setDirectorsList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setDirectorsList([...directorsList, {director: ''}]);
    };

    const handleActorsInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...actorsList];
        list[index][name] = value;
        setActorsList(list);
    };

    // handle click event of the Remove button
    const handleActorsRemoveClick = index => {
        const list = [...actorsList];
        list.splice(index, 1);
        setActorsList(list);
    };

    // handle click event of the Add button
    const handleActorsAddClick = () => {
        setActorsList([...actorsList, {name: '', second_name: '', role: ''}]);
    };

    const handleSubmit = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('category', category)
        formData.append('file', file)
        for (let i = 0; i < directorsList.length; i++) {
            formData.append('directorsList[]', directorsList[i].director)
        }
        formData.append('actorsList', JSON.stringify(actorsList))

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
                        <Form.Label className="pt-2">Directors</Form.Label>
                        {directorsList.map((x, i) => {
                            return (
                                <div key={i}>
                                <InputGroup className="mb-3">
                                    <Form.Control name="director" type="text" placeholder="Enter director"
                                                  value={x.director} onChange={e => handleInputChange(e, i)} />
                                    <InputGroup.Append>
                                        {directorsList.length !== 1 && <Button variant="outline-danger"
                                                                               onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                    </InputGroup.Append>
                                </InputGroup>
                                {directorsList.length - 1 === i && <Button variant="outline-secondary" onClick={handleAddClick}>Add director field</Button>}
                                </div>
                            );
                        })}
                        <Form.Label className="pt-4">Actors</Form.Label>
                        {actorsList.map((x, i) => {
                            return (
                                <div key={i}>
                                    <InputGroup className="mb-3">
                                        <Form.Control name="name" type="text" placeholder="Name"
                                                      value={x.name} onChange={e => handleActorsInputChange(e, i)} />
                                        <Form.Control name="second_name" type="text" placeholder="Last name"
                                                      value={x.second_name} onChange={e => handleActorsInputChange(e, i)} />
                                        <Form.Control name="role" type="text" placeholder="Role"
                                                      value={x.role} onChange={e => handleActorsInputChange(e, i)} />
                                        <InputGroup.Append>
                                            {actorsList.length !== 1 && <Button variant="outline-danger"
                                                                                   onClick={() => handleActorsRemoveClick(i)}>Remove</Button>}
                                        </InputGroup.Append>
                                    </InputGroup>
                                    {actorsList.length - 1 === i && <Button variant="outline-secondary" onClick={handleActorsAddClick}>Add actor field</Button>}
                                </div>
                            );
                        })}
                        <Button className="mt-3" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}