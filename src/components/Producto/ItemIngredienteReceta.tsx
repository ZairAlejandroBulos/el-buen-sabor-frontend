import './RecetaProducto.css'
import { Button, Card } from "react-bootstrap";

type ProductoParams = {
    nombre: string;
    cantidad?: number;
    unidadMedida: string;
    borrarProducto: (nombre: string) => void;
}

function ItemRecetaProducto(props: ProductoParams): JSX.Element {

    function borrarItemRecetaProducto() {
        props.borrarProducto(props.nombre);
    }

    return(
        <>
            <Card id="grid">
                <Card.Text>{props.nombre}</Card.Text>
                <Card.Text>{props.cantidad}</Card.Text>
                <Card.Text>{props.unidadMedida}</Card.Text>
                <Button id="boton-item-receta-ingrediente" onClick={borrarItemRecetaProducto}><i className="bi bi-trash"></i></Button>
            </Card>
        </>
    );
}

export default ItemRecetaProducto;