import "./ArticuloManufacturado.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Table } from "react-bootstrap";

import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import ItemArticuloManufacturado from "./ItemArticuloManufacturado";
import { findAllArticuloManufacturadosFull } from "../../services/ArticuloManufacturadoService";

/**
 * Componente que muestra una tabla de Artículos Manufacturados.
 * Vista de Admin/Cocinero.
 * @author Bulos 
 */
function TableArticuloManufacturado(): JSX.Element {
    const [articulosManufactuados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllArticuloManufacturados();
    }, []);

    const getAllArticuloManufacturados = async () => {
        const token = await getAccessTokenSilently();
        const newArticulosManufactuados = await findAllArticuloManufacturadosFull(token);
        setArticulosManufacturados(newArticulosManufactuados);
    };

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
                    <thead className="thead-articulo-manufacturado">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro</th>
                            <th>Tiempo Preparación</th>
                            <th>Precio Venta</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articulosManufactuados.map((item: ArticuloManufacturado, index: number) =>
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