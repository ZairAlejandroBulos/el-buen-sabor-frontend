import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { FiltroRubro, Rubro, TipoRubro } from "../../types/Rubro";
import { Endpoint } from "../../types/Endpoint";
import { UnidadMedida } from "../../types/UnidadMedida";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { useEntities } from "../../hooks/useEntities";
import { useArticuloInsumo } from "../../hooks/useArticuloInsumo";
import { findById, save, update } from "../../services/BaseService";
import { validationSchemaArticuloInsumo } from "./SchemaArticuloInsumo";
import { useRubros } from "../../hooks/useRubros";

/**
 * Componente para crear/actualizar un Artículo Insumo.
 * @author Castillo 
 */
function AMArticuloInsumo(): JSX.Element {
    const { id } = useParams();
    const navigate = useNavigate();

    const { articuloInsumo: values } = useArticuloInsumo(Number(id));
    const { rubros } = useRubros(FiltroRubro.TIPO, TipoRubro.INSUMO);
    const { entities: unidadesMedidas } = useEntities<UnidadMedida>(Endpoint.UnidadMedida);
    
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        formik.setValues(values);
    }, [values]);

    const formik = useFormik({
        initialValues: {
            ...values
        },
        validationSchema: validationSchemaArticuloInsumo(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (entity: ArticuloInsumo) => handleSubmit(entity)
    });

    const handleChangeUnidadMedida = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const unidadMedidaId = Number(event.currentTarget.value);
        
        if (unidadMedidaId !== -1) {
            const newUnidadMedida = await getUnidadMedidaById(unidadMedidaId);
            formik.setFieldValue("unidadMedida", newUnidadMedida);
        } else {
            formik.setFieldTouched("unidadMedida", true);
        }
    };

    const getUnidadMedidaById = async (unidadMedidaId: number) => {
        const token = await getAccessTokenSilently();

        return await findById<UnidadMedida>(Endpoint.UnidadMedida, unidadMedidaId, token);
    }

    const handleChangeRubro = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const rubroId = Number(event.currentTarget.value);
        
        if (rubroId !== -1) {
            const newRubro = await getRubroById(rubroId);
            formik.setFieldValue("rubro", newRubro);
        } else {
            formik.setFieldTouched("rubro", true);
        }
    };

    const getRubroById = async (rubroId: number) => {
        const token = await getAccessTokenSilently();

        return await findById<Rubro>(Endpoint.Rubro, rubroId, token);
    }

    const handleSubmit = async (entity: ArticuloInsumo) => {
        const token = await getAccessTokenSilently();

        if (entity.id === 0) {
            await save<ArticuloInsumo>(Endpoint.ArticuloInsumo, entity, token);
        } else {
            await update<ArticuloInsumo>(Endpoint.ArticuloInsumo, entity.id, entity, token);
        }
        handleNavigate();
    };

    const handleNavigate = () => {
        navigate("/admin/stock/articulos-insumos");
    };

    return (
        <>
            <Container className="container-amb mt-4 mb-4">
                <Container className="text-center">
                    <h1>Artículo Insumo</h1>
                </Container>

                <Container className="mt-3 mb-3">
                    <Form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="denominación">Denominación</Form.Label>
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
                                        {formik.errors.denominacion}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="precioCompra">Precio de Costo</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="precioCompra"
                                        name="precioCompra"
                                        placeholder="Precio de Costo"
                                        value={formik.values.precioCompra || 0}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.precioCompra && formik.touched.precioCompra)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.precioCompra}
                                    </Form.Control.Feedback>
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
                                        placeholder="Stock Mínimo"
                                        value={formik.values.stockMinimo || 0}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockMinimo && formik.touched.stockMinimo)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockMinimo}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="stockActual">Stock Actual</Form.Label>
                                    <Form.Control
                                        type="number"
                                        id="stockActual"
                                        name="stockActual"
                                        placeholder="Stock Actual"
                                        value={formik.values.stockActual || 0}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.stockActual && formik.touched.stockActual)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.stockActual}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="rubro">Rubro</Form.Label>
                                    <Form.Select
                                        id="rubro"
                                        name="rubro"
                                        value={formik.values.rubro?.id || -1}
                                        onChange={handleChangeRubro}
                                        isInvalid={!!formik.errors.rubro && formik.touched.rubro}
                                    >
                                        <option value="-1">--Seleccione--</option>
                                        {
                                            rubros.map((item: Rubro, index: number) =>
                                                <option value={item.id} key={index}>
                                                    {item.denominacion}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Debe seleccionar un Rubro
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Unidad Medida</Form.Label>
                                    <Form.Select
                                        id="unidadMedida"
                                        name="unidadMedida"
                                        value={formik.values.unidadMedida?.id || -1}
                                        onChange={handleChangeUnidadMedida}
                                        isInvalid={!!formik.errors.unidadMedida && formik.touched.unidadMedida}
                                    >
                                        <option value="-1">--Seleccione--</option>
                                        {
                                            unidadesMedidas.map((item: UnidadMedida, index: number) =>
                                                <option value={item.id} key={index}>
                                                    {item.denominacion}
                                                </option>
                                            )
                                        }
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Debe seleccionar una Unidad de Medida
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="esInsumo">Es Insumo</Form.Label>
                                <Form.Select
                                    id="esInsumo"
                                    name="esInsumo"
                                    value={formik.values.esInsumo ? 1 : 0}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    isInvalid={Boolean(formik.touched.esInsumo && formik.errors.esInsumo)}
                                >
                                    <option value="0">No</option>
                                    <option value="1">Si</option>
                                    {formik.errors.esInsumo}
                                </Form.Select>
                            </Form.Group>
                        </Row>

                        <div className="d-flex justify-content-end mt-4">
                            <Button onClick={handleNavigate} className="btn btn-dark me-2 btn-cancel">
                                Cancelar
                            </Button>

                            <Button type="submit" variant="dark" className="btn-ok" >
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </Container>
            </Container>
        </>
    );
}
export default AMArticuloInsumo;