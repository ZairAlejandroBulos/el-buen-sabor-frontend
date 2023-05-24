import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CategoriasAdmin.css';
import { Link } from 'react-router-dom';

function CategoriasAdmin() {
  return (
    <Navbar className="nav" expand="md" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Usuarios" id='nav-drop-u'>
            <NavDropdown.Item as={Link} to="/admin/clientes">Clientes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/empleados">Empleados</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Stock" id='nav-drop-s'>
            <NavDropdown.Item as={Link} to="/admin/stok/clientes">Ingredientes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/stok/clientes">Productos</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Rubros" id='nav-drop-r'>
            <NavDropdown.Item as={Link} to="/admin/rubro/ingrediente">Ingredientes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/rubro/producto">Productos</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Estadisticas" id='nav-drop-e'>
            <NavDropdown.Item as={Link} to="/admin/estadistica/clientes">Clientes</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/estadistica/producto">Productos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/estadistica/monetario">Monetario</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link id='boton-fac' as={Link} to="/admin/facturacion">Facturacion</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CategoriasAdmin;
