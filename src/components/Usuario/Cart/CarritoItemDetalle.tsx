import { Button } from "react-bootstrap"

import { useCarrito } from "../../../context/CarritoContext"
import "./CarritoCompras.css"
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado"
import { Dash, Plus } from "react-bootstrap-icons"

interface CartItemProps {
    id: number
    quantity: number
}

/**
 * Componente que muestra un ArticuloManufacturado que fue agregado anteriormente al Carrito.
 * @author Castillo
 */
export function CarritoItemDetalle({ id, quantity }: CartItemProps) {
    const item = useArticuloManufacturado(id, true)
    const { increaseCartQuantity, decreaseCartQuantity } = useCarrito();

    return (
        <tr>
            <td className="imagenes-articulos">
                <img src={item?.articuloManufacturado.imagen} alt="Imagen del artículo" />
            </td>
            <td>{item?.articuloManufacturado.denominacion}</td>
            <td>{quantity > 0 && <span>x{quantity}</span>}</td>
            <td>
                <div>${item?.articuloManufacturado.precioVenta}</div>
            </td>
            <td>
                <div>${(item?.articuloManufacturado.precioVenta || 0) * quantity}</div>
            </td>
            <td>
                <div className="d-flex align-items-center justify-content-center">
                    <Button onClick={() => decreaseCartQuantity(id)} className="btn-cancel btn-sm me-2" variant="dark">
                        <Dash size={13}/>
                    </Button>
                    <span className="fs-4">{quantity}</span>
                    <Button onClick={() => increaseCartQuantity(id)} className="btn-ok ms-2 btn-sm" variant="dark">
                        <Plus size={13}/>
                    </Button>
                </div>
            </td>
        </tr>
    );
};
