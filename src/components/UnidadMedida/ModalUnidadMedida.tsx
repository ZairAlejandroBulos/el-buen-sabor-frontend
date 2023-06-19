import { useEffect, useState } from "react";
import { UnidadMedida } from "../../types/UnidadMedida";
import { useAlert } from "../../hooks/useAlert";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { existsByDenominacion } from "../../services/UnidadMedidaService";
import { save, update } from "../../services/BaseService";

type Props = {
    showModal: boolean,
    handleClose: () => void,
    unidadMedida?: UnidadMedida
}

/**
 * Componente para crear/actualizar una UnidadMedida.
 * @author Castillo
 */
function ModalUnidadMedida({ showModal, handleClose, unidadMedida }: Props): JSX.Element {
    const [values, setValues] = useState<UnidadMedida>({
        id: 0,
        denominacion: ""
    });
    const [messageError, setMessageError] = useState<string>("");
    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        if (unidadMedida) {
            if (unidadMedida.id === 0) {
                setValues({
                    id: unidadMedida.id,
                    denominacion: unidadMedida.denominacion
                });
            } else {
                setValues({
                    id: unidadMedida.id,
                    denominacion: unidadMedida.denominacion,
                });
            }
        }
    }, [unidadMedida]);


    const handleChangeDenominacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newDenominacion = event.target.value;
        setValues((prevState) => ({
            ...prevState,
            denominacion: newDenominacion
        }));
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const token = await getAccessTokenSilently();

        if (!values.denominacion || values.denominacion.trim() === "") {
            setMessageError("La Unidad de Medida debe tener una denominación");
            handleAlert();
        } else if (values.id === 0 && await existsByDenominacion(values.denominacion, token)) {
            setMessageError(`Ya existe una Unidad de Medida denominado ${values.denominacion}`);
            handleAlert();
        } else {
            if (values.id === 0) {
                await save('unidad-medida', values, token);
            } else {
                await update('unidad-medida', values.id, values, token);
            }
            handleReset();
        }
    };

    const handleReset = () => {
        handleClose();
        setMessageError("");
        window.location.reload();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                {
                    <Modal.Title className="text-center">
                        {unidadMedida ? "Editar" : "Nuevo"} UnidadMedida
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

                    <Button onClick={handleClose} variant="danger buttons-modal-form">
                        Cerrar
                    </Button>

                    <Button type="submit" variant="success">
                        Guardar
                    </Button>
                </Form>
                <Alert show={showAlert} onClick={handleAlert} dismissible variant="danger" className="mt-3">
                    <Alert.Heading>Error!</Alert.Heading>
                    <p>{messageError}</p>
                </Alert>
            </Modal.Body>
        </Modal>
    );
}

export default ModalUnidadMedida;