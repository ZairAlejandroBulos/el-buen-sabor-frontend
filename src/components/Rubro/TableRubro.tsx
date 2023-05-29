import "./Rubro.css";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Table } from "react-bootstrap";

import ModalRubro from "./ModalRubro";
import { Rubro } from "../../types/Rubro";
import ItemRubro from "./ItemRubro";
import { useModal } from "../../hooks/useModal";

import { findAllRubro } from "../../services/RubroService";

function TableRubro(): JSX.Element {
    const [rubrosArticulos, setRubrosArticulos] = useState<Rubro[]>([]);
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllRubros();
    }, []);

    const getAllRubros = async () => {
        const token = await getAccessTokenSilently();
        const newRubrosArticulos = await findAllRubro(token);
        setRubrosArticulos(newRubrosArticulos);
    };

    return(
        <>
            <Container className="container-header">
                <h1>Rubro</h1>
                <Button onClick={handleClose} variant="success">Nuevo</Button>
            </Container>

            <Container>
                <Table responsive bordered hover>
                    <thead className="thead-rubro">
                        <tr>
                            <th>Denominación</th>
                            <th>Rubro Padre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rubrosArticulos?.map((item: Rubro, index: number) =>
                                <ItemRubro key={index} 
                                    {...item}
                                />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <ModalRubro 
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
}

export default TableRubro;