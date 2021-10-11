import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { FaUserAlt, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import Sidebar from 'react-sidebar';
import '../style.scss';

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const toggleSideBarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    // <Sidebar
    //   sidebar={<b>Sidebar content</b>}
    //   open={sideBarOpen}
    //   onSetOpen={toggleSideBarOpen}
    //   styles={{ sidebar: { background: 'white' } }}
    // >
    <div className="header">
      <Navbar
        bg="light"
        variant="light"
        expand="lg"
        collapseOnSelect
        className="shadow-sm py-3 px-4 mb-3 bg-white rounded"
      >
        <Navbar.Brand href="/">
          <HiMenuAlt2
            size={30}
            color="black"
            style={{ marginRight: 20 }}
            onClick={toggleSideBarOpen}
          />
          Welcome to our shop
        </Navbar.Brand>
        <Container>
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
                <FaUserAlt size={14} style={{ marginRight: 6 }} color="black" />
                <span style={{ color: 'black' }}>Login</span>
              </Nav.Link>
              <Nav.Link href="/cart">
                <FaShoppingCart
                  size={14}
                  style={{ marginRight: 6 }}
                  color="black"
                />
                <span style={{ color: 'black' }}>Cart</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    // </Sidebar>
  );
};

export default Header;
