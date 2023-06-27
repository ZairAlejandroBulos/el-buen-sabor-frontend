import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

import { Endpoint } from "../../types/Endpoint";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { FiltroRubro, Rubro, TipoRubro } from "../../types/Rubro";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ArticuloManufacturadoInsumo } from "../../types/ArticuloManufacturadoInsumo";
import { validationSchemaArticuloManufacturado } from "./SchemaArticuloManufacturado";
import { useModal } from "../../hooks/useModal";
import { useRubros } from "../../hooks/useRubros";
import { useEntities } from "../../hooks/useEntities";
import { useArticuloManufacturado } from "../../hooks/useArticuloManufacturado";
import { useArticulosManufacturadosInsumos } from "../../hooks/useArticulosManufacturadosInsumos";
import { generateImageName, isImagen } from "../../util/ImagenUtil";
import { findById, remove } from "../../services/BaseService";
import { saveArticuloManufacturado, updateArticuloManufacturado } from "../../services/ArticuloManufacturadoService";
import { toastAdvertencia, toastExito } from "../../util/ToastUtil";

/**
 * Componente para crear/actualizar un Artículo Manufacturado.
 * @author Bulos 
 */
function AMArticuloManufacturado(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();

    const { articuloManufacturado } = useArticuloManufacturado(Number(id));
    const { rubros } = useRubros(FiltroRubro.TIPO, TipoRubro.PRODUCTO);
    const [file, setFile] = useState<File | null>(null);

    const { articulosManufacturadosInsumos, setArticulosManufacturadosInsumos } = useArticulosManufacturadosInsumos(Number(id));

    const [cantidad, setCantidad] = useState<number>(0);
    const [unidadMedida, setUnidadMedida] = useState<string>('');
    const { entities: articulosInsumos } = useEntities<ArticuloInsumo>(Endpoint.ArticuloInsumo);
    const [articuloInsumoSelected, setArticuloInsumoSelected] = useState<ArticuloInsumo | undefined>(undefined);

    const { showModal, handleClose } = useModal();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        formik.setValues(articuloManufacturado);
    }, [articuloManufacturado]);

    const formik = useFormik({
        initialValues: {
            ...articuloManufacturado
        },
        validationSchema: validationSchemaArticuloManufacturado(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: ArticuloManufacturado) => handleSubmit(entity)
    });

    // TODO: Validación de Rubro con Yup
    const handleChangeRubro = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroId = Number(event.currentTarget.value);
        if (rubroId !== -1) {
            const newRubro = await getRubroById(rubroId);
            formik.setFieldValue('rubro', newRubro);
        }
    };

    const getRubroById = async (id: number) => {
        const token = await getAccessTokenSilently();

        return await findById<Rubro>(Endpoint.Rubro, id, token);
    };

    const handleChangeImagen = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            const imagen = generateImageName(file.name);

            setFile(file);
            formik.setFieldValue('imagen',imagen);
        }
    };

    const handleChangeArticuloInsumo = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const articuloInsumoId = Number(event.currentTarget.value);

        if (articuloInsumoId !== -1) {
            const token = await getAccessTokenSilently();

            const newArticuloInsumo = await findById<ArticuloInsumo>(Endpoint.ArticuloInsumo, articuloInsumoId, token);
            setArticuloInsumoSelected(newArticuloInsumo);
            setUnidadMedida(newArticuloInsumo.unidadMedida?.denominacion ?? '');
        }
    };

    const handleChangeCantidad = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCantidad = Number(event.target.value);
        setCantidad(newCantidad);
    };

    const articuloManufacturadoInsumoExists = (articuloInsumo: ArticuloInsumo): boolean => {
        return articulosManufacturadosInsumos.some((item) => item.articuloInsumo.id === articuloInsumo.id);
    };

    const handleAddArticuloManufacturadoInsumo = () => {
        if (articuloInsumoSelected && cantidad !== 0) {
            if (articuloManufacturadoInsumoExists(articuloInsumoSelected)) {
                const updatedArticulosManufacturadosInsumos = articulosManufacturadosInsumos.map((item) => {
                    if (item.articuloInsumo.id === articuloInsumoSelected.id) {
                        return {
                            ...item,
                            cantidad: cantidad
                        };
                    }
                    return item;
                });
                setArticulosManufacturadosInsumos(updatedArticulosManufacturadosInsumos);
            } else {
                const newArticuloManufacturadoInsumo = {
                    id: 0,
                    cantidad: cantidad,
                    articuloInsumo: articuloInsumoSelected,
                    articuloManufacturado: formik.values
                };
                setArticulosManufacturadosInsumos((prevState) => [...prevState, newArticuloManufacturadoInsumo]);
            }

            handleResetArticuloManufacturadoInsumo();
        }
    };

    const handleDeleteArticuloManufacturadoInsumo = async (item: ArticuloManufacturadoInsumo) => {
        const index = articulosManufacturadosInsumos.indexOf(item, 0);
        articulosManufacturadosInsumos.splice(index, 1);
        setArticulosManufacturadosInsumos([...articulosManufacturadosInsumos]);

        const token = await getAccessTokenSilently();
        await remove(Endpoint.ArticuloManufacturadoInsumo, item.id, token);
    };

    const handleResetArticuloManufacturadoInsumo = () => {
        setCantidad(0);
        setUnidadMedida('');
        setArticuloInsumoSelected(undefined);
    };

    const handleSubmit = async (entity: ArticuloManufacturado) => {
        const token = await getAccessTokenSilently();

        if (file && isImagen(file)) {
            if (entity.id === 0) {
                await saveArticuloManufacturado(entity, file, articulosManufacturadosInsumos, token);
                toastExito(`El Artículo Manufacturado "${entity.denominacion}" se guardó exitosamente.`);
            } else {
                await updateArticuloManufacturado(entity.id, entity, file, articulosManufacturadosInsumos, token);
                toastExito(`El Artículo Manufacturado "${entity.denominacion}" se actualizó exitosamente.`);
            }

            handleNavigate();
        } else {
            toastAdvertencia('Debe seleccionar una Imagen');
        }
    };

    const handleNavigate = () => {
        navigate("/admin/stock/articulos-manufacturados");
    };

    return (
        <>
            <Container className="container-amb mt-4 mb-4">
                <Container className="text-center">
                    <h1>Artículo Manufacturado</h1>
                </Container>

                <Container className="mt-3 mb-3">
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="denominacion"
                                        name="denominacion"
                                        placeholder="Denominación"
                                        defaultValue={formik.values.denominacion}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.denominacion && formik.touched.denominacion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.denominacion }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="descripcion">Descripción</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="descripcion"
                                        name="descripcion"
                                        placeholder="Descripción"
                                        defaultValue={formik.values.descripcion}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.descripcion && formik.touched.descripcion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.descripcion }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="tiempoEstimadoCocina">Tiempo Estimado en Cocina</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="tiempoEstimadoCocina"
                                        name="tiempoEstimadoCocina"
                                        placeholder="Tiempo Estimado Cocina (00:35:00)"
                                        defaultValue={formik.values.tiempoEstimadoCocina}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.tiempoEstimadoCocina && formik.touched.tiempoEstimadoCocina)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.tiempoEstimadoCocina }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="precioVenta">Precio de Venta</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="precioVenta"
                                        name="precioVenta"
                                        placeholder="Precio de venta"
                                        value={formik.values.precioVenta}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioVenta && formik.touched.precioVenta)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.precioVenta }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="imagen">Imagen</Form.Label>
                                    <Form.Control
                                        type="file"
                                        id="imagen"
                                        name="imagen"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleChangeImagen}
                                        isInvalid={Boolean(formik.errors.imagen && formik.touched.imagen)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.imagen }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="rubro">Rubro</Form.Label>
                                    <Form.Select
                                        id="rubro"
                                        name="rubro"
                                        value={formik.values.rubro?.id || -1}
                                        onChange={handleChangeRubro}
                                    >
                                        <option value="-1">--Seleccione--</option>
                                        {
                                            rubros.map((item: Rubro, index: number) =>
                                                <option key={index} value={item.id}>
                                                    { item.denominacion }
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ingredientes</Form.Label>
                                    <Row>
                                        <Button onClick={handleClose} variant="dark" className="btn-add">
                                            Añadir Ingredientes
                                        </Button>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="receta">Receta</Form.Label>
                                    <Form.Control
                                        id="receta"
                                        as="textarea"
                                        rows={3}
                                        placeholder="Procedimiento..."
                                        value={formik.values.receta}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.receta && formik.touched.receta)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        { formik.errors.receta }
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end mt-4">
                            <Button onClick={handleNavigate} variant="dark" className="me-2 btn-cancel">
                                Cancelar
                            </Button>

                            <Button type="submit" variant="dark" className="btn-ok">
                                Guardar
                            </Button>
                        </div>
                    </Form>

                    { /* Modal Articulos Insumos */}
                    <Modal show={showModal} onHide={handleClose} centered backdrop="static" size="xl">
                        <Modal.Header closeButton>
                            <Modal.Title>Artículos Insumos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="articuloInsumo">Artículo Insumo</Form.Label>
                                            <Form.Select id="articuloInsumo" onChange={handleChangeArticuloInsumo}>
                                                <option value="-1">--Seleccione--</option>
                                                {
                                                    articulosInsumos.map((item: ArticuloInsumo, index: number) =>
                                                        <option key={index} value={item.id}>
                                                            { item.denominacion }
                                                        </option>
                                                    )
                                                }
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="cantidad">Cantidad</Form.Label>
                                            <Form.Control
                                                type="number"
                                                id="cantidad"
                                                name="cantidad"
                                                placeholder="Cantidad"
                                                value={cantidad}
                                                required
                                                onChange={handleChangeCantidad}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="unidadMedida">Unidad de Medida</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="unidadMedida"
                                                name="unidadMedida"
                                                placeholder="Unidad de Medida"
                                                value={unidadMedida}
                                                readOnly
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Form.Label htmlFor="unidadMedida">Acciones</Form.Label>
                                        </Row>
                                        <Button onClick={handleAddArticuloManufacturadoInsumo} variant="dark" className="btn-add">
                                            <i className="bi bi-plus-square"></i>
                                        </Button>
                                    </Col>
                                </Row>
                                <hr />
                                <Container className="text-center">
                                    <Row>
                                        <Row>
                                            <Col>Artículo Insumo</Col>
                                            <Col>Cantidad</Col>
                                            <Col>Unidad de Medida</Col>
                                            <Col>Eliminar</Col>
                                        </Row>
                                        {
                                            articulosManufacturadosInsumos.map((item: ArticuloManufacturadoInsumo, index: number) =>

                                                <Row key={index} className="mb-1">
                                                    <Col>
                                                        {item.articuloInsumo.denominacion}
                                                    </Col>
                                                    <Col>
                                                        {item.cantidad}
                                                    </Col>
                                                    <Col>
                                                        {item.articuloInsumo.unidadMedida?.denominacion}
                                                    </Col>
                                                    <Col>
                                                        <Button onClick={() => handleDeleteArticuloManufacturadoInsumo(item)} variant="danger">
                                                            <i className="bi bi-trash3"></i>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    </Row>
                                </Container>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClose} variant="dark" className="btn-ok">
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </Container>
        </>
    );
}

export default AMArticuloManufacturado;