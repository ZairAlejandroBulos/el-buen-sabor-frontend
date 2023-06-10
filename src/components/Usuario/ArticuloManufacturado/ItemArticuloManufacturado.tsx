import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"

/**
 * Componente que representa un elemento de Artículo Manufacturado en la lista.
 * @author Castillo
 */
export const ItemArticuloManufacturado = (props: ArticuloManufacturado) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Link to={`/detalle/${props.id}`}>
                <Card.Img src={props.imagen} alt={props.denominacion} className="maxAltoImg" variant="top" />
            </Link>
            <Card.Body>
                <Card.Title>{props.denominacion}</Card.Title>
                <Card.Text>
                    ${props.precioVenta}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}