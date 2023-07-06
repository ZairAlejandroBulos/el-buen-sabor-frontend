import { Search } from "react-bootstrap-icons";
import { Suspense, useEffect, useState, lazy } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

import ItemCliente from "./ItemCliente";
import { Cliente, TipoCliente } from "../../../types/Cliente";
import { useModal } from "../../../hooks/useModal";
import { useReload } from "../../../hooks/useReload";
import { useClientes } from "../../../hooks/useClientes";
const ModalCliente = lazy(() => import("./ModalCliente"));

/**
 * Componente que muestra una tabla de Clientes.
 * Vista de Admin.
 * @author Bulos
 */
function TableCliente(): JSX.Element {
    const { reload, handleReload } = useReload();
    const { showModal, handleClose } = useModal();
    const [search, setSearch] = useState<string>('');
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const { entities } = useClientes(TipoCliente.Cliente, reload);

    useEffect(() => {
        getClientes();
    }, [entities, search]);

    const getClientes = async () => {
        if (search === '') {
            setClientes(entities);
        } else {
            setClientes(filterClientes(entities, search));
        }
    };

    const filterClientes = (clientes: Cliente[], search: string): Cliente[] => {
        return clientes.filter((cliente) =>
            cliente.nombre.toLowerCase().includes(search.toLowerCase()) ||
            cliente.apellido.toLowerCase().includes(search.toLowerCase()) ||
            cliente.usuario.email.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>
                   Clientes
                </h1>
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
                                placeholder="Buscar clientes..."
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
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Estado</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        No se encotraron clientes para la búsqueda '{ search }'.
                                    </td>
                                </tr>
                            ) : (
                                clientes.map((item: Cliente, index: number) => (
                                    <ItemCliente
                                        key={index}
                                        cliente={item}
                                        handleReload={handleReload}
                                    />
                                ))
                            )}
                    </tbody>
                </Table>
            </Container>

            <Suspense>
                <ModalCliente
                    showModal={showModal}
                    handleClose={handleClose}
                    handleReload={handleReload}
                />
            </Suspense>
        </>
    );
}

export default TableCliente;