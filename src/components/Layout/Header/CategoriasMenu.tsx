import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CategoriasMenu.css';
import { Link } from 'react-router-dom';

function CategoriasMenu() {
  return (
    <Navbar className="nav-menu" expand="md" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Item>
                <Nav.Link id='boton-pizzas' as={Link} to="/productos/pizzas">Pizzas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id='boton-lomos' as={Link} to="/productos/lomos">Lomos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id='boton-burgers' as={Link} to="/productos/burgers">Burgers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id='boton-papas' as={Link} to="/productos/papas">Papas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link id='boton-bebidas' as={Link} to="/productos/bebidas">Bebibas</Nav.Link>
            </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CategoriasMenu;