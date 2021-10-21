import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Badge,
} from 'react-bootstrap';
import { FaUserAlt, FaShoppingCart, FaSearch } from 'react-icons/fa';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from 'react-sidebar';
import { accountLogout } from '../../../../../models/accountReducers';
import { RootState } from '../../../../../models/store';
import { Color, NotifyType, Url } from '../../../../util/enum';
import { toastNotify } from '../../../base/toast/notify';
import '../style.scss';

const Header = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const account = useSelector((state: RootState) => state.accountReducer);
  const cart = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const toggleSideBarOpen = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handleLogout = () => {
    dispatch(accountLogout({}));
    window.sessionStorage.setItem('@token', '');
    toastNotify(NotifyType.success, 'Đăng xuất thành công');
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
              {account.email === '' ? (
                <Nav.Link href={Url.Login}>
                  <FaUserAlt
                    size={14}
                    style={{ marginRight: 6 }}
                    color="black"
                  />
                  <span style={{ color: 'black' }}>Login</span>
                </Nav.Link>
              ) : (
                <NavDropdown
                  title={
                    <>
                      <FaUserAlt
                        size={14}
                        style={{ marginRight: 6 }}
                        color="black"
                      />
                      <span style={{ color: 'black' }}>
                        Hi, {account.email}
                      </span>{' '}
                    </>
                  }
                  id="dropdown-menu-right pull-right"
                >
                  <NavDropdown.Item href={Url.Profile}>
                    Thông tin tài khoản
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Đăng xuất
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link href={Url.Cart}>
                <FaShoppingCart
                  size={14}
                  style={{ marginRight: 6 }}
                  color="black"
                />
                <span style={{ color: 'black' }}>Cart</span>
                <Badge
                  bg="cartBadge"
                  style={{
                    marginLeft: '5px',
                    backgroundColor: `${Color.pink}`,
                  }}
                >
                  {cart.productList.length}
                </Badge>
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
