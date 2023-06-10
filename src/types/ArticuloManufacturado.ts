import { Rubro } from "./Rubro";

export interface ArticuloManufacturado {
    id: number;
    denominacion: string;
    descripcion: string;
    imagen: string;
    precioVenta: number;
    tiempoEstimadoCocina?: string;
    rubro?: Rubro;
}