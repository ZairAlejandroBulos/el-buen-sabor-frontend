export interface Rubro {
    id: number;
    denominacion: string;
    bloqueado: boolean;
    rubroPadreId?: number;
    rubroPadreDenominacion?: string;
}