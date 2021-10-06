import React from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { FaUserAlt, FaShoppingCart, FaSearch } from 'react-icons/fa';
import '../style.scss';

const Header = () => {
  return (
    <div className="header">
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
        className="shadow-sm p-3 mb-5 bg-white rounded"
      >
        <Container>
          <Navbar.Brand href="/">Welcome to our shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <div className="d-flex align-items-center w-200">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <FaSearch size={14} style={{ marginLeft: 6 }} />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/login">
                <FaUserAlt size={14} style={{ marginRight: 6 }} />
                Login
              </Nav.Link>
              <Nav.Link href="/cart">
                <FaShoppingCart size={14} style={{ marginRight: 6 }} />
                Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
