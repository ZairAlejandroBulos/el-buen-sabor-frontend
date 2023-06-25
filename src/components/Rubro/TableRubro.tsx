import { Suspense, lazy, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

import ItemRubro from "./ItemRubro";
import { Rubro } from "../../types/Rubro";
import { Endpoint } from "../../types/Endpoint";
import { useModal } from "../../hooks/useModal";
import { useReload } from "../../hooks/useReload";
import { useEntities } from "../../hooks/useEntities";
const ModalRubro = lazy(() => import("./ModalRubro"));

/**
 * Componente que muestra una tabla de Rubros.
 * Vista de Admin/Cocinero.
 * @author Bulos
 */
function TableRubro(): JSX.Element {
    const { reload, handleReload } = useReload();
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const { entities } = useEntities<Rubro>(Endpoint.Rubro, reload);
    const { showModal, handleClose } = useModal();

    useEffect(() => {
        getRubros();
    }, [entities]);

    const getRubros = async () => {
        setRubros(entities);
    };

    const handleReset = () => {
        handleReload();
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Rubro</h1>
                <Button onClick={handleClose} variant="success">
                    Nuevo
                </Button>
            </Container>

            <Container className="table-scrollable">
                <Table responsive bordered hover>
                    <thead className="table-thead">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro Principal</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rubros?.map((item: Rubro, index: number) =>
                                <ItemRubro 
                                    key={index} 
                                    rubro={item} 
                                    handleReset={handleReset} 
                                />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <Suspense>
                <ModalRubro
                    showModal={showModal}
                    handleClose={handleClose}
                    handleReset={handleReset} 
                />
            </Suspense>
        </>
    );
}

export default TableRubro;