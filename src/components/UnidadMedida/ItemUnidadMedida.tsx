import { Suspense, lazy, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { Endpoint } from "../../types/Endpoint";
import { TipoModal } from "../../types/TipoModal";
import { UnidadMedida } from "../../types/UnidadMedida";
import { useModal } from "../../hooks/useModal";
import { remove } from "../../services/BaseService";
const ModalConfirmacion = lazy(() => import("../Modal/ModalConfirmacion"));
const ModalUnidadMedida = lazy(() => import("./ModalUnidadMedida"))

/**
 * Componente que representa un elemento de UnidadMedida en la tabla.
 * @author Castillo
 */
function ItemUnidadMedida(props: UnidadMedida): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    const [tipoModal, setTipoModal] = useState<TipoModal>();

    const handleDelete = async () => {
        const token = await getAccessTokenSilently();

        try {
            await remove(Endpoint.UnidadMedida, props.id, token);
            handleReset();
        } catch (error) {
            toast.error(`No se pudo eliminar la Unidad de Medida "${props.denominacion}". Está siendo utiliza en Artículos Insumos.`, {
                position: toast.POSITION.TOP_CENTER
            });
            handleClose();
        }
    };

    const changeTipoModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    const handleReset = () => {
        handleClose();
        window.location.reload();
    };

    return (
        <>
            <tr>
                <td>
                    {props.denominacion}
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.Editar)} variant="warning">
                        Editar
                    </Button>
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.Eliminar)} variant="danger">
                        Eliminar
                    </Button>
                </td>
            </tr>

            {
                tipoModal === TipoModal.Editar
                ?
                <Suspense>
                    <ModalUnidadMedida
                        showModal={showModal}
                        handleClose={handleClose}
                        unidadMedida={props}
                    />
                </Suspense>
                :
                <Suspense>
                    <ModalConfirmacion
                        title="Confirmación de eliminación"
                        message={`¿Está seguro que desea eliminar la unidad de medida "${props.denominacion}"?`}
                        showModal={showModal}
                        onOk={handleDelete}
                        onCancel={handleClose}
                    />
                </Suspense>
            }
        </>
    );
}

export default ItemUnidadMedida;