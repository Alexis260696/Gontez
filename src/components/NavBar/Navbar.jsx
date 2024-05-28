import React from 'react';
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBs from 'react-bootstrap/Navbar';
import './navbar.css'


const Navbar = () => {
    return (
        <NavbarBs bg="dark" variant="dark">
            <Container fluid>
                <NavbarBs.Brand href="#home">GONTEZ</NavbarBs.Brand>
                <Nav className="nav-container justify-content-evenly">
                    <Nav.Item>
                        <Link to='/' style={{color:'#fff', textDecoration: 'none'}}> Inicio </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/create' style={{color:'#fff', textDecoration: 'none'}}> Crear </Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Link to='/show' style={{color:'#fff', textDecoration: 'none'}}> Listado </Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </NavbarBs>
    );
}

export default Navbar;
