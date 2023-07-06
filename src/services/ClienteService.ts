import { Cliente } from "../types/Cliente";
import { Endpoint } from "../types/Endpoint";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Obtiene todos los Clientes con rol de Cliente.
 * 
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de Clientes.
 */
export async function findAllClientes(token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Cliente}/rolClientes`, {
            method: "GET",
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
 * Obtiene todos los Clientes con rol de Empleado (Admin/Cocinero/Cajero/Delivery).
 * 
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de Clientes.
 */
export async function findAllEmpleados(token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Cliente}/rolEmpleados`, {
            method: "GET",
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
 * Obtiene un Cliente por su auth0Id.
 * 
 * @param auth0Id Auth0Id del Cliente a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con un Cliente.
 */
export async function findClienteByUsuarioAuth0Id(auth0Id: string, token: string): Promise<Cliente> {
    try {
        const encoded = encodeURIComponent(auth0Id);

        const response = await fetch(`${API_BASE_URL}/${Endpoint.Cliente}/byAuth0Id?auth0Id=${encoded}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza el estado bloqueado de un Cliente.
 * 
 * @param id ID del Cliente a actualizar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con el Cliente actualizado.
 */
export async function updateEstadoUsuario(id: number, token: string): Promise<Cliente> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Cliente}/cambiarEstado/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}