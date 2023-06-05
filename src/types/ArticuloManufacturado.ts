import { ArticuloManufacturadoPrecioVenta } from "./ArticuloManufacturadoPrecioVenta";
import { Imagen } from "./Imagen";

export interface ArticuloManufacturado {
    id: number;
    denominacion: string;
    descripcion: string;
    tiempoEstimadoCocina: string; // TODO: Manejar tiempoEstimadoCocina como Date
    imagenes: Imagen[];
    articuloManufacturadoPrecioVenta: ArticuloManufacturadoPrecioVenta;
}