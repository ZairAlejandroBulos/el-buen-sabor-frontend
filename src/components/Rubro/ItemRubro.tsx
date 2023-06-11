import { Button } from "react-bootstrap";

import { Rubro } from "../../types/Rubro";
import ModalRubro from "./ModalRubro";
import { useModal } from "../../hooks/useModal";

/**
 * Componente que representa un elemento de Rubro en la tabla.
 * @author Bulos
 */
function ItemRubro(props: Rubro): JSX.Element {
    const { showModal, handleClose } = useModal();

    return (
        <>
            <tr>
                <td>
                    {props.denominacion}
                </td>

                <td>
                    {props.rubroPadre?.denominacion || "-"}
                </td>

                <td>
                    <Button onClick={() => handleClose()} variant="warning">
                        Editar
                    </Button>
                </td>
            </tr>

            <ModalRubro
                showModal={showModal}
                handleClose={handleClose}
                rubro={props}
            />
        </>
    );
}

export default ItemRubro;