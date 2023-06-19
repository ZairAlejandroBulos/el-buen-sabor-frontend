import { Base } from "../types/Base";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Obtiene todos los elementos de una entidad especifica.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de elementos de la entidad especificada.
 */
export async function findAll<T extends Base>(endpoint: string, token: string): Promise<T[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as T[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene un elemento de una entidad específica por su ID.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param id ID de la entidad a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con un elemento de la entidad especificada.
 */
export async function findById<T extends Base>(endpoint: string, id: number, token: string): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as T;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Guarda un nuevo elemento de una entidad específica.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param entity Entidad a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve con el elemento guardado de la entidad especificada.
 */
export async function save<T extends Base>(endpoint: string, entity: T, token: string): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        
        if (response.status === 201) {
            const data = await response.json() as T;
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
 * Actualiza un elemento de una entidad específica por su ID.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param id ID de la entidad a actualizar.
 * @param entity Entidad con los datos actualizados.
 * @param token Token de autenticación.
 * @returns  Una promesa que se resuelve con el elemento actualizado de la entidad especificada.
 */
export async function update<T extends Base>(endpoint: string, id: number, entity: T, token: string): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        
        if (response.status === 201) {
            const data = await response.json() as T;
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
 * Elimina un elemento de una entidad específica por su ID.
 * 
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @param id ID de la entidad a eliminar.
 * @param token Token de autenticación.
 */
export async function remove(endpoint: string, id: number, token: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }   
        });

        if (response.status !== 204) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}