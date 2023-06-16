import { Rubro } from "./Rubro";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloInsumo {
    id: number;
    denominacion: string;
    esInsumo?: boolean;
    unidadMedida?: UnidadMedida;
    precioCompra?: number;
    stockMinimo?: number;
    stockActual?: number;
    rubro?: Rubro;

}