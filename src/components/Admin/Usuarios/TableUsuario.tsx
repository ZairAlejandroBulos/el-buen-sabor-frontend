import "./TableUsuario.css";
import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import ItemUsuario from "./ItemUsuario";
import ModalRegistro from "./ModalRegistro";
import { useModal } from "../../../hooks/useModal";
import { Cliente } from "../../../types/Cliente";
import { findAllClientesByRoles } from "../../../services/ClienteService";

function TableUsuario(): JSX.Element {
    const [filtro, setFiltro] = useState("");
    const [tipo, setTipo] = useState("Usuario");
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getClientesByRoles();
    }, [tipo]);

    const getClientesByRoles = async () => {
        const token = await getAccessTokenSilently();
        let roles: string[] = [];

        if(tipo === "Usuario") {
            roles = ["Usuario"];
        } else {
            roles = ["Admin", "Cocinero", "Delivery", "Cajero"];
        }

        const newClientes = await findAllClientesByRoles(roles, token);
        setClientes(newClientes);
    }

    const handleChangeFiltro = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFiltro = event.target.value;
        setFiltro(newFiltro);
    };

    const handleFiltro = async () => {
        /*
        const newClientes = await findClienteByName(filtro);
        setClientes(newClientes);
        */
    };

    return (
        <>
            <Container className="text-center">
                <Button onClick={() => setTipo("Usuario")} variant="dark">
                    Usuarios
                </Button>
                <Button onClick={() => setTipo("Empleado")} variant="dark">
                    Empleados
                </Button>
            </Container>

            <Container className="d-flex mb-3 mt-3">
                <InputGroup>
                    <Form.Label htmlFor="search" style={{ marginRight: '10px' }}>Nombre</Form.Label>

                    <Form.Control 
                        id="search"
                        name="search"
                        type="text"
                        onChange={handleChangeFiltro}
                        />
                    <Button onClick={handleFiltro} variant="light">
                        <i className="bi bi-search"></i>
                    </Button>
                </InputGroup>
                <Button onClick={handleClose} variant="success">Nuevo</Button>
            </Container>

            <Table responsive bordered hover>
                <thead className="thead-cliente">
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
                        clientes.map((item: Cliente, index: number) =>
                            <ItemUsuario key={index}
                                {...item}
                            />
                        )
                    }
                </tbody>
            </Table>
            
            <ModalRegistro
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
}

export default TableUsuario;