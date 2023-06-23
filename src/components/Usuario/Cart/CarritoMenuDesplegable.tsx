import { Button, Stack } from "react-bootstrap"
import { useCarrito } from "../../../context/CarritoContext"
import { useCarritoCompras } from "../../../hooks/useCarritoCompras"
import "./CarritoCompras.css"
/**
 * Componente que muestra los Artículos Manufacturados en el Carrito de Compras desplegable.
 * @author Castillo
 */
type CartItemProps = {
    id: number
    quantity: number
}

function CarritoMenuDesplegable({ id, quantity }: CartItemProps): JSX.Element {
    const { removeFromCart } = useCarrito()
    const item = useCarritoCompras(id);

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center menu-desplegable">
            <img
                src={item?.item.imagen}
            />
            <div className="me-auto">
                <div>
                    {item?.item.denominacion}{" "}
                    {quantity > 1 && (
                        <span className="text-muted cantidad-articulos" >
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted precio-articulos">
                    ${(item?.item.precioVenta)}
                </div>
            </div>
            <div> ${(item?.item.precioVenta || 0 * quantity)}</div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item?.item.id || 0)}
            ><i className="bi bi-trash3"></i>
            </Button>
        </Stack>
    )
}
export default CarritoMenuDesplegable;