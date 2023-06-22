import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Col, Container, Form, InputGroup, Row, Table } from "react-bootstrap";

import ItemUsuario from "./ItemUsuario";
import ModalRegistro from "./ModalRegistro";
import { useModal } from "../../../hooks/useModal";
import { Cliente } from "../../../types/Cliente";
import { findAllClientesByNombre, findAllClientesByNombreAndApellido, findAllClientesByRoles } from "../../../services/ClienteService";

/**
 * Componente que muestra una tabla de Usuarios (Rol: Usuarios/Empleados).
 * Vista de Admin.
 * @author Bulos
 */
function TableUsuario(): JSX.Element {
    const { usuario } = useParams<string>();

    const [filtro, setFiltro] = useState("");
    const [usuarios, setUsuarios] = useState<Cliente[]>([]);
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getClientesByRoles();
    }, [usuario]);

    const getClientesByRoles = async () => {
        const token = await getAccessTokenSilently();
        let roles: string[] = [];

        if (usuario === "clientes") {
            roles = ["Usuario"];
        } else {
            roles = ["Admin", "Cocinero", "Delivery", "Cajero"];
        }

        const newUsuarios = await findAllClientesByRoles(roles, token);
        setUsuarios(newUsuarios);
    }

    const handleChangeFiltro = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiltro = event.target.value;
        setFiltro(newFiltro);
    };

    const handleFiltro = async () => {
        const token = await getAccessTokenSilently();

        if (filtro.trim() !== "") {
            const filtroArray = filtro.trim().split(" ");

            if (filtroArray.length === 1) {
                const nombre = filtroArray[0];
                
                const newUsuarios = await findAllClientesByNombre(nombre, token);
                setUsuarios(newUsuarios);
            } else {
                const nombre = filtroArray[0];
                const apellido = filtroArray.slice(1).join(" ");
                
                const newUsuarios = await findAllClientesByNombreAndApellido(nombre, apellido, token);
                setUsuarios(newUsuarios);
            }
        } else {
            getClientesByRoles();
        }

        setFiltro("");
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>
                    { usuario === 'clientes' ? 'Clientes' : 'Empleados'  }
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
                                placeholder="Nombre y Apellido"
                                onChange={handleChangeFiltro}
                            />
                            <Button onClick={handleFiltro} variant="light">
                                <i className="bi bi-search"></i>
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
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Dirección</th>
                            <th>Departamento</th>
                            <th colSpan={2}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usuarios.map((item: Cliente, index: number) =>
                                <ItemUsuario key={index}
                                    {...item}
                                />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <ModalRegistro
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
}

export default TableUsuario;