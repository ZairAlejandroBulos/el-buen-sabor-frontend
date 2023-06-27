import "./NavBar.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button, InputGroup } from "react-bootstrap";

import UserButton from "./UserButton";
import { useCarrito } from "../../../context/CarritoContext";
import { Cart, Cart2, Cart3, Cart4 } from "react-bootstrap-icons";

/**
 * Componente que muestra la barra de navegación principal.
 * @author Bulos, Castillo
 */
function NavBar(): JSX.Element {
    const navigate = useNavigate();

    const [search, setSearch] = useState<string>("all");
    let searchTimeout = useRef<number | null>(null);
    const { openCart, cartQuantity } = useCarrito();

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
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" className="navbar-img">
                    <img src="/images/logo.png" alt="el-bueb-sabor" />
                </Navbar.Brand>

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
                            <Button type="submit" variant="light">
                                <i className="bi-search"></i>
                            </Button>
                        </InputGroup>
                    </Form>

                    <Nav navbarScroll className="d-flex mx-2">
                        <UserButton />
                        <Button
                            onClick={openCart}
                            className="rounded-circle carrito-navbar"
                        >
                            <Cart3 size={32} color="dark" />
                            <div
                                className="rounded-circle 
                                    bg-danger 
                                    d-flex 
                                    justify-content-center 
                                    align-items-center 
                                    carrito-navbar-cantidad"
                            >
                                {cartQuantity}
                            </div>
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;