import { Search } from "react-bootstrap-icons";
import { Suspense, useEffect, useState, lazy } from "react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

import ItemEmpleado from "./ItemEmpleado";
import { useModal } from "../../../hooks/useModal";
import { useReload } from "../../../hooks/useReload";
import { useClientes } from "../../../hooks/useClientes";
import { Cliente, TipoCliente } from "../../../types/Cliente";
const ModalEmpleado = lazy(() => import("./ModalEmpleado"));

/**
 * Componentes que muestra una tabla de Empleados.
 * Vista de Admin.
 * @author Bulos
 */
function TableEmpleado(): JSX.Element {
    const { reload, handleReload } = useReload();
    const { showModal, handleClose } = useModal();
    const [search, setSearch] = useState<string>('');
    const [empleados, setEmpleados] = useState<Cliente[]>([]);
    const { entities } = useClientes(TipoCliente.Empleado, reload);

    useEffect(() => {
        getEmpleados();
    }, [entities, search]);

    const getEmpleados = async () => {
        if (search === '') {
            setEmpleados(entities);
        } else {
            setEmpleados(filterEmpleados(entities, search));
        }
    };

    const filterEmpleados = (empleados: Cliente[], search: string): Cliente[] => {
        return empleados.filter((empleado) =>
            empleado.nombre.toLowerCase().includes(search.toLowerCase()) ||
            empleado.apellido.toLowerCase().includes(search.toLowerCase()) ||
            empleado.usuario.email.toLowerCase().includes(search.toLowerCase())
        );
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Empleados</h1>
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
                                placeholder="Buscar empleados..."
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
                            empleados.length === 0 ? (
                                <tr>
                                    <td colSpan={6}>
                                        No se encotraron empleados para la búsqueda '{ search }'.
                                    </td>
                                </tr>
                            ) : (
                                empleados.map((item: Cliente, index: number) => (
                                    <ItemEmpleado
                                        key={index}
                                        empleado={item}
                                        handleReload={handleReload}
                                    />
                                ))
                            )}
                    </tbody>
                </Table>
            </Container>

            <Suspense>
                <ModalEmpleado
                    showModal={showModal}
                    handleClose={handleClose}
                    handleReload={handleReload}
                />
            </Suspense>
        </>
    );
}

export default TableEmpleado;