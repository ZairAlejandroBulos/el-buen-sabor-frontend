import { Button } from "react-bootstrap";
import { useModal } from "../../../hooks/useModal";
import ModalRegistro from "./ModalRegistro";
import { Cliente } from "../../../types/Cliente";

function ItemUsuario(props: Cliente): JSX.Element {
    const { showModal, handleClose } = useModal();

    /*
    const handleDelete = (id: number) => {

    };*/

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
                    <Button onClick={() => handleClose()}>Modificar</Button>
                </td>
                <td>
                    <Button variant="danger">Eliminar</Button>
                </td>
            </tr>

            <ModalRegistro
                showModal={showModal}
                handleClose={handleClose}
                cliente={props}
            />
        </>
    );
}

export default ItemUsuario;