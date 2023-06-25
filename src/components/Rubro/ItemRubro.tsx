import { Suspense, lazy, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { Rubro } from "../../types/Rubro";
import { useModal } from "../../hooks/useModal";
import { bloquearDebloquearRubro } from "../../services/RubroService";
import { TipoModal } from "../../types/TipoModal";
const ModalRubro = lazy(() => import("./ModalRubro"));
const ModalConfirmacion = lazy(() => import("../Modal/ModalConfirmacion"));

interface Props {
    rubro: Rubro;
    handleReset: () => void;
}

/**
 * Componente que representa un elemento de Rubro en la tabla.
 * @author Bulos
 */
function ItemRubro({ rubro, handleReset }: Props): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();
    const [tipoModal, setTipoModal] = useState<TipoModal>();

    const handleBloquearDebloquear = async () => {
        const token = await getAccessTokenSilently();

        await bloquearDebloquearRubro(rubro.id, token);
        handleReset();
        handleClose();
    };

    const changeTipoModal = (tipo: TipoModal) => {
        setTipoModal(tipo);
        handleClose();
    };

    return (
        <>
            <tr style={{ backgroundColor: rubro.bloqueado ? '#BFC5CA' : '' }}>
                <td>
                    { rubro.denominacion }
                </td>

                <td>
                    { rubro.rubroPadreDenominacion }
                </td>

                <td>
                    { rubro.esInsumo ? 'Insumo' : 'Producto' }
                </td>

                <td>
                    { rubro.bloqueado ? 'Bloqueado' : 'Activo' }
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.Editar)} variant="warning">
                        Editar
                    </Button>
                </td>

                <td>
                    <Button onClick={() => changeTipoModal(TipoModal.CambiarEstado)} variant="danger">
                        { rubro.bloqueado ? 'Desbloquear' : 'Bloquear' }
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
                        handleReset={handleReset} 
                        rubro={rubro} 
                    />
                </Suspense>
                :
                <Suspense>
                    <ModalConfirmacion
                        title="Confirmación de Bloqueo/Desbloqueo"
                        message={`¿Está seguro que desea ${rubro.bloqueado ? 'desbloquear' : 'bloquear'} el Rubro "${rubro.denominacion}"?`}
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