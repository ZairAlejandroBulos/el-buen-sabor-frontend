import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Alert, Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

import { Rubro } from "../../types/Rubro";
import { Endpoint } from "../../types/Endpoint";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { ArticuloManufacturadoInsumo } from "../../types/ArticuloManufacturadoInsumo";
import { useModal } from "../../hooks/useModal";
import { useAlert } from "../../hooks/useAlert";
import { useEntities } from "../../hooks/useEntities";
import { useArticuloManufacturado } from "../../hooks/useArticuloManufacturado";
import { useArticulosManufacturadosInsumos } from "../../hooks/useArticulosManufacturadosInsumos";
import { generateImageName, isImagen } from "../../util/ImagenUtil";
import { isArticuloManufacturado } from "../../util/ArticuloManufacturadoUtil";
import { findById } from "../../services/BaseService";
import { saveArticuloManufacturado, updateArticuloManufacturado } from "../../services/ArticuloManufacturadoService";

/**
 * Componente para crear/actualizar un Artículo Manufacturado.
 * @author Bulos 
 */
function AMArticuloManufacturado(): JSX.Element {
    const { id } = useParams();

    const { articuloManufacturado, setArticuloManufacturado } = useArticuloManufacturado(Number(id));
    const { entities: rubros } = useEntities<Rubro>(Endpoint.Rubro);
    const [file, setFile] = useState<File | null>(null);

    const { articulosManufacturadosInsumos, setArticulosManufacturadosInsumos } = useArticulosManufacturadosInsumos(Number(id));

    const { entities: articulosInsumos } = useEntities<ArticuloInsumo>(Endpoint.ArticuloInsumo);
    const [receta, setReceta] = useState<string>('');
    const [cantidad, setCantidad] = useState<number>(0);
    const [unidadMedida, setUnidadMedida] = useState<string>('');
    const [articuloInsumoSelected, setArticuloInsumoSelected] = useState<ArticuloInsumo | undefined>(undefined);

    const { showModal, handleClose } = useModal();
    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();

    const getRubroById = async (id: number) => {
        const token = await getAccessTokenSilently();

        return await findById<Rubro>(Endpoint.Rubro, id, token);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setArticuloManufacturado((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeRubro = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroId = Number(event.currentTarget.value);
        if (rubroId !== -1) {
            const newRubro = await getRubroById(rubroId);
            setArticuloManufacturado((prevState) => ({
                ...prevState,
                rubro: newRubro
            }));
        }
    };

    const handleChangeImagen = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            const imagen = generateImageName(file.name);
            setFile(file);
            setArticuloManufacturado((prevState) => ({
                ...prevState,
                imagen: imagen
            }));
        }
    };

    const handleChangeReceta = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newReceta = event.target.value;
        setReceta(newReceta);
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
                    articuloManufacturado: articuloManufacturado
                };
                setArticulosManufacturadosInsumos((prevState) => [...prevState, newArticuloManufacturadoInsumo]);
            }

            handleResetArticuloManufacturadoInsumo();
        }
    };

    const handleResetArticuloManufacturadoInsumo = () => {
        setArticuloInsumoSelected(undefined);
        setCantidad(0);
        setUnidadMedida('');
    };

    const handleDeleteArticuloManufacturadoInsumo = (item: ArticuloManufacturadoInsumo) => {
        const index = articulosManufacturadosInsumos.indexOf(item, 0);
        articulosManufacturadosInsumos.splice(index, 1);
        setArticulosManufacturadosInsumos([...articulosManufacturadosInsumos]);
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (file !== null && isImagen(file) && isArticuloManufacturado(articuloManufacturado)) {
            const token = await getAccessTokenSilently();

            if (articuloManufacturado.id === 0) {
                await saveArticuloManufacturado(articuloManufacturado, file, articulosManufacturadosInsumos, token);
            } else {
                await updateArticuloManufacturado(articuloManufacturado.id, articuloManufacturado, file, articulosManufacturadosInsumos, token);
            }

            handleNavigate();
        } else {
            handleAlert();
        }
    };

    const handleNavigate = () => {
        window.location.href = "/admin/stock/articulos-manufacturados";
    };

    return (
        <>
            <Container className="mt-3 mb-3">
                <h1>Artículo Manufacturado</h1>
            </Container>

            <Container>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="denominacion"
                                    name="denominacion"
                                    placeholder="Denominación"
                                    defaultValue={articuloManufacturado?.denominacion}
                                    onChange={handleChange}
                                />
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
                                    defaultValue={articuloManufacturado?.descripcion}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="tiempoEstimadoCocina">Tiempo Estimado Cocina</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="tiempoEstimadoCocina"
                                    name="tiempoEstimadoCocina"
                                    placeholder="Tiempo Estimado Cocina (00:35:00)"
                                    defaultValue={articuloManufacturado?.tiempoEstimadoCocina}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="precioVenta">Precio de venta</Form.Label>
                                <Form.Control
                                    type="number"
                                    id="precioVenta"
                                    name="precioVenta"
                                    placeholder="Precio de venta"
                                    value={articuloManufacturado?.precioVenta}
                                    onChange={handleChange}
                                />
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
                                    onChange={handleChangeImagen}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="rubro">Rubro</Form.Label>
                                <Form.Select id="rubro" value={articuloManufacturado?.rubro?.id || -1} onChange={handleChangeRubro}>
                                    <option value="-1">--Seleccione--</option>
                                    {
                                        rubros.map((item: Rubro, index: number) =>
                                            <option key={index} value={item.id}>
                                                {item.denominacion}
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
                                    <Button onClick={handleClose} variant="dark">Añadir Ingredientes</Button>
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
                                    defaultValue={receta}
                                    onChange={handleChangeReceta}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button onClick={handleNavigate} variant="danger">
                                Cancelar
                            </Button>
                            <Button type="submit" variant="success">
                                Guardar
                            </Button>
                        </Col>
                    </Row>
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
                                                        {item.denominacion}
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
                                    <Button onClick={handleAddArticuloManufacturadoInsumo}>
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
                                                    { item.articuloInsumo.denominacion }
                                                </Col>
                                                <Col>
                                                    { item.cantidad }
                                                </Col>
                                                <Col>
                                                    { item.articuloInsumo.unidadMedida?.denominacion }
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
                        <Button onClick={handleClose} variant="dark">
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default AMArticuloManufacturado;