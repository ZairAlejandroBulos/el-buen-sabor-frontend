import { Navbar, Nav, NavDropdown, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CatCocina.css';
import { Link } from 'react-router-dom';

function CatCocina() {
  return (
    <Navbar className="nav-cocina" expand="md" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
              <Nav.Link id='nav-boton-pedido' as={Link} to="/cocinero">Pedidos</Nav.Link>

              <NavDropdown title="Stock" id='nav-c-drop-s'>
                <NavDropdown.Item as={Link} to="/cocinero">Ingredientes</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cocinero/rubros">Productos</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Rubros" id='nav-c-drop-r'>
                <NavDropdown.Item as={Link} to="/cocinero/rubros/ingrediente">Ingredientes</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/cocinero/rubros/producto">Productos</NavDropdown.Item>
              </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CatCocina;