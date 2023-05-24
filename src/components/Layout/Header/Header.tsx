import "./Header.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderHome(): JSX.Element {
    return(
        <Nav justify variant="tabs" className="header-home">
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/pizzas">Pizzas</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/lomos">Lomos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/burgers">Burgers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/productos/bebidas">Bebibas</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderHome;