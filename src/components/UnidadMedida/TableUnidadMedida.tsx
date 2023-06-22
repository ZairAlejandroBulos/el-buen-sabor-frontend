import { Suspense, lazy } from "react";
import { useModal } from "../../hooks/useModal";
import { Button, Container, Table } from "react-bootstrap";

import ItemUnidadMedida from "./ItemUnidadMedida";
import { UnidadMedida } from "../../types/UnidadMedida";
import { useEntities } from "../../hooks/useEntities";
import { Endpoint } from "../../types/Endpoint";
const ModalUnidadMedida = lazy(() => import("./ModalUnidadMedida"));

/**
 * Componente que muestra una tabla de UnidadMedida.
 * Vista de Admin/Cocinero.
 * @author Castillo
 */
function TableUnidadMedida(): JSX.Element {
    const { entities: unidadesMedidas } = useEntities<UnidadMedida>(Endpoint.UnidadMedida);
    const { showModal, handleClose } = useModal();

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Unidad de Medida</h1>
                <Button onClick={handleClose} variant="success">
                    Nuevo
                </Button>
            </Container>

            <Container className="table-scrollable">
                <Table responsive bordered hover>
                    <thead className="table-thead">
                        <tr>
                            <th>Denominación</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            unidadesMedidas?.map((item: UnidadMedida, index: number) =>
                                <ItemUnidadMedida key={index}
                                    {...item}
                                />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <Suspense>
                <ModalUnidadMedida
                    showModal={showModal}
                    handleClose={handleClose}
                    />
            </Suspense>
        </>
    );
}

export default TableUnidadMedida;