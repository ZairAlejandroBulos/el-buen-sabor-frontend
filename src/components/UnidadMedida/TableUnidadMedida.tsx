import { Search } from "react-bootstrap-icons";
import { useState, useEffect, Suspense, lazy } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

import ItemUnidadMedida from "./ItemUnidadMedida";
import { Endpoint } from "../../types/Endpoint";
import { UnidadMedida } from "../../types/UnidadMedida";
import { useModal } from "../../hooks/useModal";
import { useReload } from "../../hooks/useReload";
import { useEntities } from "../../hooks/useEntities";
const ModalUnidadMedida = lazy(() => import("./ModalUnidadMedida"));

/**
 * Componente que muestra una tabla de UnidadMedida.
 * Vista de Admin/Cocinero.
 * @author Castillo
 */
function TableUnidadMedida(): JSX.Element {
    const { reload, handleReload } = useReload();
    const { showModal, handleClose } = useModal();
    const [search, setSearch] = useState<string>('');
    const { entities } = useEntities<UnidadMedida>(Endpoint.UnidadMedida, reload);
    const [unidadesMedidas, setUnidadesMedidas] = useState<UnidadMedida[]>([]);

    useEffect(() => {
        getUnidadesMedidas();
    }, [entities, search]);

    const getUnidadesMedidas = () => {
        if (search === '') {
            setUnidadesMedidas(entities);
        } else {
            setUnidadesMedidas(filterUnidadesMedidas(entities, search));
        }
    };

    const filterUnidadesMedidas = (unidadesMedidas: UnidadMedida[], search: string): UnidadMedida[] => {
        return unidadesMedidas.filter((unidadMedida) =>
            unidadMedida.denominacion.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Unidad de Medida</h1>
            </Container>

            <Container className="mb-3">
                <Row>
                    <Col>
                        <Button onClick={handleClose} variant="success">
                            Nuevo
                        </Button>
                    </Col>
                    <Col>
                        <InputGroup>
                            <Form.Control
                                id="search"
                                name="search"
                                type="search"
                                placeholder="Buscar unidades de medidas..."
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
                            unidadesMedidas.length === 0 ? (
                                <tr>
                                    <td colSpan={3}>
                                        No se encontraron unidades de medida para la búsqueda '{ search }'.
                                    </td>
                                </tr>
                            ) : (
                                unidadesMedidas.map((item: UnidadMedida) =>
                                    <ItemUnidadMedida
                                        key={item.id}
                                        unidadMedida={item}
                                        handleReload={handleReload}
                                    />
                                )
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <Suspense>
                <ModalUnidadMedida
                    showModal={showModal}
                    handleReload={handleReload}
                    handleClose={handleClose}
                />
            </Suspense>
        </>
    );
}

export default TableUnidadMedida;