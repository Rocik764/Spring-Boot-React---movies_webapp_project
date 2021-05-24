import React, {useState} from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import AuthService from "../../service/AuthService";

function Login(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        const { dispatch } = props;
        dispatch(login(email, password)).then(
            () => {
                props.history.push("/list");
                window.location.reload();
            }
        )
    }

    const handleResend = link => {
        AuthService.resend(link).then(response => {
            alert(response.data)
        })
    };

    const { isLoggedIn, message } = props;
    let splitted;
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
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
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
                                {(function() {
                                    if(message.error) {
                                        return <p>{message.error}</p>
                                    } else {
                                        splitted = message.split(';');
                                        if(splitted.length > 1) {
                                            return <><p>{splitted[0]} </p>
                                                <Button variant="outline-danger"
                                                        onClick={() => handleResend(splitted[1])}>Resend</Button></>
                                        } else {
                                            return <p>{message}</p>
                                        }
                                    }
                                })()}
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