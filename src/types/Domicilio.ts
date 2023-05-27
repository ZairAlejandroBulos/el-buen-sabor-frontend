import { Localidad } from "./Localidad";

export class Domicilio {
    id: number = 0;
    calle: string;
    numero: number;
    localidad: Localidad;
}