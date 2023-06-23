import { Button, Card, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import cart3 from "../../../assets/cart3.svg";
import "./ArticuloManufacturado.css"
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado"
import { useCarrito } from "../../../context/CarritoContext";

/**
 * Componente que representa un elemento de Artículo Manufacturado en la lista.
 * @author Castillo
 */
function ItemArticuloManufacturado(props: ArticuloManufacturado): JSX.Element {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useCarrito();
    const quantity = getItemQuantity(props.id);
    return (

        <Container style={{ width: '18rem', marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
            <Card>
                <Link to={`/detalle-manufacturado/${props.id}`}>
                    <Card.Img className="card-imagen" src={props.imagen} alt={props.denominacion} variant="top" />
                </Link>
                <Card.Body>
                    <Card.Title>
                        {props.denominacion}
                    </Card.Title>
                    <Card.Text >
                        <strong>
                            ${props.precioVenta}
                        </strong>
                    </Card.Text>
                    <div>
                        {quantity === 0 ? (
                            <div className="middle">
                                <Button className="w-100" style={{ backgroundColor: "#ff9000", borderRadius: "0%", border: "none" }} onClick={() => increaseCartQuantity(props.id)}>+ Agregar</Button>
                            </div>
                        ) : <div className="agregar"
                            style={{ gap: ".5rem" }}>
                            <div className="d-flex align-items-center justify-content-center carta"
                                style={{ gap: "0", backgroundColor: "#ff9000", borderRadius: "0%", width: "100%", height: "35px" }}>
                                <Button onClick={() => decreaseCartQuantity(props.id)} style={{ backgroundColor: "#ff9000", border: "none", height: "35px", fontWeight: "bold", fontSize: "20px" }} ><span>-</span></Button>
                                <div>
                                    <span className="fs-3">{quantity}</span>
                                </div>
                                <Button onClick={() => increaseCartQuantity(props.id)} style={{ backgroundColor: "#ff9000", border: "none", height: "35px", fontWeight: "bold", fontSize: "20px" }} ><span>+</span></Button>
                            </div>
                        </div>}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ItemArticuloManufacturado;