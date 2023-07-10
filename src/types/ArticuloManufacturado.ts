import { Base } from "./Base";
import { Rubro } from "./Rubro";
import { DetalleArticuloManufacturado } from "./DetalleArticuloManufacturado";

export interface ArticuloManufacturado extends Base {
    denominacion: string;
    descripcion: string;
    imagen: string;
    precioVenta: number;
    detalles: DetalleArticuloManufacturado[];
    rubro?: Rubro;
    receta?: string;
    tiempoEstimadoCocina?: string;
    imagenURL?: string;
}