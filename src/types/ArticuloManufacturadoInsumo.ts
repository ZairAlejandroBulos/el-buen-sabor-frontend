import { ArticuloInsumo } from "./ArticuloInsumo";
import { ArticuloManufacturado } from "./ArticuloManufacturado";

export interface ArticuloManufacturadoInsumo {
    id: number;
    cantidad: number;
    articuloManufacturado: ArticuloManufacturado;
    articuloInsumo: ArticuloInsumo;
}