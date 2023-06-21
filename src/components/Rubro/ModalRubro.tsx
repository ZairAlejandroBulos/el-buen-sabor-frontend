import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Form, Modal } from "react-bootstrap";

import { Rubro } from "../../types/Rubro";
import { useAlert } from "../../hooks/useAlert";
import { save, update } from "../../services/BaseService";
import { existsByDenominacion, findRubrosDesbloqueados } from "../../services/RubroService";
import { useRubro } from "../../hooks/useRubro";

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
    const { rubro: values, setRubro: setValues } = useRubro(rubro ? rubro.id : -1);
    const [rubrosPadres, setRubrosPadres] = useState<Rubro[]>([]);
    const [selectedRubroPadreId, setSelectedRubroPadreId] = useState<number | null>(null);
    
    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();
    const [messageError, setMessageError] = useState<string>("");

    useEffect(() => {
        getRubrosDesbloqueados();
    }, []);

    const getRubrosDesbloqueados = async () => {
        const token = await getAccessTokenSilently();

        const newRubrosPadres = await findRubrosDesbloqueados(token);
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
        if (rubroPadreId !== -1) {
            setSelectedRubroPadreId(rubroPadreId);
            setValues((prevState) => ({
                ...prevState,
                rubroPadreId: rubroPadreId
            }));
        } else {
            setValues((prevState) => ({
                ...prevState,
                rubroPadreId: NaN
            }));
        }
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = await getAccessTokenSilently();

        if (!values.denominacion || values.denominacion.trim() === "") {
            setMessageError("El Rubro debe tener una denominación");
            handleAlert();
        } else if (values.id === 0 && (await existsByDenominacion(values.denominacion, token))) {
            setMessageError(`Ya existe un Rubro denominado ${values.denominacion}`);
            handleAlert();
        } else if (values.id === selectedRubroPadreId) {
            setMessageError("No se puede seleccionar como rubro principal al mismo Rubro.");
            handleAlert();
        } else {
            if (values.id === 0) {
                await save<Rubro>('rubros', values, token);
            } else {
                await update<Rubro>('rubros', values.id, values, token);
            }

            handleReset();
        }
    };

    const handleReset = () => {
        handleClose();
        setMessageError('');
        window.location.reload();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered backdrop="static">
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
                        <Form.Label>Rubro Principal</Form.Label>
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

                    <Button onClick={handleClose} variant="danger">
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