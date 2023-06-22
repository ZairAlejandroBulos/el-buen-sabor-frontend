import { NavLink } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

import { Endpoint } from "../../types/Endpoint";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import ItemArticuloInsumo from "./ItemArticuloInsumo";
import { useEntities } from "../../hooks/useEntities";

/**
 * Componente que muestra una lista de Artículos Insumos.
 * @author Castillo
 */
function TableArticuloInsumo(): JSX.Element {
    const { entities: articulosInsumos } = useEntities<ArticuloInsumo>(Endpoint.ArticuloInsumo);

    return (
        <>
            <Container className="mt-3">
                <h1>Artículos Insumos</h1>
                <NavLink 
                    className="btn btn-success"
                    to="/admin/stock/articulos-insumos/form/-1"
                >
                    Nuevo
                </NavLink >
            </Container>

            <Container className="table-scrollable mt-3">
                <Table responsive bordered hover >
                    <thead className="table-thead">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro</th>
                            <th>Costo</th>
                            <th>Stock Mínimo</th>
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
        </>
    );
}

export default TableArticuloInsumo;