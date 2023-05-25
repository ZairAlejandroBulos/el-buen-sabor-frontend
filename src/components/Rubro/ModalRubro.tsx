import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { Rubro } from "../../types/Rubro";
import { useAlert } from "../../hooks/useAlert";
import { findAllParents, findRubroById, saveRubro, updateRubro } from "../../services/RubroService";

type Props = {
    showModal: boolean,
    handleClose: () => void,
    rubro?: Rubro
}

function ModalRubro({ showModal, handleClose, rubro}: Props): JSX.Element {
    const [values, setValues] = useState<Rubro>(new Rubro());
    const [rubrosPadres, setRubrosPadres] = useState<Rubro[]>([]);
    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (rubro) {
            setValues(rubro);
        }
        getRubrosPadres();
    }, []);

    const getRubrosPadres = async () => {
        const token = await getAccessTokenSilently();
        const newRubrosPadres: Rubro[] = await findAllParents(token);
        setRubrosPadres(newRubrosPadres);
    };

    const handleChangeDenominacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDenominacion = event.target.value;
        setValues((prevState) => ({
            ...prevState,
            denominacion: newDenominacion
        }));
    };

    const handleChangeRubroPadre = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = parseInt(event.currentTarget.value);
        getRubroById(selectedId);
    };

    const getRubroById = async (id: number) => {
        if (id) {
            const token = await getAccessTokenSilently();
            let newRubroPadre: Rubro = await findRubroById(id, token);
            setValues((prevState) => ({
                ...prevState,
                rubroPadre: newRubroPadre
            }));
        }
    }; 

    const handleSubmit = async () => {
        if (!values.denominacion) {
            handleAlert();
        } else {
            const token = await getAccessTokenSilently();
            if (values.id === 0) {
                await saveRubro(values, token);
            } else {
                await updateRubro(values.id, values, token);
            }
            handleClose();
        }
    };

    return(
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                { rubro
                    ? 
                    <Modal.Title className="text-center">Editar Rubro</Modal.Title>
                    :
                    <Modal.Title className="text-center">Nuevo Rubro</Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                        <Form.Control
                            type="text"
                            id="denominacion"
                            name="denominacion"
                            placeholder="Ingrese denominacion"
                            value={values?.denominacion || ""}
                            onChange={handleChangeDenominacion}
                        />
                    </Form.Group>

                    {/*TODO: Si es update, seleccionar automaticamente el rubroPadre */}
                    <Form.Group className="mb-3">
                        <Form.Label>Rubro Artículo Padre</Form.Label>
                        <Form.Select id="rubroPadre" onChange={handleChangeRubroPadre}>
                            <option>--Seleccione--</option>
                            {
                                rubrosPadres.map((item: Rubro, index: number) =>
                                    <option value={item.id} key={index}>
                                        { item.denominacion }
                                    </option>
                                )
                            }
                        </Form.Select>
                    </Form.Group> 
                </Form>
                <Alert show={showAlert} onClick={handleAlert} variant="danger" dismissible>
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>Debe llenar todos los campos</p>
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="danger buttons-modal-form">
                    Cerrar
                </Button>

                <Button onClick={handleSubmit} variant="success">
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalRubro;