import { UnidadMedida } from "../../types/UnidadMedida";
import { useModal } from "../../hooks/useModal";
import { Button, Container, Table } from "react-bootstrap";
import ItemUnidadMedida from "./ItemUnidadMedida";
import ModalUnidadMedida from "./ModalUnidadMedida";
import { useUnidadMedida } from "../../hooks/useUnidadMedida";

/**
 * Componente que muestra una tabla de UnidadMedida.
 * Vista de Admin/Cocinero.
 * @author Castillo
 */
function TableUnidadMedida(): JSX.Element {
    const { unidadMedida } = useUnidadMedida();
    const { showModal, handleClose } = useModal();

    return (
        <>
            <Container className="d-flex mt-3">
                <h1>Unidad Medida</h1>
                <Button onClick={handleClose} variant="success">Nuevo</Button>
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
                            unidadMedida?.map((item: UnidadMedida, index: number) =>
                                <ItemUnidadMedida key={index}
                                    {...item}
                                />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <ModalUnidadMedida
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
}

export default TableUnidadMedida;