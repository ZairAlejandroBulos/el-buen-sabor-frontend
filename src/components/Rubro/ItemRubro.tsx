import { Suspense, lazy, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { Rubro } from "../../types/Rubro";
import { useModal } from "../../hooks/useModal";
import { bloquearDebloquearRubro } from "../../services/RubroService";
import { TipoModal } from "../../types/TipoModal";
const ModalRubro = lazy(() => import("./ModalRubro"));
const ModalConfirmacion = lazy(() => import("../Modal/ModalConfirmacion"));

/**
 * Componente que representa un elemento de Rubro en la tabla.
 * @author Bulos
 */
function ItemRubro(props: Rubro): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    const [tipoModal, setTipoModal] = useState<TipoModal>();

    const handleBloquearDebloquear = async () => {
        const token = await getAccessTokenSilently();

        await bloquearDebloquearRubro(props.id, token);
        window.location.reload();
    };

    const changeTipoModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    return (
        <>
            <tr style={{ backgroundColor: props.bloqueado ? '#BFC5CA' : '' }}>
                <td>
                    {props.denominacion}
                </td>

                <td>
                    {props.rubroPadreDenominacion}
                </td>

                <td>
                    {props.bloqueado ? 'Bloqueado' : 'Activo'}
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.Editar)} variant="warning">
                        Editar
                    </Button>
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.CambiarEstado)} variant="danger">
                        {props.bloqueado ? 'Desbloquear' : 'Bloquear'}
                    </Button>
                </td>
            </tr>

            { 
                tipoModal === TipoModal.Editar
                ?
                <Suspense>
                    <ModalRubro 
                        showModal={showModal} 
                        handleClose={handleClose} 
                        rubro={props} 
                    />
                </Suspense>
                :
                <Suspense>
                    <ModalConfirmacion
                        title="Confirmación de Bloqueo/Desbloqueo"
                        message={`¿Está seguro que desea ${props.bloqueado ? 'desbloquear' : 'bloquear'} el Rubro "${props.denominacion}"?`}
                        showModal={showModal}
                        onOk={handleBloquearDebloquear}
                        onCancel={handleClose}
                    />
                </Suspense>
            }
        </>
    );
}

export default ItemRubro;