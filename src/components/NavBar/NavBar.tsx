import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserButton from "../Auth0/UserButton";
import LoginButton from "../Auth0/LoginButton";

import "./NavBar.css";
import logo from "../../assets/logo.png";
import cart3 from "../../assets/cart3.svg";
import { Navbar, Nav, Container, Form, Button, InputGroup } from "react-bootstrap";

function NavBar(): JSX.Element {
  const { isAuthenticated } = useAuth0();

  return (
    <Navbar fixed="top" expand="lg">
      <Container fluid>
        <Nav.Link href="/">
          <img src={logo} alt="el-buen-sabor" className="navbar-logo" />
        </Nav.Link>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex mx-auto">
            <InputGroup>
              <Form.Control type="search" placeholder="Buscar productos..." />
              <Button variant="btn btn-light">
                <i className="bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          <Nav navbarScroll className="my-2 my-lg-0">
            { isAuthenticated ? <UserButton /> : <LoginButton /> }
            <Nav.Link href="#">
              <img src={cart3} alt="cart3" width="32px" className="link-cart3" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;