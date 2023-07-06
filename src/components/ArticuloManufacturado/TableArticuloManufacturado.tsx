import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Search } from "react-bootstrap-icons";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

import { Endpoint } from "../../types/Endpoint";
import { useEntities } from "../../hooks/useEntities";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import ItemArticuloManufacturado from "./ItemArticuloManufacturado";

/**
 * Componente que muestra una tabla de Artículos Manufacturados.
 * Vista de Admin/Cocinero.
 * @author Bulos 
 */
function TableArticuloManufacturado(): JSX.Element {
    const [search, setSearch] = useState<string>('');
    const { entities } = useEntities<ArticuloManufacturado>(Endpoint.ArticuloManufacturado);
    const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);

    useEffect(() => {
        getArticulosManufacturados();
    }, [entities, search]);

    const getArticulosManufacturados = async () => {
        if (search === '') {
            setArticulosManufacturados(entities);
        } else {
            setArticulosManufacturados(filterArticulosManufacurados(entities, search));
        }
    };

    const filterArticulosManufacurados = (articulosManufacturados: ArticuloManufacturado[], search: string): ArticuloManufacturado[] => {
        return articulosManufacturados.filter((articuloManufacturado) =>
            articuloManufacturado.denominacion.toLowerCase().includes(search.toLowerCase()) ||
            articuloManufacturado.descripcion.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Artículos Manufacturados</h1>
            </Container>

            <Container className="mb-3">
                <Row>
                    <Col>
                        <NavLink
                            className="btn btn-success me-2"
                            to="/admin/stock/articulos-manufacturados/form/-1"
                        >
                            Nuevo
                        </NavLink>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Form.Control
                                id="search"
                                name="search"
                                type="search"
                                placeholder="Buscar artículos manufacturados..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <Button variant="light">
                                <Search />
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>
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
                            articulosManufacturados.length === 0 ? (
                                <tr>
                                    <td colSpan={5}>
                                        No se encontraron artículos manufacturados para la búsqueda '{ search }'.
                                    </td>
                                </tr>
                            ) : (
                                articulosManufacturados.map((item: ArticuloManufacturado) =>
                                    <ItemArticuloManufacturado 
                                        key={item.id} 
                                        {...item} 
                                    />
                                )
                            )
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default TableArticuloManufacturado;