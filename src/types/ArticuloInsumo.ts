import { Base } from "./Base";
import { Rubro } from "./Rubro";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloInsumo extends Base {
    denominacion: string;
    esInsumo: boolean;
    unidadMedida: UnidadMedida;
    rubro: Rubro;
    precioCompra?: number;
    stockMinimo?: number;
    stockActual?: number;
}