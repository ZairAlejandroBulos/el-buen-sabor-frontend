import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

import { Rubro } from "../../types/Rubro";
import { Endpoint } from "../../types/Endpoint";
import { UnidadMedida } from "../../types/UnidadMedida";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { useAlert } from "../../hooks/useAlert";
import { useRubros } from "../../hooks/useRubros";
import { useUnidadesMedidas } from "../../hooks/useUnidadesMedidas";
import { useArticuloInsumo } from "../../hooks/useArticuloInsumo";
import { findById, save, update } from "../../services/BaseService";
import { isArticuloInsumo } from "../../util/ArticuloInsumoUtil";

/**
 * 
 */
function AMArticuloInsumo(): JSX.Element {
    const { id } = useParams();
    const { articuloInsumo, setArticuloInsumo } = useArticuloInsumo(Number(id));
    const { rubros } = useRubros();
    const { unidadesMedidas } = useUnidadesMedidas();

    const { showAlert, handleAlert } = useAlert();
    const { getAccessTokenSilently } = useAuth0();

    const getRubroById = async (id: number) => {
        const token = await getAccessTokenSilently();

        return await findById<Rubro>(Endpoint.Rubro, id, token);
    };

    const getUnidadMedidaById = async (id: number) => {
        const token = await getAccessTokenSilently();

        return await findById<UnidadMedida>(Endpoint.UnidadMedida, id, token);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setArticuloInsumo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeInsumo = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const insumoSelected = Number(event.currentTarget.value);
        setArticuloInsumo((prevState) => ({
            ...prevState,
            esInsumo: insumoSelected === 0 ? false : true
        }));
    };

    const handleChangeRubro = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroSelected = Number(event.currentTarget.value);
        if (rubroSelected !== -1) {
            const newRubro = await getRubroById(rubroSelected);
            setArticuloInsumo((prevState) => ({
                ...prevState,
                rubro: newRubro
            }));
        }
    };

    const handleChangeUnidadMedida = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const unidadMedidaSelected = Number(event.currentTarget.value);
        if (unidadMedidaSelected !== -1) {
            const newUnidadMedida = await getUnidadMedidaById(unidadMedidaSelected);
            setArticuloInsumo((prevState) => ({
                ...prevState,
                unidadMedida: newUnidadMedida
            }));
        }
    };

    const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isArticuloInsumo(articuloInsumo)) {
            const token = await getAccessTokenSilently();

            if (articuloInsumo.id === 0) {
                await save<ArticuloInsumo>(Endpoint.ArticuloInsumo, articuloInsumo, token);
            } else {
                await update<ArticuloInsumo>(Endpoint.ArticuloInsumo, articuloInsumo.id, articuloInsumo, token);
            }

            handleNavigate();
        } else {
            handleAlert();
        }
    };

    const handleNavigate = () => {
        window.location.href = "/admin/stock/articulos-insumos";
    };

    return (
        <Container className="mt-3 mb-3">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="denominacion">Denominación</Form.Label>
                            <Form.Control
                                type="text"
                                id="denominacion"
                                name="denominacion"
                                placeholder="Ingrese denominacion"
                                value={articuloInsumo?.denominacion}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="precioCompra">Precio de Costo</Form.Label>
                            <Form.Control
                                type="number"
                                id="precioCompra"
                                name="precioCompra"
                                placeholder="Ingrese Precio Costo"
                                value={articuloInsumo?.precioCompra}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="stockMinimo">Stock Mínimo</Form.Label>
                            <Form.Control
                                type="number"
                                id="stockMinimo"
                                name="stockMinimo"
                                placeholder="Ingrese Stock Minimo"
                                value={articuloInsumo?.stockMinimo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="stockActual">Stock Actual</Form.Label>
                            <Form.Control
                                type="number"
                                id="stockActual"
                                name="stockActual"
                                placeholder="Ingrese Stock Actual"
                                value={articuloInsumo?.stockActual}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Rubro</Form.Label>
                            <Form.Select id="rubro" name="rubro" value={articuloInsumo.rubro?.id || -1} onChange={handleChangeRubro}>
                                <option value="-1">--Seleccione--</option>
                                {
                                    rubros.map((item: Rubro, index: number) =>
                                        <option value={item.id} key={index}>
                                            {item.denominacion}
                                        </option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Unidad Medida</Form.Label>
                            <Form.Select id="unidadMedida" name="unidadMedida" value={articuloInsumo.unidadMedida?.id || -1} onChange={handleChangeUnidadMedida}>
                                <option value="-1">--Seleccione--</option>
                                {
                                    unidadesMedidas.map((item: UnidadMedida, index: number) =>
                                        <option value={item.id} key={index}>
                                            {item.denominacion}
                                        </option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="esInsumo">Es Insumo</Form.Label>
                    <Form.Select name="esInsumo" value={articuloInsumo.esInsumo ? 1 : 0} onChange={handleChangeInsumo}>
                        <option value="0">No</option>
                        <option value="1">Si</option>
                    </Form.Select>
                </Form.Group>

                <Button onClick={handleNavigate} variant="danger">
                    Cancelar
                </Button>

                <Button type="submit" variant="success">
                    Guardar
                </Button>
            </Form>

            <Alert show={showAlert} onClick={handleAlert} variant="danger" dismissible>
                <Alert.Heading>Error!</Alert.Heading>
                <p>Campos vacios y/o incorrectos.</p>
            </Alert>
        </Container>
    );
}
export default AMArticuloInsumo;