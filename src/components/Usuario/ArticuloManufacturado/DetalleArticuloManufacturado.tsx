/*
//TODO: Mostrar Ingredientes del Producto
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { findArticuloManufacturadoById } from "../../../services/ArticuloManufacturadoService";
import "./ArticuloManufacturado.css";
import { ArticuloInsumo } from "../../../types/ArticuloInsumo";

export const DetalleArticuloManufacturado = () => {
    const { id } = useParams();
    const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>();
    const { getAccessTokenSilently } = useAuth0();
    const [ingredientes, setIngredientes] = useState<ArticuloInsumo[]>([]);

    useEffect(() => {
        getArticuloManufacturadoById();
    }, []);

    const getArticuloManufacturadoById = async () => {
        const token = await getAccessTokenSilently();
        const newArticuloManufacturado = await findArticuloManufacturadoById(Number(id), token);
        setArticuloManufacturado(newArticuloManufacturado);
        setIngredientes(newArticuloManufacturado.articulosInsumo);
    }


    return (
        <Container className='container-detalle'>
            <Row>
                <Col>
                    <img
                        src={`http://localhost:5173/images/hamburguesa.jpg`}
                        alt={articuloManufacturado?.denominacion}
                        className="mx-auto d-block img-detalle"
                    />
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <h1>{articuloManufacturado?.denominacion}</h1>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <h3>Ingredientes</h3>
                        <ul className='lista-ingrediente'>
                            {ingredientes.map((item: ArticuloInsumo, index: number) => (
                                <li key={index}>{item.denominacion}</li>
                            ))}
                        </ul>
                    </Row>
                    <Row>
                        <Col>
                            <Link to={`/`}>
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
    )
}*/