import { Button } from "react-bootstrap";
import Cliente from "../../../types/Cliente";

function ItemUsuario(props: Cliente): JSX.Element {
    return(
        <>
            <tr>
                <td>
                    { props.nombre }
                </td>
                <td>
                    { props.apellido }
                </td>
                <td>
                    { props.telefono }
                </td>
                <td>
                    { props.usuario.usuario }
                </td>
                <td>
                    { props.domicilio.calle }
                    &nbsp;
                    { props.domicilio.numero }
                </td>
                <td>
                    { props.domicilio.localidad.nombre }
                </td>
                <td>
                    <Button>Modificar</Button>
                </td>
                <td>
                    <Button variant="danger">Eliminar</Button>
                </td>
            </tr>
        </>
    );
}

export default ItemUsuario;