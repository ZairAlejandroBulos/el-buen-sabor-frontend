import { ArticuloInsumo } from "../types/ArticuloInsumo";
import { isNumberPositive, isValidString } from "./Util";

export function isArticuloInsumo(value: ArticuloInsumo): boolean {
    try {
        return isValidString(value.denominacion) &&
            value.stockMinimo !== undefined && isNumberPositive(value.stockMinimo) &&
            value.stockActual !== undefined && isNumberPositive(value.stockActual) &&
            value.precioCompra !== undefined && isNumberPositive(value.precioCompra) &&
            value.rubro !== null;
    } catch (error) {
        return false;
    }
}