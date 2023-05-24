import { useEffect, useState } from "react";
import './ListadoProducto.css'
import { Producto } from '../../types/Producto';
import { Button, Col, Container, Row } from "react-bootstrap";
import { getProductoJSON} from '../../services/ProductoRecetaService';
import { ItemProducto } from "./ItemProducto";
import { Link } from 'react-router-dom';



export const ListadoProducto = () =>{
    const [productos, setProductos] = useState<Producto[]>([]);
    

    const getProductosResto = () =>{
        let newIngredienteReceta: Producto[] = getProductoJSON();
        setProductos(newIngredienteReceta);
    };

    useEffect(() => {
        getProductosResto();
    }, []);


    return (
        <>
            <Container fluid="md">
                <h1>Productos</h1>
                <Link to="/Abm"><Button id="boton-nuevo">Nuevo</Button></Link>

                    <Row id="adm-tabla-encabezado">
                        <Col>Nombre</Col>
                        <Col>Rubro</Col>
                        <Col>Tiempo Preparacion</Col>
                        <Col>Precio Venta</Col>
                        <Col>Accion</Col>
                    </Row>
                    {productos.map((producto: Producto) => (
                        <Row key={producto.id} id="adm-tabla-contenido" className={producto.baja ? "bg-danger" : "#F94144"}>
                            <ItemProducto
                                id={producto.id}
                                nombre={producto.nombre}
                                rubro={producto.rubro}
                                descripcion={producto.descripcion}
                                rutaImagen={producto.rutaImagen}
                                tiempoCocina={producto.tiempoCocina}
                                precioVenta={producto.precioVenta}
                                baja={producto.baja}
                                procedimiento={producto.procedimiento}
                                ingredientes={producto.ingredientes}
                            />
                        </Row>
                    ))}

                
            </Container>
        </>
    );
}

