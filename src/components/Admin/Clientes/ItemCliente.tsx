import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Suspense, useState, lazy } from "react";

import { Cliente } from "../../../types/Cliente";
import { useModal } from "../../../hooks/useModal";
import { TipoModal } from "../../../types/TipoModal";
import { updateEstadoUsuario } from "../../../services/ClienteService";
import { updateEstadoAuth0Usuario } from "../../../services/Auth0Service";
const ModalCliente = lazy(() => import("./ModalCliente"));
const ModalConfirmacion = lazy(() => import("../../Modal/ModalConfirmacion"));

interface Props {
    cliente: Cliente;
    handleReload: () => void;
}

/**
 * Componente que representa un elemento de Cliente en la tabla.
 * @author Bulos 
 */
function ItemCliente({ cliente, handleReload }: Props): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    const [tipoModal, setTipoModal] = useState<TipoModal>();

    const handleChangeEstado = async () => {
        const token = await getAccessTokenSilently();

        await updateEstadoAuth0Usuario(cliente.usuario.auth0Id, !cliente.usuario.bloqueado, token);
        await updateEstadoUsuario(cliente.id, token);

        handleReload();
        handleClose();
    };

    const changeTipoModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    return(
        <>
            <tr style={{ backgroundColor: cliente.usuario.bloqueado ? '#BFC5CA' : '' }}>
                <td>
                    { cliente.nombre } { cliente.apellido }
                </td>
                <td>
                    { cliente.usuario.email }
                </td>
                <td>
                    { cliente.telefono }
                </td>
                <td>
                    { cliente.domicilio.calle }, { cliente.domicilio.numero }, { cliente.domicilio.localidad.nombre }
                </td>
                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.Editar)} variant="warning">
                        Editar
                    </Button>
                </td>
                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.CambiarEstado)} variant="danger">
                        { cliente.usuario.bloqueado ? 'Desbloquear' : 'Bloquear' }
                    </Button>
                </td>
            </tr>

            {
                tipoModal === TipoModal.Editar
                ?
                <Suspense>
                    <ModalCliente 
                        showModal={showModal}
                        handleClose={handleClose}
                        handleReload={handleReload}
                        cliente={cliente}
                    />
                </Suspense>
                :
                <Suspense>
                    <ModalConfirmacion
                        title="Confirmación de Bloqueo/Desbloqueo"
                        message={`¿Está seguro que desea ${cliente.usuario.bloqueado ? 'desbloquear' : 'bloquear'} al Cliente "${cliente.nombre}"?`}
                        showModal={showModal}
                        onOk={handleChangeEstado}
                        onCancel={handleClose}
                    />
                </Suspense>
            }
        </>
    );
}

export default ItemCliente;