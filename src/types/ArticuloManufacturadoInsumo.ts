import { Base } from "./Base";
import { ArticuloInsumo } from "./ArticuloInsumo";
import { ArticuloManufacturado } from "./ArticuloManufacturado";

export interface ArticuloManufacturadoInsumo extends Base {
    cantidad: number;
    articuloManufacturado: ArticuloManufacturado;
    articuloInsumo: ArticuloInsumo;
}