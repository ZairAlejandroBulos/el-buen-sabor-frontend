import "./HeaderAdmin.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

function HeaderAdmin(): JSX.Element {
    return (
        <Nav justify variant="tabs" className="header-admin">
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/usuarios">Usuarios</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/stock">Stock</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/rubros">Rubros</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/">Facturación</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/admin/">Estadísticas</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderAdmin;