import React, {useState} from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

function Login(props) {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleName = e => {
        setName(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { dispatch } = props;
        dispatch(login(name, password)).then(
            () => {
                props.history.push("/list");
                window.location.reload();
            }
        )
    }

    const { isLoggedIn, message } = props;

    if (isLoggedIn) {
        return <Redirect to="/list" />;
    }

    return (
        <Container>
            <Row className="pt-5">
                <Col>
                    <div className="login-register-form">
                        <h1>Login</h1>
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
                                Login
                            </Button>
                        </Form>
                        {message && (
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);