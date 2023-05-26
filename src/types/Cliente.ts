import { Usuario } from "./Usuario";
import { Domicilio } from "./Domicilio";

export class Cliente {
    id: number = 0;
    nombre: string;
    apellido: string;
    telefono: number;
    usuario: Usuario;
    domicilio: Domicilio;
}