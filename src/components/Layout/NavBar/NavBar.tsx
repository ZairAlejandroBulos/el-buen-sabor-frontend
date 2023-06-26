import "./NavBar.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, Button, InputGroup } from "react-bootstrap";

import UserButton from "./UserButton";
import { useCarrito } from "../../../context/CarritoContext";

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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                fill="currentColor"
                            >
                                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                            </svg>

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