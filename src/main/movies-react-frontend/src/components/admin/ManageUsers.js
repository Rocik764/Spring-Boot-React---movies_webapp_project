import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row, Table, Modal, Form} from 'react-bootstrap'
import AdminService from "../../service/admin/AdminService";

export default function ManageUsers(props) {

    const [users, setUsers] = useState()
    const [id, setId] = useState()
    const [email, setEmail] = useState()
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        AdminService.getUsersList().then(
            response => {
                setUsers(response.data)
            },
            error => {
                console.log(error.response)
            }
        )
    }, [])

    const handleClose = () => setShowModal(false);
    const handleShow = (id, email) => {
        setId(id)
        setEmail(email)
        setShowModal(true);
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        AdminService.setNewEmail(id, email).then(
            () => {
                window.location.reload();
            },
            error => {
                console.log(error.response)
            }
        )
    }

    const setAdmin = id => {
        AdminService.setAdmin(id).then(
            () => {
                window.location.reload();
            },
            error => {
                console.log(error.response)
            }
        )
    }

    const unsetAdmin = id => {
        AdminService.unsetAdmin(id).then(
            () => {
                window.location.reload();
            },
            error => {
                console.log(error.response)
            }
        )
    }

    let usersList = []
    if(typeof users !== 'undefined') {
        usersList = users.map((element, i) => {
            let button
            if (element.roles.includes(',ADMIN')) {
                button = <Button variant="danger" onClick={() => unsetAdmin(element.id)}>Unset admin</Button>
            } else {
                button = <Button variant="danger" onClick={() => setAdmin(element.id)}>Set admin</Button>
            }
            return (
                <tr key={i}>
                    <td>{element.id}</td>
                    <td>{element.email}</td>
                    <td>{element.roles}</td>
                    <td>{element.enabled ? 'enabled' : 'disabled'}</td>
                    <td>
                        {button}
                        <Button variant="primary" onClick={() => handleShow(element.id, element.email)}>Change email</Button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
            <Container className="pb-5">
                <h1 className="pt-5">Users list</h1>
                <Row className="pt-2">
                    <Col>
                        <Table responsive="sm">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Enabled</th>
                                <th>Manage</th>
                            </tr>
                            </thead>
                            <tbody>
                                {usersList}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="New email" value={email} onChange={handleEmail} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}