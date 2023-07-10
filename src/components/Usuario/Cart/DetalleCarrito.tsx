import { Link } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

import CarritoItemDetalle from "./CarritoItemDetalle";
import { useCarrito } from "../../../context/CarritoContext";
import { useArticulosManufacturadosSearch } from "../../../hooks/useArticulosManufacturadosSearch";

/**
 * Componente que muestra los detalles de un Artículo Manufacturado en el Carrito de Compras.
 * @author Castillo
 */
function DetalleCarrito(): JSX.Element {
    const { cartItems } = useCarrito()
    const { articulosManufacturados } = useArticulosManufacturadosSearch();

    const calcularSubtotal = () => {
        return cartItems.reduce((total, cartItem) => total +
            (articulosManufacturados.find(i => i.id === cartItem.id)?.precioVenta || 0) *
            cartItem.quantity, 0
        );
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Carrito de Compras</h1>
            </Container>

            <Container>
                <Table responsive bordered hover className="table-scrollable mt-3 mb-1" style={{ backgroundColor: "#E9ECEF" }}>
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>SubTotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            cartItems.map((item) => (
                                <CarritoItemDetalle key={item.id} {...item} />
                            ))
                        }
                    </tbody>
                </Table>

                <Row className="mt-3">
                    <Col className="d-flex justify-content-start mt-5">
                        <Link to="/productos/all" className="btn btn-dark btn-add botones-carrito">
                            Seguir Comprando
                        </Link>
                    </Col>
                    
                    <Col className="d-flex justify-content-start flex-column col-10 col-md-2 mt-3">
                        <h5>
                            <strong>Total: </strong> ${ calcularSubtotal() }
                        </h5>
                        
                        <Button className="btn-ok" variant="dark">
                            Finalizar Compra
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default DetalleCarrito;