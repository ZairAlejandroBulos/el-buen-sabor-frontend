import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

import { Rol } from "../../../types/Rol";
import { Cliente } from "../../../types/Cliente";
import { Endpoint } from "../../../types/Endpoint";
import { Localidad } from "../../../types/Localidad";
import { Auth0Usuario } from "../../../types/Usuario";
import { useCliente } from "../../../hooks/useCliente";
import { useEntities } from "../../../hooks/useEntities";
import { validationSchemaCliente } from "./SchemaCliente";
import { save, update } from "../../../services/BaseService";
import { asignarAuth0UsuarioARol, saveAuth0Usuario } from "../../../services/Auth0Service";

interface Props {
    showModal: boolean;
    handleClose: () => void;
    handleReload: () => void;
    cliente?: Cliente;
}

/**
 * Componente para crear/actualizar un Cliente.
 * @author Bulos 
 */
function ModalCliente({ showModal, handleClose, handleReload, cliente }: Props): JSX.Element {
    const { cliente: values } = useCliente(cliente ? cliente.id : -1);
    
    let [newAuth0Id] = useState<string>('');
    const { entities: roles } = useEntities<Rol>(Endpoint.Rol);
    const { entities: localidades } = useEntities<Localidad>(Endpoint.Localidad);
    const defaultRol = roles.find(rol => rol.id === 5);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        formik.setValues(values);
    }, [values]);

    const formik = useFormik({
        initialValues: { ...values },
        validationSchema: validationSchemaCliente(values.id),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: Cliente) => handleSubmit(entity)
    });

    const handleSubmit = async (entity: Cliente) => {
        const token = await getAccessTokenSilently();

        if (entity.id === 0) {
            newAuth0Id = await handleAuht0(entity);

            const newEntity = await handleAuth0Id(entity);
            await save<Cliente>(Endpoint.Cliente, newEntity, token);
        } else {
            await update<Cliente>(Endpoint.Cliente, entity.id, entity, token);
        }

        handleReset();
    };

    const handleAuht0 = async (cliente: Cliente) => {
        const token = await getAccessTokenSilently();

        const auth0Usuario: Auth0Usuario = {
            email: cliente.usuario.email,
            clave: cliente.usuario.clave,
            bloqueado: cliente.usuario.bloqueado
        };

        const auth0Id = await saveAuth0Usuario(auth0Usuario, token);
        if (defaultRol) await asignarAuth0UsuarioARol(auth0Id, defaultRol.auth0RolId, token);

        return auth0Id;
    };

    const handleAuth0Id = async (cliente: Cliente): Promise<Cliente> => {
        return {
            ...cliente,
            usuario: {
                ...cliente.usuario,
                auth0Id: newAuth0Id,
                rol: defaultRol || { id: 0, denominacion: '', auth0RolId: '' }
            }
        }
    };

    const handleReset = () => {
        handleReload();
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} centered backdrop="static" className="modal-xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    { cliente ? 'Editar' : 'Nuevo' } Cliente
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="nombre">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Nombre"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.nombre }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="apellido">Apellido</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    placeholder="Apellido"
                                    value={formik.values.apellido}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.apellido }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="telefono">Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={formik.values.telefono}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.telefono }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    id="email"
                                    name="usuario.email"
                                    placeholder="Email"
                                    value={formik.values.usuario.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.usuario?.email && formik.touched.usuario?.email)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.usuario?.email }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="calle">Calle</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="calle"
                                    name="domicilio.calle"
                                    placeholder="Calle"
                                    value={formik.values.domicilio.calle}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.domicilio?.calle && formik.touched.domicilio?.calle)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.domicilio?.calle }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="numero">Número</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="numero"
                                    name="domicilio.numero"
                                    placeholder="Número"
                                    value={formik.values.domicilio.numero}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.errors.domicilio?.numero && formik.touched.domicilio?.numero)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    { formik.errors.domicilio?.numero }
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="localidad">Localidad</Form.Label>
                            <Form.Select
                                id="localidad"
                                name="domicilio.localidad"
                                value={JSON.stringify(formik.values.domicilio.localidad)}
                                onChange={e => formik.setFieldValue('domicilio.localidad', JSON.parse(e.target.value))}
                            >
                                {
                                    localidades.map((item: Localidad) =>
                                        <option value={JSON.stringify(item)} key={item.id}>
                                            { item.nombre }
                                        </option>
                                    )
                                }
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                { formik.errors.domicilio?.localidad?.nombre }
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    { values.id === 0 &&
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="clave">Contraseña Provisoria</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="clave"
                                        name="usuario.clave"
                                        placeholder="Contraseña Provisoria"
                                        value={formik.values.usuario.clave}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.usuario?.clave && formik.touched.usuario?.clave)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.usuario?.clave }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="confirmarClave">Confirmar Contraseña Provisoria</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="confirmarClave"
                                        name="usuario.confirmarClave"
                                        placeholder="Confirmar Contraseña Provisoria"
                                        value={formik.values.usuario.confirmarClave}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.usuario?.confirmarClave && formik.touched.usuario?.confirmarClave)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.usuario?.confirmarClave }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                    }

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

export default ModalCliente;