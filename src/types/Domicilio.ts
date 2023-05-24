import Localidad from "./Localidad";

export default class Domicilio {
    id: number = 0;
    calle: string;
    numero: number;
    localidad: Localidad;
}