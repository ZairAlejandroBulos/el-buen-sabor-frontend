import { useEffect } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useCarrito } from "../../../context/CarritoContext";
import { CarritoItemDetalle } from "./CarritoItemDetalle";
import { Link } from "react-router-dom";
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
            <Container className="d-flex mt-3">
                <h1>Carrito de Compras</h1>
            </Container>
            <Container className="table-scrollable mt-3">
                <Row>
                    <Table responsive bordered hover className="tabla-detalle">
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

                    </Table>
                    {cartItems.map(item => (
                        <CarritoItemDetalle key={item.id} {...item} />
                    ))}
                </Row>

            </Container>

            <Container>
                <div className="row justify-content-end  boton-finalizar">
                    <div className="col-2">
                        <h5><strong>Subtotal: </strong>${calcularSubtotal()}</h5>
                        <h5><strong>Total: </strong>$ {calcularSubtotal()}</h5>
                        <Button variant="primary" size="lg" className="mt-5 ms-auto">
                            Finalizar Compra
                        </Button>
                    </div>
                </div>
            </Container>

            <Container>
                <div className="row justify-content-start boton-seguir">
                    <div className="col-3">
                        <Link to="/productos/all">
                            <Button variant="primary" size="lg">Seguir Comprando</Button>
                        </Link>
                    </div>

                </div>
            </Container>
        </>

    )
}