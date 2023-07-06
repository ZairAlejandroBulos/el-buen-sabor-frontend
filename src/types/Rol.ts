import { Base } from "./Base";

export interface Rol extends Base {
    auth0RolId: string;
    denominacion: string;
}

export interface Auth0Rol {
    id: string;
    name: string;
    description: string;
}