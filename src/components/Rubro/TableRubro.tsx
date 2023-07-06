import { Search } from "react-bootstrap-icons";
import { Suspense, lazy, useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

import ItemRubro from "./ItemRubro";
import { Rubro } from "../../types/Rubro";
import { Endpoint } from "../../types/Endpoint";
import { useModal } from "../../hooks/useModal";
import { useReload } from "../../hooks/useReload";
import { useEntities } from "../../hooks/useEntities";
const ModalRubro = lazy(() => import("./ModalRubro"));

/**
 * Componente que muestra una tabla de Rubros.
 * Vista de Admin/Cocinero.
 * @author Bulos
 */
function TableRubro(): JSX.Element {
    const { reload, handleReload } = useReload();
    const { showModal, handleClose } = useModal();
    const [search, setSearch] = useState<string>('');
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const { entities } = useEntities<Rubro>(Endpoint.Rubro, reload);

    useEffect(() => {
        getRubros();
    }, [entities, search]);

    const getRubros = async () => {
        if (search === '') {
            setRubros(entities);
        } else {
            setRubros(filterRubros(entities, search));
        }
    };

    const filterRubros = (rubros: Rubro[], search: string): Rubro[] => {
        return rubros.filter((rubro) =>
            rubro.denominacion.toLowerCase().includes(search.toLowerCase()) ||
            rubro.rubroPadreDenominacion?.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Rubro</h1>
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
                                placeholder="Buscar rubros..."
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
                            <th>Rubro Principal</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rubros.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        No se encontraron rubros para la búsqueda '{search}'.
                                    </td>
                                </tr>
                            ) : (
                                rubros.map((item: Rubro) =>
                                    <ItemRubro
                                        key={item.id}
                                        rubro={item}
                                        handleReload={handleReload}
                                    />
                                )
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <Suspense>
                <ModalRubro
                    showModal={showModal}
                    handleClose={handleClose}
                    handleReload={handleReload}
                />
            </Suspense>
        </>
    );
}

export default TableRubro;