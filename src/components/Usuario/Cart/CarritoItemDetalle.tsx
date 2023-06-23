import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { useCarrito } from "../../../context/CarritoContext"
import { useCarritoCompras } from "../../../hooks/useCarritoCompras"
import "./CarritoCompras.css"
/**
 * Componente que muestra un ArticuloManufacturado que fue agregado anteriormente al Carrito.
 * @author Castillo
 */
type CartItemProps = {
    id: number
    quantity: number
}
export function CarritoItemDetalle({ id, quantity }: CartItemProps) {
    const item = useCarritoCompras(id)
    const { increaseCartQuantity, decreaseCartQuantity } = useCarrito();

    return (
        <>
            <Container className="table-scrollable mt-1 carrito-detalle">
                <Row>
                    <Col className="carrito-detalle-imagen">
                        <img
                            src={item?.item.imagen}
                        />
                    </Col>
                    <Col>
                        {item?.item.denominacion}{" "}
                    </Col>
                    <Col>
                        {quantity > 0 && (
                            <span>
                                x{quantity}
                            </span>
                        )}
                    </Col>
                    <Col>
                        <div> ${item?.item.precioVenta}</div>
                    </Col>
                    <Col className="carrito-detalle-subtotal">
                        <div> ${(item?.item.precioVenta || 0 * quantity)}</div>
                    </Col>
                    <Col>
                        <div>
                            <Button onClick={() => decreaseCartQuantity(id)}><span>-</span></Button>
                            <span className="fs-4">{quantity}</span>
                            <Button onClick={() => increaseCartQuantity(id)}><span>+</span></Button>
                        </div>
                    </Col>
                </Row>
            </Container >
        </>
    )
}