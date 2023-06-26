import "./Footer.css";
import { Col, Container, Row } from "react-bootstrap";
import { Instagram, Facebook, Whatsapp } from "react-bootstrap-icons";

/**
 * Componente que muestra el pie de página de la aplicación.
 * @author Bulos 
 */
function Footer(): JSX.Element {
    return (
        <footer className="mt-5 py-5 w-100 footer">
            <Container>
                <Row className="row-cols-1 row-cols-sm-2 row-cols-md-5">
                    <Col className="mb-3">
                        <a href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                            <img src="/images/logo.png" alt="el-buen-sabor" height="65px" />
                        </a>
                    </Col>
                    <Col className="mb-3"></Col>
                    <Col className="mb-3">
                        <h5>Explorar</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                Inicio
                            </li>
                            <li className="nav-item mb-2">
                                Menú
                            </li>
                            <li className="nav-item mb-2">
                                Contacto
                            </li>
                        </ul>
                    </Col>
                    <Col className="mb-3">
                        <h5>Servicios</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                Ayuda
                            </li>
                            <li className="nav-item mb-2">
                                Realizar pedido
                            </li>
                            <li className="nav-item mb-2">
                                Acerca de nosotros
                            </li>
                        </ul>
                    </Col>
                    <Col className="mb-3">
                        <h5>Información legal</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2">
                                Políticas de privacidad
                            </li>
                            <li className="nav-item mb-2">
                                Términos y condiciones
                            </li>
                        </ul>
                    </Col>
                </Row>
                <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top border-dark">
                    <p>© 2023 The MAGNIficos, Inc. Todos los derechos reservados.</p>
                    <ul className="list-unstyled d-flex">
                        <li className="ms-3">
                            <a href="#" className="link-body-emphasis">
                                <Whatsapp size={24} color="dark" />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a href="#" className="link-body-emphasis">
                                <Facebook size={24} color="dark" />
                            </a>
                        </li>
                        <li className="ms-3">
                            <a href="#" className="link-body-emphasis">
                                <Instagram size={24} color="dark" />
                            </a>
                        </li>
                    </ul>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;