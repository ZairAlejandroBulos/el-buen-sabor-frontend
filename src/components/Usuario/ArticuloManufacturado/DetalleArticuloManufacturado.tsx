import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row, Image } from "react-bootstrap";

import { Endpoint } from "../../../types/Endpoint";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { ArticuloManufacturadoInsumo } from "../../../types/ArticuloManufacturadoInsumo";
import { findById } from "../../../services/BaseService";
import { findByArticuloManufacturado } from "../../../services/ArticuloManufacturadoInsumoService";
import { findArticuloManufacturadoSimpleById } from "../../../services/ArticuloManufacturadoService";
import { useCarrito } from "../../../context/CarritoContext";
import "./ArticuloManufacturado.css";

/**
 * Componente que muestra los detalles de un Artículo Manufacturado .
 * @author Castillo
 */
function DetalleArticuloManufacturado(): JSX.Element {
    const { id } = useParams();
    const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>();
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    const [articulosManufacturadosInsumos, setArticulosManufacturadosInsumos] = useState<ArticuloManufacturadoInsumo[]>([]);
    const { getAccessTokenSilently } = useAuth0();
    const { increaseCartQuantity } = useCarrito();

    useEffect(() => {
        getArticuloManufacturado();
    }, []);

    const getArticuloManufacturado = async () => {
        const token = await getAccessTokenSilently();

        const newArticuloManufacturado = await findArticuloManufacturadoSimpleById(Number(id), token);

        const newArticulosManufacturadosInsumos = await findByArticuloManufacturado(Number(newArticuloManufacturado.id), token);

        let articulosInsumosArray = [];
        for (const item of newArticulosManufacturadosInsumos) {
            const id = item.articuloInsumo.id;
            const newArticuloInsumo = await findById<ArticuloInsumo>(Endpoint.ArticuloInsumo, id, token);

            articulosInsumosArray.push(newArticuloInsumo);
        };

        setArticuloManufacturado(newArticuloManufacturado);
        setArticulosManufacturadosInsumos(newArticulosManufacturadosInsumos);
        setArticulosInsumos(articulosInsumosArray);
    };

    return (
        <div className="d-flex align-items-center" style={{ minHeight: '80vh' }} >
            <Container className="detalle-producto">
                <Row className="justify-content-center align-items-center rounded rounded-5 fila-central">
                    <Col sm={12} md={6}>
                        <Image
                            src={articuloManufacturado?.imagen}
                            alt={articuloManufacturado?.denominacion}
                            className="d-block w-100 rounded rounded-5 rounded-end">
                        </Image>
                    </Col>
                    <Col sm={12} md={6}>
                        <Row>
                            <Col xs={8} className="d-flex justify-content-start mb-3 mt-3" >
                                <h1>
                                    <strong>
                                        {articuloManufacturado?.denominacion}
                                    </strong>
                                </h1>
                            </Col>
                            <Col xs={4} className="d-flex justify-content-end mt-3">
                                <h2>
                                    <strong>
                                        ${articuloManufacturado?.precioVenta}
                                    </strong>
                                </h2>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <h4>
                                {articuloManufacturado?.descripcion}
                            </h4>
                        </Row>
                        <Row className="mb-2">
                            {
                                articulosInsumos.length !== 0 &&
                                <>
                                    <h5><strong>Ingredientes</strong></h5>
                                    <ul>
                                        {
                                            articulosInsumos?.map((item: ArticuloInsumo, index: number) =>
                                                <li key={index} style={{ listStyle: 'none' }}>{item.denominacion}</li>
                                            )
                                        }
                                    </ul>
                                </>
                            }
                        </Row>
                        <Row className="text-center">
                            <Col xs={6} sm={6} md={6} lg={6} xl={6} className="mb-3 sm-0">
                                <Link to={`/productos/all`}>
                                    <Button className="btn-add" variant="dark">
                                        Seguir Comprando
                                    </Button>
                                </Link>
                            </Col>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                                <Button onClick={() => increaseCartQuantity(Number(id))} className="btn-ok" variant="dark">
                                    Agregar al Carrito
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default DetalleArticuloManufacturado;
