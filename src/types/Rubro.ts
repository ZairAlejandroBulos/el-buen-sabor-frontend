import { Base } from "./Base";

export interface Rubro extends Base {
    denominacion: string;
    bloqueado: boolean;
    rubroPadreId?: number;
    rubroPadreDenominacion?: string;
}