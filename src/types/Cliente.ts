import Domicilio from "./Domicilio";
import Usuario from "./Usuario";

export default class Cliente {
    id: number = 0;
    nombre: string;
    apellido: string;
    telefono: number;
    usuario: Usuario;
    domicilio: Domicilio;
}