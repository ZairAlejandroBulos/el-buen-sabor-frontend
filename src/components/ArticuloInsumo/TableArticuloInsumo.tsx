import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

import { Endpoint } from "../../types/Endpoint";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import ItemArticuloInsumo from "./ItemArticuloInsumo";
import { useEntities } from "../../hooks/useEntities";

/**
 * Componente que muestra una lista de Artículos Insumos.
 * @author Castillo
 */
function TableArticuloInsumo(): JSX.Element {
    const [search, setSearch] = useState<string>('');
    const { entities } = useEntities<ArticuloInsumo>(Endpoint.ArticuloInsumo);
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);

    useEffect(() => {
        getArticulosInsumos();
    }, [entities, search]);

    const getArticulosInsumos = async () => {
        if (search === '') {
            setArticulosInsumos(entities);
        } else {
            setArticulosInsumos(filterArticulosInsumos(entities, search));
        }
    };

    const filterArticulosInsumos = (articulosInsumos: ArticuloInsumo[], search: string): ArticuloInsumo[] => {
        return articulosInsumos.filter((articuloInsumo) =>
            articuloInsumo.denominacion.toLowerCase().includes(search.toLowerCase()) ||
            articuloInsumo.rubro.denominacion.toLowerCase().includes(search.toLowerCase()) ||
            articuloInsumo.unidadMedida.denominacion.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Artículos Insumos</h1>
            </Container>

            <Container className="mb-3">
                <Row>
                    <Col>
                        <NavLink
                            className="btn btn-success"
                            to="/admin/stock/articulos-insumos/form/-1"
                        >
                            Nuevo
                        </NavLink >
                    </Col>
                    <Col>
                        <InputGroup>
                            <Form.Control
                                id="search"
                                name="search"
                                type="search"
                                placeholder="Buscar artículos insumos..."
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
                <Table responsive bordered hover >
                    <thead className="table-thead">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro</th>
                            <th>Costo</th>
                            <th>Stock Mínimo</th>
                            <th>Stock Actual</th>
                            <th>Unidad de Medida</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articulosInsumos.length === 0 ? (
                                <tr>
                                    <td colSpan={7}>
                                        No se encontraron artículos insumos para la búsqueda '{ search }'.
                                    </td>
                                </tr>
                            ) : (
                                articulosInsumos.map((item: ArticuloInsumo) =>
                                    <ItemArticuloInsumo 
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

export default TableArticuloInsumo;