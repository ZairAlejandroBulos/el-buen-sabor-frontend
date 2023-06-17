import { Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import cart3 from "../../../assets/cart3.svg";

import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"

/**
 * Componente que representa un elemento de Artículo Manufacturado en la lista.
 * @author Castillo
 */
function ItemArticuloManufacturado(props: ArticuloManufacturado): JSX.Element {
    return (
        
        <Container style={{ width: '18rem', marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
            <Card>
                <Link to={`/detalle-manufacturado/${props.id}`}>
                    <Card.Img style={{ height: '200px', width: '250px' }} src={props.imagen} alt={props.denominacion} variant="top" />
                </Link>
                <Card.Body>
                    <Card.Title>
                        {props.denominacion}
                    </Card.Title>
                    <Card.Text >
                        <strong>
                            ${props.precioVenta}
                        </strong>
                        <Link to={""} style={{ marginLeft: '65%' }}>
                            <img
                                src={cart3}
                                alt="cart3"
                                width="25px"
                                className="link-cart3"
                            />
                        </Link>
                    </Card.Text>

                </Card.Body>
            </Card>
        </Container>

    );
}

export default ItemArticuloManufacturado;