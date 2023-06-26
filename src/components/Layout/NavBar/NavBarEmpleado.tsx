import "./NavBar.css";
import { Container, Nav, Navbar } from "react-bootstrap";

import UserButton from "./UserButton";

/**
 * Componente que muestra la barra de navegación para los empleados.
 * Vista de Admin/Cajero/Cocinero/Delivery.
 * @author Bulos
 */
function NavBarEmpleado(): JSX.Element {
    return (
        <Navbar expand="lg">
            <Container fluid>
                <Navbar.Brand className="navbar-img">
                    <img src="/images/logo.png" alt="el-bueb-sabor" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll" className="justify-content-end me-5">
                    <Nav navbarScroll>
                        <UserButton />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarEmpleado;