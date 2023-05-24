import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

import Rubro from "../../types/Rubro";
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

    useEffect(() => {
        if (rubro) {
            setValues(rubro);
        }
        getRubrosPadres();
    }, []);

    const getRubrosPadres = async () => {
        const newRubrosPadres: Rubro[] = await findAllParents();
        setRubrosPadres(newRubrosPadres);
    };

    const handleChangeDenominacion = (event: ChangeEvent<HTMLInputElement>) => {
        const newDenominacion = event.target.value;
        setValues((prevState) => ({
            ...prevState,
            denominacion: newDenominacion
        }));
    };

    const handleChangeRubroPadre = (event: ChangeEvent<HTMLSelectElement>) => {
        getRubroArticuloById(parseInt(event.currentTarget.value));
    };

    const getRubroArticuloById = async (id: number) => {
        if (id) {
            let newRubroPadre: Rubro = await findRubroById(id);
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
            if (values.id === 0) {
                await saveRubro(values);
            } else {
                await updateRubro(values.id, values);
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

                    {/*TODO: Select Rubro Articulo Padre */}
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