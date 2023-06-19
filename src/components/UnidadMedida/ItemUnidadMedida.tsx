import { Suspense, lazy, useState } from "react";
import { Button } from "react-bootstrap";

import { UnidadMedida } from "../../types/UnidadMedida";
import { useModal } from "../../hooks/useModal";
import { useAuth0 } from "@auth0/auth0-react";
import { remove } from "../../services/BaseService";
import { TipoModal } from "../../types/TipoModal";
const ModalConfirmacion = lazy(() => import("../Modal/ModalConfirmacion"));
const ModalUnidadMedida = lazy(() => import("./ModalUnidadMedida"))
const ModalError = lazy(() => import("../Modal/ModalError"));

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
            await remove("unidad-medida", props.id, token);
            handleReset();
        } catch (error) {
            setTipoModal(TipoModal.Error);
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
                tipoModal === TipoModal.Editar ? (
                    <Suspense>
                        <ModalUnidadMedida
                            showModal={showModal}
                            handleClose={handleClose}
                            unidadMedida={props}
                        />
                    </Suspense>
                ) : tipoModal === TipoModal.Eliminar ? (
                    <Suspense>
                        <ModalConfirmacion
                            title="Confirmación de eliminación"
                            message={`¿Está seguro que desea eliminar la unidad de medida "${props.denominacion}"?`}
                            showModal={showModal}
                            onOk={handleDelete}
                            onCancel={handleClose}
                        />
                    </Suspense>
                ) : tipoModal === TipoModal.Error ? (
                    <Suspense>
                        <ModalError
                            title="Error al eliminar"
                            message={`La unidad de medida "${props.denominacion}" esta siendo utilizada en Articulos Insumos.`}
                            showModal={showModal}
                            handleClose={handleClose}
                        />
                    </Suspense>
                ) : null
            }
        </>
    );
}

export default ItemUnidadMedida;