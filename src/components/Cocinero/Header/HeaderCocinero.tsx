import "./HeaderCocinero.css";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function HeaderCocinero(): JSX.Element {
    return(
        <Nav justify variant="tabs" className="header-cocinero">
            <Nav.Item>
                <Nav.Link as={Link} to="/cocinero">Pedidos</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/cocinero">Stock</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to="/cocinero/rubros">Rubros</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderCocinero;