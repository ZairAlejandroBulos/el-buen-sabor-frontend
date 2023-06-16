import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

import "./ArticuloManufacturado.css";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { ArticuloManufacturadoInsumo } from "../../../types/ArticuloManufacturadoInsumo";
import { findArticuloInsumoById } from "../../../services/ArticuloInsumoService";
import { findArticuloManufacturadoById } from "../../../services/ArticuloManufacturadoService";
import { findByArticuloManufacturado } from "../../../services/ArticuloManufacturadoInsumoService";

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

        const newArticuloManufacturado = await findArticuloManufacturadoById(Number(id), token);

        const newArticulosManufacturadosInsumos = await findByArticuloManufacturado(newArticuloManufacturado.id, token);

        let articulosInsumosArray = [];
        for (const item of newArticulosManufacturadosInsumos) {
            const id = item.articuloInsumoId;
            const newArticuloInsumo = await findArticuloInsumoById(id, token);

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
                    <Row>
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
                    <Row className="botones">
                        <Col>
                            <Link to={`/productos/all`}>
                                <Button variant='success'>
                                    Seguir Comprando
                                </Button>
                            </Link>
                        </Col>
                        <Col>
                            <Button variant='primary'>
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