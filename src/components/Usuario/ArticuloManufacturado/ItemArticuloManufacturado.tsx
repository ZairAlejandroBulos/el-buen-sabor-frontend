import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"

export const ItemArticuloManufacturado = (props: ArticuloManufacturado) => {
    return (
        <Card style={{ width: '18rem' }} className="margenesTarjeta">
            <Link to={`/detalle/${props.id}`}>
                <Card.Img variant="top" className="maxAltoImg" src={"http://localhost:5173/images/hamburguesa.jpg"} />
            </Link>
            <Card.Body>
                <Card.Title>{props.denominacion}</Card.Title>
                <Card.Text>
                    ${ props.articuloManufacturadoPrecioVenta.precioVenta }
                </Card.Text>
            </Card.Body>
        </Card>
    )
}