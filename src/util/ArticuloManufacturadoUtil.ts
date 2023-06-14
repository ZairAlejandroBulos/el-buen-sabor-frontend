import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { isValidString, isNumberPositive } from "./Util";

export function isArticuloManufacturado(value: ArticuloManufacturado): boolean {
    try {
        return isValidString(value.denominacion) &&
            isValidString(value.descripcion) &&
            isValidString(value.imagen) &&
            isNumberPositive(value.precioVenta) &&
            isValidTimeFormat(value.tiempoEstimadoCocina) &&
            value.rubro !== null
    } catch (error) {
        return false;
    }
}

function isValidTimeFormat(value: string | undefined): boolean {
    const regex = /^([0-9]{2}):([0-9]{2}):([0-9]{2})$/;
    return value !== undefined && regex.test(value);
}