import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import { Rubro } from "../../types/Rubro";
import { useAlert } from "../../hooks/useAlert";
import { existsByDenominacion, findAllRubro, saveRubro, updateRubro } from "../../services/RubroService";

type Props = {
    showModal: boolean,
    handleClose: () => void,
    rubro?: Rubro
}

/**
 * Componente para crear/actualizar un Rubro.
 * @author Bulos
 */
function ModalRubro({ showModal, handleClose, rubro }: Props): JSX.Element {
    const [values, setValues] = useState<Rubro>({
        id: 0,
        denominacion: ""
    });
    const [selectedRubroPadreId, setSelectedRubroPadreId] = useState<number | null>(null);
    const [rubrosPadres, setRubrosPadres] = useState<Rubro[]>([]);
    const [messageError, setMessageError] = useState<string>("");
    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (rubro) {
            if (rubro.rubroPadreId === null) {
                setValues({
                    id: rubro.id,
                    denominacion: rubro.denominacion
                });
            } else {
                setValues({
                    id: rubro.id,
                    denominacion: rubro.denominacion,
                    rubroPadreId: rubro.rubroPadreId
                });
            }
        }
        getRubrosPadres();
    }, [rubro]);

    const getRubrosPadres = async () => {
        const token = await getAccessTokenSilently();
        
        const newRubrosPadres: Rubro[] = await findAllRubro(token);
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
        const rubroPadreId = Number(event.currentTarget.value);

        if (rubroPadreId === -1) {
            setSelectedRubroPadreId(null);
            setValues((prevState) => ({
                ...prevState,
                rubroPadreId: NaN
            }));
        } else {
            setSelectedRubroPadreId(rubroPadreId);
            setValues((prevState) => ({
                ...prevState,
                rubroPadreId: rubroPadreId
            }));
        }
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = await getAccessTokenSilently();

        if (!values.denominacion || values.denominacion.trim() === "") {
            setMessageError("El Rubro debe tener una denominación");
            handleAlert();
        } else if (values.id === 0 && await existsByDenominacion(values.denominacion, token)) {
            setMessageError(`Ya existe un Rubro denominado ${values.denominacion}`);
            handleAlert();
        } else if (values.id === selectedRubroPadreId) {
            setMessageError("No se puede seleccionar como rubro padre al mismo Rubro.");
            handleAlert();
        } else {
            if (values.id === 0) {
                await saveRubro(values, token);
            } else {
                await updateRubro(values.id, values, token);
            }

            handleClose();
            setMessageError("");
            window.location.reload();
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                {
                    <Modal.Title className="text-center">
                        { rubro ? "Editar" : "Nuevo" } Rubro
                    </Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={handleSubmit}>
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

                    <Form.Group className="mb-3">
                        <Form.Label>Rubro Artículo Padre</Form.Label>
                        <Form.Select id="rubroPadreId" value={values?.rubroPadreId || -1} onChange={handleChangeRubroPadre}>
                            <option value="-1">--Seleccione--</option>
                            {
                                rubrosPadres.map((item: Rubro, index: number) =>
                                    <option key={index} value={item.id}>
                                        { item.denominacion }
                                    </option>
                                )
                            }
                        </Form.Select>
                    </Form.Group>

                    <Button onClick={handleClose} variant="danger buttons-modal-form">
                        Cerrar
                    </Button>

                    <Button type="submit" variant="success">
                        Guardar
                    </Button>
                </Form>
                <Alert show={showAlert} onClick={handleAlert} dismissible variant="danger" className="mt-3">
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{ messageError }</p>
                </Alert>
            </Modal.Body>
        </Modal>
    );
}

export default ModalRubro;