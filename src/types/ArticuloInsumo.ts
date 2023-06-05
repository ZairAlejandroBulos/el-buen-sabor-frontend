import { ArticuloInsumoPrecioCompra } from "./ArticuloInsumoPrecioCompra";
import { ArticuloInsumoStockActual } from "./ArticuloInsumoStockActual";
import { ArticuloInsumoStockMinimo } from "./ArticuloInsumoStockMinimo";
import { UnidadMedida } from "./UnidadMedida";

export interface ArticuloInsumo {
    id: number;
    denominacion: string;
    esInsumo: boolean;
    unidadMedida: UnidadMedida;
    articuloInsumoPrecioCompra: ArticuloInsumoPrecioCompra;
    articuloInsumoStockMinimo: ArticuloInsumoStockMinimo;
    articuloInsumoStockActual: ArticuloInsumoStockActual;

}