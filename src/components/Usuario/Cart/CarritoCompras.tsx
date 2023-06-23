import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useCarrito } from "../../../context/CarritoContext";
import { Link } from "react-router-dom";
import { useArticulosManufacturadosSimple } from "../../../hooks/useArticulosManufacturadosSimple";
import CarritoMenuDesplegable from "./CarritoMenuDesplegable";
import "./CarritoCompras.css"
/**
 * Componente que muestra los Artículos Manufacturados en el Carrito de Compras.
 * @author Castillo
 */

type CarritoProps = {
    isOpen: boolean;
}

export function CarritoCompras({ isOpen }: CarritoProps) {
    const { closeCart, cartItems } = useCarrito()
    const { articulosManufacturados } = useArticulosManufacturadosSimple()

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map(item => (
                        <CarritoMenuDesplegable key={item.id} {...item} />
                    ))}
                    <div className="d-flex justify-content-between fs-5 fw-bold mt-3">
                        <div className="button-cart">
                            <Link to="/carrito-detalle">
                                <Button>Ver carrito</Button>
                            </Link>
                        </div>
                        <div>
                            Total{"  $"}
                            {(
                                cartItems.reduce((total, cartItem) => {
                                    const item = articulosManufacturados.find(i => i.id === cartItem.id)
                                    return total + (item?.precioVenta || 0) * cartItem.quantity
                                }, 0)
                            )}
                        </div>

                    </div>


                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    )
}