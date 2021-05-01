import React from "react";
import {Form, Button, Col, Row} from 'react-bootstrap'
import AuthService from "../../service/AuthService";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            message: ''
        };

        this.handleName = this.handleName.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleName(event) {
        this.setState({name: event.target.value})
    }

    handlePassword(event) {
        this.setState({password: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        AuthService.login(this.state.name, this.state.password).then(
            (response) => {
                this.props.history.push("/list");
                window.location.reload();
            },
            error => {
                console.log(error.response)
                this.setState({
                    message: error.response.data
                });
            }
        )
    }

    render() {
        return (
            <Row>
                <Col>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={this.handleName} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                    {this.state.message && (
                        <div className="alert alert-danger" role="alert">
                            {this.state.message}
                        </div>
                    )}
                </Col>
            </Row>
        );
    }
}