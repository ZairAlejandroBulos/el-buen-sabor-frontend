import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useCarrito } from "../../../context/CarritoContext";
import { CarritoItemDetalle } from "./CarritoItemDetalle";
import { useArticulosManufacturadosSimple } from "../../../hooks/useArticulosManufacturadosSimple";

/**
 * Componente que muestra los detalles de un Artículo Manufacturado en el Carrito de Compras.
 * @author Castillo
 */
export function DetalleCarrito() {
    const { cartItems } = useCarrito()
    const { articulosManufacturados } = useArticulosManufacturadosSimple()

    const calcularSubtotal = () => {
        return cartItems.reduce((total, cartItem) => total +
            (articulosManufacturados.find(i => i.id === cartItem.id)?.precioVenta || 0) *
            cartItem.quantity, 0);
    }

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
                        {cartItems.map((item) => (
                            <CarritoItemDetalle key={item.id} {...item} />
                        ))}
                    </tbody>
                </Table>

                <Row className="mt-5 ">
                    <Col className="d-flex justify-content-start mt-5">
                        <Link to="/productos/all">
                            <Button variant="dark" className="btn-add botones-carrito mt-5">
                                Seguir Comprando
                            </Button>
                        </Link>
                    </Col>
                    <Col className="d-flex justify-content-start flex-column col-10 col-md-2 mt-4">
                        <h5>
                            <strong>Subtotal: </strong>${calcularSubtotal()}
                        </h5>
                        <h5>
                            <strong>Total: </strong>$ {calcularSubtotal()}
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