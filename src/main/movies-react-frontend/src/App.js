import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import React, {Component} from "react";
import { Link, Switch, Route } from "react-router-dom";
import AddMovie from './components/admin/AddMovie'
import MoviesList from "./components/movies_list/MoviesList";
import AuthService from './service/AuthService'
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ManageMovies from "./components/admin/ManageMovies";
import EditMovies from "./components/admin/EditMovies";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showUserBoard: user.user.roleList.includes("USER"),
                showAdminBoard: user.user.roleList.includes("ADMIN")
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;
        const { showAdminBoard } = this.state;

        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {currentUser ? (
                            <Nav className="mr-auto">
                                {showAdminBoard ? (
                                    <NavDropdown title="ADMIN" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to={"/manageMovies"}>Edit movies</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to={"/addMovie"}>Edit users</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to={"/addMovie"}>Add movie</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <></>
                                )}
                                <Nav.Link as={Link} to={"/list"}>Movies list</Nav.Link>
                                <Nav.Item>
                                    <a href="/login" className="nav-link" onClick={this.logOut}>Logout</a>
                                </Nav.Item>
                            </Nav>
                        ) : (
                            <>
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to={"/list"}>Movies list</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link as={Link} to={"/login"}>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/register"}>
                                    Register
                                </Nav.Link>
                            </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Navbar>
                <Container>
                    <Switch>
                        {currentUser ? (
                            <>
                            <Route exact path="/list" component={MoviesList} />
                            {showAdminBoard ? (
                            <>
                            <Route exact path="/addMovie" component={AddMovie} />
                            <Route exact path="/manageMovies" component={ManageMovies} />
                            <Route exact path='/editMovie/:id/' component={EditMovies} />
                            </>
                            ) : (<></>)}
                            </>
                        ) : (
                            <>
                            <Route exact path="/list" component={MoviesList} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            </>
                        )}
                    </Switch>
                </Container>
            </>
        );
    }
}

export default App;
