import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import cart3 from "../../../assets/cart3.svg";

import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"

/**
 * Componente que representa un elemento de Artículo Manufacturado en la lista.
 * @author Castillo
 */
function ItemArticuloManufacturado(props: ArticuloManufacturado): JSX.Element {
    return (
        <Card style={{ width: '18rem' }}>
            <Link to={`/detalle/${props.id}`}>
                <Card.Img style={{ height: '200px' }} src={props.imagen} alt={props.denominacion} variant="top" />
            </Link>
            <Card.Body>
                <Card.Title>
                    { props.denominacion }
                </Card.Title>
                <Card.Text style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>
                        ${ props.precioVenta }
                    </strong>
                    <Link to={""}>
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
    );
}

export default ItemArticuloManufacturado;