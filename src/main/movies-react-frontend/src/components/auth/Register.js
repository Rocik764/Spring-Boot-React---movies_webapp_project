import React, {useState} from "react";
import {Form, Button, Col, Row, Container} from 'react-bootstrap'
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import AuthService from "../../service/AuthService";

function Register(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successful, setSuccessful] = useState(0)

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        props.dispatch(register(email, password)).then(
            () => {
                setSuccessful(1)
            })
            .catch(() => {
                setSuccessful(0)
            })
    }

    const handleResend = link => {
        AuthService.resend(link).then(response => {
            alert(response.data)
        })
    };

    const { message } = props;
    let splitted;

    return (
        <Container className="pb-5">
            <Row className="pt-5">
                <Col>
                    <div className="login-register-form">
                        <h1>Register</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail} />
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
                                {(function() {
                                    if(message.messages) {
                                        return (<div>
                                            {message.messages.map((value, index) => (
                                                <p key={index}>{value}</p>
                                            ))}
                                        </div>);
                                    } else {
                                        if(successful) {
                                            splitted = message.split(';');
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
    const { message } = state.message;
    return {
        message,
    };
}

export default connect(mapStateToProps)(Register);