import "./ArticuloManufacturado.css";
import { Cart } from "react-bootstrap-icons";
import { useParams, Link } from "react-router-dom";
import { Button, Col, Container, Row, Image } from "react-bootstrap";

import { useCarrito } from "../../../context/CarritoContext";
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado";
import { DetalleArticuloManufacturado } from "../../../types/DetalleArticuloManufacturado";

/**
 * Componente que muestra los detalles de un Artículo Manufacturado .
 * @author Castillo
 */
function DetalleArticuloManufacturado(): JSX.Element {
    const { id } = useParams<string>();
 
    const { increaseCartQuantity } = useCarrito();
    const { articuloManufacturado } = useArticuloManufacturado(Number(id), true);

    return(
        <div className="d-flex align-items-center" style={{ minHeight: '80vh' }} >
            <Container className="detalle-producto">
                <Row className="justify-content-center align-items-center rounded rounded-5 fila-central">
                    <Col sm={12} md={6}>
                        <Image
                            src={articuloManufacturado.imagenURL}
                            alt={articuloManufacturado.denominacion}
                            className="d-block w-100 rounded rounded-5 rounded-end">
                        </Image>
                    </Col>
                    <Col sm={12} md={6}>
                        <Row>
                            <Col xs={8} className="d-flex justify-content-start mb-3 mt-3" >
                                <h1>
                                    <strong>
                                        { articuloManufacturado.denominacion }
                                    </strong>
                                </h1>
                            </Col>
                            <Col xs={4} className="d-flex justify-content-end mt-3">
                                <h2>
                                    <strong>
                                        ${ articuloManufacturado.precioVenta }
                                    </strong>
                                </h2>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <h4>
                                { articuloManufacturado.descripcion }
                            </h4>
                        </Row>
                        <Row className="mb-2">
                            {
                                articuloManufacturado.detalles &&
                                <>
                                    <h5><strong>Ingredientes</strong></h5>
                                    <ul>
                                        {
                                            articuloManufacturado.detalles.map((item: DetalleArticuloManufacturado) =>
                                                <li key={item.id} style={{ listStyle: 'none' }}>
                                                    { item.articuloInsumo.denominacion }
                                                </li>
                                            )
                                        }
                                    </ul>
                                </>
                            }
                        </Row>
                        <Row className="text-center">
                            <Col xs={6} sm={6} md={6} lg={6} xl={6} className="mb-3 sm-0">
                                <Link to={`/productos/all`}>
                                    <Button className="btn-add" variant="dark">
                                        Seguir Comprando
                                    </Button>
                                </Link>
                            </Col>
                            
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                <Button onClick={() => increaseCartQuantity(Number(id))} className="btn-ok" variant="dark">
                                    <Cart className="me-2" />
                                    <span>
                                        Agregar al Carrito
                                    </span>
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetalleArticuloManufacturado;
