import React from 'react';

import { 
    Navbar, 
    Nav
} from 'react-bootstrap';

// See
// https://stackoverflow.com/questions/54843302/reactjs-bootstrap-navbar-and-routing-not-working-together
import { Link } from 'react-router-dom';


const navBar = (props) => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">RPi machine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
);

export default navBar;
