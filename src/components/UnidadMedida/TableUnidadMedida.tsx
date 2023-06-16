import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { UnidadMedida } from "../../types/UnidadMedida";
import { useModal } from "../../hooks/useModal";
import { Button, Container, Table } from "react-bootstrap";
import ItemUnidadMedida from "./ItemUnidadMedida";
import ModalUnidadMedida from "./ModalUnidadMedida";
import { findAllUnidadMedida } from "../../services/UnidadMedidaService";

function TableUnidadMedida(): JSX.Element {
    const [unidadMedida, setUnidadMedida] = useState<UnidadMedida[]>([]);
    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllUnidadMedida();
    }, []);

    const getAllUnidadMedida = async () => {
        const token = await getAccessTokenSilently();
        
        const newUnidadMedida = await findAllUnidadMedida(token);
        setUnidadMedida(newUnidadMedida);
    };

    return (
        <>
            <Container className="d-flex mt-3">
                <h1>Unidad Medida</h1>
                <Button onClick={handleClose} variant="success">Nuevo</Button>
            </Container>

            <Container className="table-scrollable">
                <Table responsive bordered hover>
                    <thead className="table-thead">
                        <tr>
                            <th>Denominación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            unidadMedida?.map((item: UnidadMedida, index: number) =>
                                <ItemUnidadMedida key={index}
                                    {...item}
                                />
                            )
                        }
                    </tbody>
                </Table>
            </Container>

            <ModalUnidadMedida
                showModal={showModal}
                handleClose={handleClose}
            />
        </>
    );
}

export default TableUnidadMedida;