import { Suspense, lazy, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

import { Endpoint } from "../../types/Endpoint";
import { TipoModal } from "../../types/TipoModal";
import { UnidadMedida } from "../../types/UnidadMedida";
import { useModal } from "../../hooks/useModal";
import { remove } from "../../services/BaseService";
import { toastError, toastExito } from "../../util/ToastUtil";
const ModalUnidadMedida = lazy(() => import("./ModalUnidadMedida"));
const ModalConfirmacion = lazy(() => import("../Modal/ModalConfirmacion"));

interface Props {
    unidadMedida: UnidadMedida;
    handleReload: () => void;
}

/**
 * Componente que representa un elemento de UnidadMedida en la tabla.
 * @author Castillo
 */
function ItemUnidadMedida({ unidadMedida, handleReload }: Props): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    const [tipoModal, setTipoModal] = useState<TipoModal>();

    const handleDelete = async () => {
        const token = await getAccessTokenSilently();

        try {
            await remove(Endpoint.UnidadMedida, unidadMedida.id, token);
            toastExito('La Unidad de Medida se eliminó exitosamente.');
            handleReload();
        } catch (error) {
            toastError(`No se pudo eliminar la Unidad de Medida "${unidadMedida.denominacion}". Está siendo utiliza en Artículos Insumos.`);
            handleClose();
        }
    };

    const changeTipoModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    return (
        <>
            <tr>
                <td>
                    { unidadMedida.denominacion }
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
                        handleReload={handleReload}
                        unidadMedida={unidadMedida}
                    />
                </Suspense>
                :
                <Suspense>
                    <ModalConfirmacion
                        title="Confirmación de eliminación"
                        message={`¿Está seguro que desea eliminar la unidad de medida "${unidadMedida.denominacion}"?`}
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