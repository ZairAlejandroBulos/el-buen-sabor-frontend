import "./CarritoCompras.css";
import { Button } from "react-bootstrap"
import { Dash, Plus } from "react-bootstrap-icons";

import { useCarrito } from "../../../context/CarritoContext";
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado";

interface Props {
    id: number;
    quantity: number;
}

/**
 * Componente que muestra un ArticuloManufacturado que fue agregado anteriormente al Carrito.
 * @author Castillo
 */
function CarritoItemDetalle({ id, quantity }: Props): JSX.Element {
    const { articuloManufacturado: item } = useArticuloManufacturado(id, true);
    const { increaseCartQuantity, decreaseCartQuantity } = useCarrito();

    return (
        <tr>
            <td className="imagenes-articulos">
                <img src={item.imagenURL} alt={item.denominacion} />
            </td>
            <td>
                { item.denominacion }
                </td>
            <td>
                { quantity > 0 && <span>x{quantity}</span> }
                </td>
            <td>
                <div>
                    ${ item.precioVenta }
                </div>
            </td>
            <td>
                <div>
                    ${ (item.precioVenta || 0) * quantity }
                </div>
            </td>
            <td>
                <div className="d-flex align-items-center justify-content-center">
                    <Button onClick={() => decreaseCartQuantity(id)} className="btn-cancel btn-sm me-2" variant="dark">
                        <Dash size={13} />
                    </Button>
                    
                    <span className="fs-4">
                        { quantity }
                    </span>
                    
                    <Button onClick={() => increaseCartQuantity(id)} className="btn-ok ms-2 btn-sm" variant="dark">
                        <Plus size={13} />
                    </Button>
                </div>
            </td>
        </tr>
    );
}

export default CarritoItemDetalle;