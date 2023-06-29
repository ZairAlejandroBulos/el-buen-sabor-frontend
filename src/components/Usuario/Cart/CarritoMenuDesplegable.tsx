import { Button, Stack } from "react-bootstrap"

import { useCarrito } from "../../../context/CarritoContext"
import "./CarritoCompras.css"
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado"

interface CartItemProps {
    id: number
    quantity: number
}

/**
 * Componente que muestra los Artículos Manufacturados en el Carrito de Compras desplegable.
 * @author Castillo
 */
function CarritoMenuDesplegable({ id, quantity }: CartItemProps): JSX.Element {
    const { removeFromCart } = useCarrito()
    const item = useArticuloManufacturado(id, true);

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center imagenes-articulos">
            <img
                src={item?.articuloManufacturado.imagen}
            />
            <div className="me-auto">
                <div>
                    {item?.articuloManufacturado.denominacion}{" "}
                    {quantity > 1 && (
                        <span className="text-muted" >
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted">
                    ${(item?.articuloManufacturado.precioVenta)}
                </div>
            </div>
            <div> ${(item?.articuloManufacturado.precioVenta || 0 * quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item?.articuloManufacturado.id || 0)}
            ><i className="bi bi-trash3"></i>
            </Button>
        </Stack>
    )
}
export default CarritoMenuDesplegable;