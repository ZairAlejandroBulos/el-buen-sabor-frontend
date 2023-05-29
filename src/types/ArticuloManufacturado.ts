import { ArticuloManufacturadoPrecioVenta } from "./ArticuloManufacturadoPrecioVenta";
import { Imagen } from "./Imagen";

export class ArticuloManufacturado {
    id: number;
    denominacion: string;
    descripcion: string;
    timpoEstimadoCocina: Date;
    imagenes: Imagen[];
    articuloManufacturadoPrecioVenta: ArticuloManufacturadoPrecioVenta;
}