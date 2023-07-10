import "./CarritoCompras.css";
import { Button, Stack } from "react-bootstrap";

import { useCarrito } from "../../../context/CarritoContext";
import { useArticuloManufacturado } from "../../../hooks/useArticuloManufacturado";

interface Props {
    id: number;
    quantity: number;
}

/**
 * Componente que muestra los Artículos Manufacturados en el Carrito de Compras desplegable.
 * @author Castillo
 */
function CarritoMenuDesplegable({ id, quantity }: Props): JSX.Element {
    const { removeFromCart } = useCarrito();
    const { articuloManufacturado: item } = useArticuloManufacturado(id, true);

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center imagenes-articulos">
            <img
                src={ item.imagenURL }
                alt={ item.denominacion }
            />
            <div className="me-auto">
                <div>
                    { item.denominacion } {" "}
                    { quantity > 1 && (
                        <span className="text-muted" >
                            x{ quantity }
                        </span>
                    ) }
                </div>
                <div className="text-muted">
                    ${ item.precioVenta }
                </div>
            </div>
            <div>
                ${(item.precioVenta || 0 * quantity)}
            </div>
            <Button
                variant="outline-danger"
                size="sm"
                onClick={() => removeFromCart(item.id || 0)}
            >
                <i className="bi bi-trash3"></i>
            </Button>
        </Stack>
    );
}

export default CarritoMenuDesplegable;