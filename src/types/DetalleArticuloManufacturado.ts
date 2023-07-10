import { Base } from "./Base";
import { ArticuloInsumo } from "./ArticuloInsumo";

export interface DetalleArticuloManufacturado extends Base {
    cantidad: number;
    articuloInsumo: ArticuloInsumo;
}