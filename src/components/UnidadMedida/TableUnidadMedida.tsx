import { useState, useEffect, Suspense, lazy } from "react";
import { Button, Container, Table } from "react-bootstrap";

import { Endpoint } from "../../types/Endpoint";
import ItemUnidadMedida from "./ItemUnidadMedida";
import { UnidadMedida } from "../../types/UnidadMedida";
import { useModal } from "../../hooks/useModal";
import { useEntities } from "../../hooks/useEntities";
import { useReload } from "../../hooks/useReload";
const ModalUnidadMedida = lazy(() => import("./ModalUnidadMedida"));

/**
 * Componente que muestra una tabla de UnidadMedida.
 * Vista de Admin/Cocinero.
 * @author Castillo
 */
function TableUnidadMedida(): JSX.Element {
    const { reload, handleReload } = useReload();
    const { entities } = useEntities<UnidadMedida>(Endpoint.UnidadMedida, reload);
    const [unidadesMedidas, setUnidadesMedidas] = useState<UnidadMedida[]>([]);
    const { showModal, handleClose } = useModal();

    useEffect(() => {
        getUnidadesMedidas();
    }, [entities]);

    const getUnidadesMedidas = () => {
        setUnidadesMedidas(entities);
    };

    const handleReset = () => {
        handleReload();
    };

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
                                <ItemUnidadMedida 
                                    key={index} 
                                    unidadMedida={item} 
                                    handleReset={handleReset} 
                                />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <Suspense>
                <ModalUnidadMedida
                    showModal={showModal}
                    handleReset={handleReset}
                    handleClose={handleClose}
                />
            </Suspense>
        </>
    );
}

export default TableUnidadMedida;