import { Button } from "react-bootstrap"

import { useCarrito } from "../../../context/CarritoContext"
import { useCarritoCompras } from "../../../hooks/useCarritoCompras"
import "./CarritoCompras.css"

interface CartItemProps {
    id: number
    quantity: number
}

/**
 * Componente que muestra un ArticuloManufacturado que fue agregado anteriormente al Carrito.
 * @author Castillo
 */
export function CarritoItemDetalle({ id, quantity }: CartItemProps) {
    const item = useCarritoCompras(id)
    const { increaseCartQuantity, decreaseCartQuantity } = useCarrito();

    return (
        <tr>
            <td className="imagenes-articulos">
                <img src={item?.item.imagen} alt="Imagen del artículo" />
            </td>
            <td>{item?.item.denominacion}</td>
            <td>{quantity > 0 && <span>x{quantity}</span>}</td>
            <td>
                <div>${item?.item.precioVenta}</div>
            </td>
            <td>
                <div>${(item?.item.precioVenta || 0) * quantity}</div>
            </td>
            <td>
                <div className="d-flex align-items-center justify-content-center">
                    <Button onClick={() => decreaseCartQuantity(id)} className="btn-cancel me-2" variant="dark">
                        <span>-</span>
                    </Button>
                    <span className="fs-4">{quantity}</span>
                    <Button onClick={() => increaseCartQuantity(id)} className="btn-ok ms-2" variant="dark">
                        <span>+</span>
                    </Button>
                </div>
            </td>
        </tr>
    );
};
