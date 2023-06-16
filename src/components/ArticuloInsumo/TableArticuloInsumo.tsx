import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Table } from "react-bootstrap";

import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import ItemArticuloInsumo from "./ItemArticuloInsumo";
import { findAllArticuloInsumoFull } from "../../services/ArticuloInsumoService";

/**
 * Componente que muestra una lista de Artículos Insumos.
 * @author Castillo
 */
function TableArticuloInsumo(): JSX.Element {
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllArticuloInsumos();
    }, []);

    const getAllArticuloInsumos = async () => {
        const token = await getAccessTokenSilently();

        const newArticulosInsumos = await findAllArticuloInsumoFull(token);
        setArticulosInsumos(newArticulosInsumos);
    };

    return (
        <>
            <Container className="d-flex mt-3">
                <h1>Artículos Insumos</h1>
                <Button
                    variant="success"
                    href="/admin/stock/articulos-insumos/form/-1"
                >
                    Nuevo
                </Button>
            </Container>

            <Container className="table-scrollable mt-3">
                <Table responsive bordered hover >
                    <thead className="table-thead">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro</th>
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
        </>
    );
}

export default TableArticuloInsumo;