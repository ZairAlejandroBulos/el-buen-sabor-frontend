import "./ArticuloManufacturado.css";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

import { Endpoint } from "../../../types/Endpoint";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { ArticuloManufacturadoInsumo } from "../../../types/ArticuloManufacturadoInsumo";
import { findById } from "../../../services/BaseService";
import { findByArticuloManufacturado } from "../../../services/ArticuloManufacturadoInsumoService";
import { findArticuloManufacturadoSimpleById } from "../../../services/ArticuloManufacturadoService";

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
        <Container className='container-detalle'>
            <Row className="row-detalle">
                <Col>
                    <img
                        src={articuloManufacturado?.imagen}
                        alt={articuloManufacturado?.denominacion}
                        className="mx-auto d-block img-detalle"
                    />
                </Col>
                <Col className="col-detalle">
                    <Row className="row-detalle">
                        <Col className="col-nombre">
                            <h1>
                                <strong>
                                    {articuloManufacturado?.denominacion}
                                </strong>
                            </h1>
                        </Col>

                        <Col className="col-precio">
                            <h2>
                                <strong>
                                    ${articuloManufacturado?.precioVenta} 
                                </strong>
                            </h2>
                        </Col>
                    </Row>
                    <Row className="row-descripcion">
                        <h3>
                            {articuloManufacturado?.descripcion}
                        </h3>
                    </Row>
                    <Row className="row-ingredientes">
                        {
                            articulosInsumos.length !== 0 &&
                            <>
                                <h4 className="titulo-ingredientes">Ingredientes</h4>
                                <ul className='lista-ingrediente'>
                                    {
                                        articulosInsumos?.map((item: ArticuloInsumo, index: number) =>
                                            <li key={index}>{item.denominacion}</li>
                                        )
                                    }
                                </ul>
                            </>
                        }
                    </Row>
                    <Row>
                        <Col>
                            <Link to={`/productos/all`}>
                                <Button variant='success' className="botones">
                                    Seguir Comprando
                                </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button variant='primary'className="botones">
                                Agregar al Carrito
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default DetalleArticuloManufacturado;