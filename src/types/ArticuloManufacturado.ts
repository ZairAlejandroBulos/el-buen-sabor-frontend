import { Base } from "./Base";
import { Rubro } from "./Rubro";

export interface ArticuloManufacturado extends Base {
    denominacion: string;
    descripcion: string;
    imagen: string;
    precioVenta: number;
    tiempoEstimadoCocina?: string;
    rubro?: Rubro;
}