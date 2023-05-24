import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import './ABMProducto.css'
import { useNavigate } from 'react-router-dom';
import { Producto } from "../../types/Producto";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export const ABMProducto = () =>{
    
  const location = useLocation();
  const producto: Producto = location.state;

  const [productos, setProductos] = useState<Producto>(producto);

  const navigate = useNavigate();

  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductos({ ...productos, [name]: value });
  };

  const handleBajaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const baja = event.target.value === 'Si';
    setProductos({ ...productos, baja });
  };

  const handleRubroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rubro = event.target.value;
    setProductos({ ...productos, rubro });
  };

  const handleModificarClick = () => {

    if(!productos){
        alert("Faltan campos requeridos");
        
        return;
    }

   
        if (
            productos.nombre &&
            productos.tiempoCocina &&
            productos.rubro &&
            productos.precioVenta &&
            productos.descripcion &&
            productos.rutaImagen
        
        ) {
            if(productos.baja==undefined){
                productos.baja=false;
            }
            if(!productos.procedimiento &&
                !productos.ingredientes ){
                alert("Debe existir una Receta");
            }
            else{
                alert(`Nombre: ${productos.nombre}\nDescripcion: ${productos.descripcion}\nPrecio: ${productos.precioVenta}\nBaja: ${productos.baja}\nRubro: ${productos.rubro}\nTiempo: ${productos.tiempoCocina}\nImagen: ${productos.rutaImagen}`);
                navigate('/ListProduct', { state: productos});
            }
        } else {
            alert("Faltan campos requeridos");
        }
  };

  const handleButtonClick = () => {
    navigate('/Receta', { state: productos });
  };


    return(
        <>
            <Container fluid="md" id="contenedor">
                
                <Row>
                    <Col></Col>
                    <Col id="titulo"><h1>Producto</h1></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                        <label>Nombre</label>
                        <Form.Control type="text" name="nombre" value={productos?.nombre} onChange={handleInputChange} />
                    </Col>
                    <Col>
                    </Col>
                    <Col>
                        <label>Tiempo Cocina</label>
                        <Form.Control type="number" name="tiempoCocina" value={productos?.tiempoCocina} onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Rubro</label>
                        <Form.Select name="rubro" value={productos?.rubro} onChange={handleRubroChange}>
                            <option></option>
                            <option>Pizzas</option>
                            <option>Lomo</option>
                            <option>Hamburguesas</option>
                            <option>Papas</option>
                            <option>Bebidas</option>
                        </Form.Select>
                    </Col>
                    <Col></Col>
                    <Col>
                        <label>Precio Venta</label>
                        <Form.Control type="number" name="precioVenta" value={productos?.precioVenta} onChange={handleInputChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Descripcion</label>
                        <Form.Control type="text" name="descripcion" value={productos?.descripcion} onChange={handleInputChange}/>
                    </Col>
                    <Col></Col>
                    <Col>
                        <label>Baja</label>
                        <Form.Select value={productos?.baja ? 'Si' : 'No'} onChange={handleBajaChange}>
                            <option>No</option>
                            <option>Si</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Ingrediente</p>
                        <Button id="boton-agregar-ingrediente">Agregar Ingrediente</Button>
                    </Col>
                    <Col></Col>
                    <Col>
                        <p>Receta</p>
                        <Button onClick={handleButtonClick}>Crear/Modificar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Foto</label>
                        <Form.Control type="text" name="rutaImagen" value={productos?.rutaImagen} onChange={handleInputChange}/>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col id="col-botones"><Link to="/ListProduct"><Button className="botones-cancelar-modificar">Cancelar</Button></Link><Button className="botones-cancelar-modificar" onClick={handleModificarClick}>Modificar</Button></Col>
                    <Col></Col>
                </Row>                
            </Container>
        </>
    );
}