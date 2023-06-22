import { Button, Container, Table } from "react-bootstrap";

import { Endpoint } from "../../types/Endpoint";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import ItemArticuloManufacturado from "./ItemArticuloManufacturado";
import { useEntities } from "../../hooks/useEntities";

/**
 * Componente que muestra una tabla de Artículos Manufacturados.
 * Vista de Admin/Cocinero.
 * @author Bulos 
 */
function TableArticuloManufacturado(): JSX.Element {
    const { entities: articulosManufacturados } = useEntities<ArticuloManufacturado>(Endpoint.ArticuloManufacturado);

    return (
        <>
            <Container className="d-flex mt-3">
                <h1>Artículos Manufacturados</h1>
                <Button
                    href="/admin/stock/articulos-manufacturados/form/-1"
                    variant="success"
                >
                    Nuevo
                </Button>
            </Container>

            <Container className="table-scrollable mt-3">
                <Table responsive bordered hover>
                    <thead className="table-thead">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro</th>
                            <th>Tiempo Preparación</th>
                            <th>Precio Venta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articulosManufacturados.map((item: ArticuloManufacturado, index: number) =>
                                <ItemArticuloManufacturado key={index} {...item} />
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default TableArticuloManufacturado;