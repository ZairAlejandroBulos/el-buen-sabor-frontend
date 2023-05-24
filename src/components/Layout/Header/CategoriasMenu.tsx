import { Navbar, Nav, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CategoriasMenu.css';

function CategoriasMenu() {
  return (
    <Navbar className="nav-menu" expand="md" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Button id='boton-pizzas'>Pizzas</Button>
            <Button id='boton-lomos'>Lomos</Button>
            <Button id='boton-burgers'>Burgers</Button>
            <Button id='boton-papas'>Papas</Button>
            <Button id='boton-bebidas'>Bebidas</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CategoriasMenu;