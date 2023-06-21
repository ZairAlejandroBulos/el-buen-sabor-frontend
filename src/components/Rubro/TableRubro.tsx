import { Suspense, lazy } from "react";
import { Button, Container, Table } from "react-bootstrap";

import ItemRubro from "./ItemRubro";
import { Rubro } from "../../types/Rubro";
import { useModal } from "../../hooks/useModal";
import { useEntities } from "../../hooks/useEntities";
import { Endpoint } from "../../types/Endpoint";
const ModalRubro = lazy(() => import("./ModalRubro"));

/**
 * Componente que muestra una tabla de Rubros.
 * Vista de Admin/Cocinero.
 * @author Bulos
 */
function TableRubro(): JSX.Element {
    const { entities: rubros } = useEntities<Rubro>(Endpoint.Rubro);
    const { showModal, handleClose } = useModal();

    return (
        <>
            <Container className="d-flex mt-3">
                <h1>Rubro</h1>
                <Button onClick={handleClose} variant="success">Nuevo</Button>
            </Container>

            <Container className="table-scrollable">
                <Table responsive bordered hover>
                    <thead className="table-thead">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro Principal</th>
                            <th>Estado</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rubros?.map((item: Rubro, index: number) =>
                                <ItemRubro key={index} {...item} />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <Suspense>
                <ModalRubro
                    showModal={showModal}
                    handleClose={handleClose}
                    />
            </Suspense>
        </>
    );
}

export default TableRubro;