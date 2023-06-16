import { Button } from "react-bootstrap";

import { UnidadMedida } from "../../types/UnidadMedida";
import ModalUnidadMedida from "./ModalUnidadMedida";
import { useModal } from "../../hooks/useModal";


function ItemUnidadMedida(props: UnidadMedida): JSX.Element {
    const { showModal, handleClose } = useModal();

    return (
        <>
            <tr>
                <td>
                    {props.denominacion}
                </td>

                <td>
                    <Button onClick={() => handleClose()} variant="warning">
                        Editar
                    </Button>
                </td>
            </tr>

            <ModalUnidadMedida
                showModal={showModal}
                handleClose={handleClose}
                unidadMedida={props}
            />
        </>
    );
}

export default ItemUnidadMedida;