import { useEffect } from "react";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Form, Modal } from "react-bootstrap";

import { Endpoint } from "../../types/Endpoint";
import { UnidadMedida } from "../../types/UnidadMedida";
import { validationSchemaUnidadMedida } from "./SchemaUnidadMedida";
import { useUnidadMedida } from "../../hooks/useUnidadMedida";
import { save, update } from "../../services/BaseService";
import { existsByDenominacion } from "../../services/UnidadMedidaService";
import { toastError, toastExito } from "../../util/ToastUtil";

interface Props {
    showModal: boolean;
    handleClose: () => void;
    handleReload : () => void;
    unidadMedida?: UnidadMedida;
}

/**
 * Componente para crear/actualizar una UnidadMedida.
 * @author Castillo
 */
function ModalUnidadMedida({ showModal, handleClose, handleReload, unidadMedida }: Props): JSX.Element {
    const { unidadMedida: values } = useUnidadMedida(unidadMedida ? unidadMedida.id : -1);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        formik.setValues(values);
    }, [values]);

    const formik = useFormik({
        initialValues: values,
        validationSchema: validationSchemaUnidadMedida(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: UnidadMedida) => handleSubmit(entity)
    });

    const handleSubmit = async (entity: UnidadMedida) => {
        const token = await getAccessTokenSilently();

        if (entity.id === 0) {
            if (!(await existsByDenominacion(entity.denominacion, token))) {
                await save<UnidadMedida>(Endpoint.UnidadMedida, entity, token);
                toastExito(`La Unidad de Medida "${entity.denominacion}" se guardó exitosamente.`)
            } else {
                toastError(`No se pudo guardar la Unidad de Medida. Ya existe una Unidad de Medida denominada "${entity.denominacion}".`);
            }
        } else {
            await update<UnidadMedida>(Endpoint.UnidadMedida, entity.id, entity, token);
            toastExito(`La Unidad de Medida "${entity.denominacion}" se actualizó exitosamente.`);
        }

        handleResetModal();
    };

    const handleResetModal = () => {
        handleReload();
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                {
                    <Modal.Title className="text-center">
                        { unidadMedida ? 'Editar' : 'Nueva' } Unidad de Medida
                    </Modal.Title>
                }
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                        <Form.Control
                            type="text"
                            id="denominacion"
                            name="denominacion"
                            placeholder="Denominación"
                            value={formik.values.denominacion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                        />
                        <Form.Control.Feedback type="invalid">
                            { formik.errors.denominacion }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Modal.Footer>
                        <Button onClick={handleClose} variant="dark" className="btn-cancel">
                            Cerrar
                        </Button>

                        <Button type="submit" disabled={!formik.isValid} variant="dark" className="btn-ok">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalUnidadMedida;