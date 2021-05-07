import React, {useState} from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import {Link} from "react-router-dom";

function Register(props) {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [successful, setSuccessful] = useState(0)

    const handleName = e => {
        setName(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.dispatch(register(name, password)).then(
            () => {
                setSuccessful(1)
            })
            .catch(() => {
                setSuccessful(0)
            })
    }

    const { message } = props;
    return (
        <Container>
            <Row className="pt-5">
                <Col>
                    <div className="login-register-form">
                        <h1>Register</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={name} onChange={handleName} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Register
                            </Button>
                        </Form>
                        {message && (
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message.messages ? (
                                     message.messages.map((value, index) => {
                                         return <li key={index}>{value}</li>
                                     })
                                ) : (
                                    <>{message} <Link to={"/login"}>Click here to login.</Link></>
                                )}
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(Register);