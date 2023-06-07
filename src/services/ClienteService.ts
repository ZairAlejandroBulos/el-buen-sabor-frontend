import { URL_API_BASE } from "../constants";
import { Cliente } from "../types/Cliente";

/**
 * Obtiene todos los Clientes filtrados por Roles.
 * 
 * @param roles Roles de los Clientes a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de Clientes.
 */
export async function findAllClientesByRoles(roles: string[], token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byRoles/${roles.join(",")}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene todos los Clientes filtrados por nombre.
 * 
 * @param nombre Nombre del Cliente a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de Clientes.
 */
export async function findAllClientesByNombre(nombre: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byNombre/${nombre}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene todos los Clientes filtrados por apellido.
 * 
 * @param apellido Apellido de los Clientes a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de Clientes.
 */
export async function findAllClientesByApellido(apellido: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byApellido/${apellido}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene todos los Clientes filtrados por nombre y apellido.
 * 
 * @param nombre Nombre del Cliente a buscar.
 * @param apellido Apellido de los Clientes a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de Clientes.
 */
export async function findAllClientesByNombreAndApellido(nombre: string, apellido: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byNombreAndApellido/${nombre}/${apellido}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Guarda un nuevo Cliente.
 * 
 * @param entity Cliente a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Cliente guardado.
 */
export async function saveCliente(entity: Cliente, token: string): Promise<Cliente> {
    try {
        const response = await fetch(`${URL_API_BASE} / clientes`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Cliente;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza un Cliente existente por su ID.
 * 
 * @param id ID del Cliente a actualizar.
 * @param entity Cliente con los datos actualizados.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Cliente actualizado.
 */
export async function updateCliente(id: number, entity: Cliente, token: string): Promise<Cliente> {
    try {
        const response = await fetch(`${URL_API_BASE} / clientes/${id}}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Cliente;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Elimina un Cliente por su ID.
 * 
 * @param id ID del Cliente a eliminar.
 * @param token Token de autenticación.
 */
export async function deleteCliente(id: number, token: string): Promise<void> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}
