import { Button, Col, Container, Table } from "react-bootstrap";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { useArticulosInsumos } from "../../hooks/useArticulosInsumos";
import ItemArticuloInsumo from "./ItemArticuloInsumo";
import "./ArticuloInsumo.css";
import ModalArticuloInsumo from "./ModalArticuloInsumo";
import { useModal } from "../../hooks/useModal";

/**
 * Componente que muestra una lista de Artículos Insumos.
 * @author Castillo
 */
function ListArticuloInsumo(): JSX.Element {
    const { showModal, handleClose } = useModal();
    const { articulosInsumos } = useArticulosInsumos();

    return (
        <>
            <Container fluid="md" className="container-articulo-insumo">
                <h1>Ingredientes<Button onClick={handleClose} variant="success">Nuevo</Button></h1>
                <Table responsive bordered hover >
                    <thead className="thead-cliente">
                        <tr>
                            <th>Nombre</th>
                            <th>Costo</th>
                            <th>Stock Minimo</th>
                            <th>Stock Actual</th>
                            <th>Unidad Medida</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articulosInsumos.map((item: ArticuloInsumo, index: number) =>
                                <ItemArticuloInsumo key={index}
                                    {...item}
                                />
                            )
                        }
                    </tbody>
                </Table>

            </Container>

            {/*<ModalArticuloInsumo
                showModal={showModal}
                handleClose={handleClose}
            />*/}

        </>
    );


}
export default ListArticuloInsumo;