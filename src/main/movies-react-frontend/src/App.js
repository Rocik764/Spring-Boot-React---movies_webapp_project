import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import React, {Component} from "react";
import { Router, Link, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import AddMovie from './components/admin/AddMovie'
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ManageMovies from "./components/admin/ManageMovies";
import EditMovies from "./components/admin/EditMovies";
import { clearMessage } from "./actions/message";
import { logout } from "./actions/auth";
import { history } from './helpers/history'
import MainPage from "./components/pages/MainPage";
import MovieDetails from "./components/pages/MovieDetails";
import ManageUsers from "./components/admin/ManageUsers";
import MoviesList from "./components/pages/MoviesList";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };

        history.listen((location) => {
            props.dispatch(clearMessage()); // clear message when changing location
        });
    }

    componentDidMount() {
        const user = this.props.user;

        if (user) {
            this.setState({
                currentUser: user,
                showUserBoard: user.user.roleList.includes("USER"),
                showAdminBoard: user.user.roleList.includes("ADMIN")
            });
        }
    }

    logOut() {
        this.props.dispatch(logout());
    }

    render() {
        const { currentUser, showAdminBoard } = this.state;

        return (
            <Router history={history}>
                <Navbar expand="lg">
                    <Container>
                    <Navbar.Brand href="/home" className="logo">Movies<span>Forum</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {currentUser ? (
                            <>
                            <Nav className="mr-auto">
                                {showAdminBoard ? (
                                    <NavDropdown title="ADMIN" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to={"/manageMovies"}>Edit movies</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to={"/manageUsers"}>Edit users</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to={"/addMovie"}>Add movie</NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <></>
                                )}
                                <Nav.Link as={Link} to={"/list"}>Movies list</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Item>
                                    <a href="/login" className="nav-link" onClick={this.logOut}>Logout</a>
                                </Nav.Item>
                            </Nav>
                            </>
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
                    </Container>
                </Navbar>
                <Switch>
                    {currentUser ? (
                        <>
                            <Route exact path="/home" component={MainPage} />
                            <Route exact path="/list" component={MoviesList} />
                            <Route exact path="/movieDetails" component={MovieDetails} />
                        {showAdminBoard ? (
                        <>
                            <Route exact path="/addMovie" component={AddMovie} />
                            <Route exact path="/manageMovies" component={ManageMovies} />
                            <Route exact path="/manageUsers" component={ManageUsers} />
                            <Route exact path='/editMovie' component={EditMovies} />
                        </>
                        ) : (<></>)}
                        </>
                    ) : (
                        <>
                            <Route exact path="/home" component={MainPage} />
                            <Route exact path="/list" component={MoviesList} />
                            <Route exact path="/movieDetails" component={MovieDetails} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                        </>
                    )}
                </Switch>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
