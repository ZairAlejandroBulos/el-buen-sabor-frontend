import { useState, useEffect } from "react";
import { Button, ListGroup, Form } from "react-bootstrap";
import  ItemRecetaProducto  from "./ItemIngredienteReceta";
import { Producto } from "../../types/Producto";
import { Ingredientes} from "../../types/Ingredientes";
import {  getIngredientesJSON } from '../../services/ProductoRecetaService';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './RecetaProducto.css'


type ProductoParams = {
    nombre: string;
    unidadMedida: string;
}

export const RecetaAbmProducto = () =>{

    const location = useLocation();
    const producto:Producto = location.state;

    const [productos, setProductos] = useState<Producto>(producto);

    //Ingredientes Agregados
    const [ingredienteReceta, setIngredienteReceta] = useState<Ingredientes[]>([]);

    //Todos los ingredientes que existen
    const [ingredientesEncontrandos, setAllIngredientes] = useState<ProductoParams[]>([]);
    
    const [unidadMedida, setUnidadMedida] = useState("");

    useEffect(() => {
        getAllIngredientes();
        getIngredientesReceta();

    }, []);

    const getIngredientesReceta = () => {
        if(producto!=null){
            if(producto.ingredientes!=null){
                let newIngredienteReceta: Ingredientes[] = producto.ingredientes;
                setIngredienteReceta(newIngredienteReceta);
            }
        }
    };

    //Trae todos los ingredientes existentes para que se pueda agregar a la lista de ingredientes de la receta
    const getAllIngredientes = async () => {
        try {
            const ingredientes = await getIngredientesJSON();
            const newIngrediente: Ingredientes[] = ingredientes.map((ingrediente) => ({
                nombre: ingrediente.nombre,
                unidadMedida: ingrediente.unidadMedida
            }));
            setAllIngredientes(newIngrediente);
        } catch (error) {
            console.error(error);
        }
    };

    
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setProductos({ ...productos, [name]: value });
    };

    //Para poder volver al AbmProducto
    const navigate = useNavigate();
    const handleCancelar= () => {
        navigate('/Abm', { state: producto});
    }

    //Nos permite que al momento de seleccionar a un ingrediente en el formulario, este muestre la unidad medida correspodiente
    const handleOnChange = (e: any) => {
        const { value } = e.target;
        const selectedIngrediente = ingredientesEncontrandos.find(
          (ingredientesEncontrandos) => ingredientesEncontrandos.nombre === value
        );
        setUnidadMedida(selectedIngrediente?.unidadMedida || "");
    };

    //Para poder modificar al procedimiento de la receta
    const handleModificar= () => {
        
        const proceso = (document.getElementsByName('procedimiento')[0] as HTMLTextAreaElement).value;
    
        if(!proceso|| ingredienteReceta.length==0){
            alert("Minimo 1 ingrediente y debe existir el Procedimiento");
            return;
        }
        else{
            alert(proceso+"   "+ingredienteReceta.length);
            producto.procedimiento=proceso;
            producto.ingredientes=ingredienteReceta;
            navigate('/Abm', { state: producto});
        }        
    }


    //Agrega Ingredientes-En caso de que ya existan los suma al ingrediente existente
    const handleAgregar = () => {
        const nombre = (document.getElementsByName('ingrediente')[0] as HTMLSelectElement).value;
        const cantidad = (document.getElementsByName('cantidad')[0] as HTMLInputElement).value;
        const unidadMedida = (document.getElementsByName('unidadMedida')[0] as HTMLInputElement).value;
        
        if (!nombre || !cantidad) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const nuevoIngredienteReceta: Ingredientes= {
            nombre: nombre,
            cantidad: parseInt(cantidad),
            unidadMedida: unidadMedida,
        };
        
        const ingredienteIndex = ingredienteReceta.findIndex((ingredienteReceta) => ingredienteReceta.nombre === nombre);
        if (ingredienteIndex >= 0) {
            const nuevosIngredientes = [...ingredienteReceta];
            const ingredienteExistente = nuevosIngredientes[ingredienteIndex];
            if (ingredienteExistente) {
              ingredienteExistente.cantidad += parseInt(cantidad);
            }
            setIngredienteReceta(nuevosIngredientes);
          } else {
            const nuevosIngredientes = [...ingredienteReceta, nuevoIngredienteReceta];
            setIngredienteReceta(nuevosIngredientes);
          }
    };

    //Borra el ingrediente de la lista
    function borrarItemRecetaProducto(nombreIngrediente: string) {
        const nuevoIngredienteReceta = ingredienteReceta.filter((ingReceta) => ingReceta.nombre !== nombreIngrediente);
        setIngredienteReceta(nuevoIngredienteReceta);
    }

    return (
        <>
        <div className="container">
            <Form id="grid">
                    <Form.Group>
                        <Form.Label className="titulos">Ingrediente</Form.Label>
                        <Form.Select name="ingrediente" required id="input" onChange={handleOnChange}>
                            <option selected></option>
                            {ingredientesEncontrandos && ingredientesEncontrandos.map((element: Ingredientes) => (
                            <option key={element.nombre} value={element.nombre}>
                                {element.nombre}
                            </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="titulos">Cantidad</Form.Label>
                        <Form.Control name="cantidad" type="number" required  id="input" min={1} step={1}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="titulos">Unidad de Medida</Form.Label>
                        <Form.Control name="unidadMedida" id="input" value={unidadMedida} disabled />
                    </Form.Group>
                    <Button id="buttonAgregar" onClick={handleAgregar}>
                        Agregar
                    </Button>
            </Form>
            <Form>
                <ListGroup>
                    {
                        ingredienteReceta.map((element: Ingredientes) => 
                            <ItemRecetaProducto
                                nombre={element.nombre}
                                cantidad={element.cantidad}
                                unidadMedida={element.unidadMedida}
                                borrarProducto={borrarItemRecetaProducto}
                            />
                        )
                    }
                </ListGroup>
                
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="titulos">Procedimiento</Form.Label>
                    <Form.Control name="procedimiento" id="procedimiento" as="textarea" rows={5}  onChange={handleInputChange} value={productos?.procedimiento}/>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="dark" id="button" onClick={handleCancelar}>
                        Cancelar
                    </Button>
                    <Button variant="dark" id="button" onClick={handleModificar}>
                        Modificar Cambios
                    </Button>
                </div>
            </Form>
        </div>
        </>

    );

}

export default RecetaAbmProducto;