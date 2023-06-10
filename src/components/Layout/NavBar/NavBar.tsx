import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import UserButton from "../../Auth0/UserButton";
import LoginButton from "../../Auth0/LoginButton";

import "./NavBar.css";
import logo from "../../../assets/logo.png";
import cart3 from "../../../assets/cart3.svg";
import { Navbar, Nav, Container, Form, Button, InputGroup } from "react-bootstrap";

/**
 * Componente que muestra la barra de navegación principal.
 * @author Bulos, Castillo
 */
function NavBar(): JSX.Element {
  const { isAuthenticated } = useAuth0();
  const [search, setSearch] = useState<string>("all");
  let searchTimeout = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/productos/${search}`);
    } else {
      navigate('/productos/all');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setSearch(newSearch);
    
    if (searchTimeout.current !== null) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => {
      handleSearch();
    }, 1000) as any;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <Navbar fixed="top" expand="lg">
      <Container fluid>
        <Nav.Link href="/">
          <img src={logo} alt="el-buen-sabor" className="navbar-logo" />
        </Nav.Link>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Form onSubmit={handleSubmit} className="d-flex mx-auto">
            <InputGroup>
              <Form.Control
                name="search"
                type="search"
                list="opciones"
                placeholder="Buscar productos..."
                onChange={handleChange}
              />
               <datalist id="opciones">
                <option value="hamburguesa" />
                <option value="bebida" />
                <option value="pizza" />
                <option value="lomo" />
              </datalist>
              <Button type="submit" variant="btn btn-light">
                <i className="bi-search"></i>
              </Button>
            </InputGroup>
          </Form>

          <Nav navbarScroll className="my-2 my-lg-0">
            {
              isAuthenticated
                ?
                <UserButton />
                :
                <LoginButton />
            }
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