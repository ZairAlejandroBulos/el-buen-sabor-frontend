import { Base } from "./Base";
import { Rubro } from "./Rubro";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloInsumo extends Base {
    denominacion: string;
    unidadMedida: UnidadMedida;
    esInsumo?: boolean;
    rubro?: Rubro;
    stockMinimo?: number;
    stockActual?: number;
    precioCompra?: number;
}