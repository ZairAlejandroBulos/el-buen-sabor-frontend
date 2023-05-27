import { Rol } from "./Rol";

export class Usuario {
    id: number = 0;
    auth0Id: string;
    usuario: string;
    rol: Rol;
}