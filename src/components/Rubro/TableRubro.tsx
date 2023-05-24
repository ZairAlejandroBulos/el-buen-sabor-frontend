import "./Rubro.css";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

import ModalRubro from "./ModalRubro";
import Rubro from "../../types/Rubro";
import ItemRubro from "./ItemRubro";
import { useModal } from "../../hooks/useModal";

import { rubros as rubrosJson } from "../../mocks/rubros.json";

function TableRubro(): JSX.Element {
    const [rubrosArticulos, setRubrosArticulos] = useState<Rubro[]>(rubrosJson);
    const { showModal, handleClose } = useModal();

    // TODO: Probar llamada al backend
    /*
    useEffect(() => {
        getRubrosArticulos();
    }, []);

    const getRubrosArticulos = async () => {
        const newRubrosArticulos = await findAllRubroArticulo();
        setRubrosArticulos(newRubrosArticulos);
    };*/

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
                            rubrosArticulos?.map((item: Rubro) =>
                                <ItemRubro key={item.id} 
                                    id={item.id}
                                    denominacion={item.denominacion}
                                    rubroPadre={item.rubroPadre}
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