import "./TableUsuario.css";
import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";

import ItemUsuario from "./ItemUsuario";
import Cliente from "../../../types/Cliente";

import { clientes as clientesJson } from "../../../mocks/clientes.json";
import { empleados as empleadosJson } from "../../../mocks/empleados.json";
import ModalRegistro from "./ModalRegistro";
import { useModal } from "../../../hooks/useModal";

function TableUsuario(): JSX.Element {
    const [filtro, setFiltro] = useState("");
    const [tipo, setTipo] = useState("Usuario");
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const { showModal, handleClose } = useModal();

    useEffect(() => {
        if (tipo === "Usuario") {
            setClientes(clientesJson);
        } else {
            setClientes(empleadosJson);
        }
    }, [tipo]);

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
            <Container>
                <Button onClick={() => setTipo("Usuario")} variant="link">
                    Usuarios
                </Button>
                |
                <Button onClick={() => setTipo("Empleado")} variant="link">
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