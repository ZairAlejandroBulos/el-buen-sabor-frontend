import { Button, Col } from "react-bootstrap";
import { Ingredientes} from "../../types/Ingredientes";
import { useNavigate } from 'react-router-dom';
type ProductoParams = {
    id:number;
    nombre:string;
    rubro:string;
    descripcion:string;
    rutaImagen:string;
    tiempoCocina: number;
    precioVenta:number;
    baja:boolean;
    procedimiento?:string;
    ingredientes?: Ingredientes[];
}


export const ItemProducto = (args : ProductoParams) =>{
    const navigate = useNavigate();
    function handleButtonClick() {
        navigate('/Abm', { state: args});
    }

    return(
        <><Col className="item-producto">{args.nombre}</Col><Col className="item-producto">{args.rubro}</Col><Col className="item-producto">{args.tiempoCocina}</Col><Col className="item-producto">{args.precioVenta}</Col><Col className="item-producto" id="col-editar"><Button id="col-editar-boton" onClick={handleButtonClick}>Editar</Button></Col></>
    );
}