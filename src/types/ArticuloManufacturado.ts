import { ArticuloManufacturadoPrecioVenta } from "./ArticuloManufacturadoPrecioVenta";
import { Imagen } from "./Imagen";

export interface ArticuloManufacturado {
    id: number;
    denominacion: string;
    descripcion: string;
    imagen: string;
    precioVenta: number;
}