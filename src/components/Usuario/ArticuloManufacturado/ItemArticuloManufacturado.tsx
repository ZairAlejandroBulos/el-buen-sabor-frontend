import "./ArticuloManufacturado.css"
import { Link } from "react-router-dom"
import { Button, Card, Container } from "react-bootstrap"

import { useCarrito } from "../../../context/CarritoContext";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"

/**
 * Componente que representa un elemento de Artículo Manufacturado en la lista.
 * @author Castillo
 */
function ItemArticuloManufacturado(props: ArticuloManufacturado): JSX.Element {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useCarrito();
    const quantity = getItemQuantity(props.id);

    return (
        <Container className="mt-5 d-flex justify-content-between" style={{ width: "18rem" }}>
            <Card style={{ backgroundColor: "#DEE2E6" }}>
                <Link to={`/detalle-manufacturado/${props.id}`}>
                    <Card.Img
                        src={props.imagenURL}
                        alt={props.denominacion}
                        className="card-imagen"
                        variant="top"
                    />
                </Link>
                <Card.Body style={{ backgroundColor: "#E9ECEF" }}>
                    <Card.Title>
                        { props.denominacion }
                    </Card.Title>
                    <Card.Text >
                        <strong>
                            ${ props.precioVenta }
                        </strong>
                    </Card.Text>
                    <div>
                        {
                            quantity === 0 ? (
                                <div className="middle">
                                    <Button className="w-100 mb-5 boton-agregar" onClick={() => increaseCartQuantity(props.id)}>
                                        + Agregar
                                    </Button>
                                </div>
                            ) : <div className="agregar"
                                style={{ gap: ".5rem" }}>
                                <div className="d-flex align-items-center justify-content-center boton-agregar"
                                >
                                    <Button onClick={() => decreaseCartQuantity(props.id)} className="boton-agregar-restar">
                                        <span>-</span>
                                    </Button>
                                    <div>
                                        <span className="fs-5 text-white">{quantity}</span>
                                    </div>
                                    <Button onClick={() => increaseCartQuantity(props.id)} className="boton-agregar-restar">
                                        <span>+</span>
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ItemArticuloManufacturado;