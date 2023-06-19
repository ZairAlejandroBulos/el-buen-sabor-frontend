import { URL_API_BASE } from "../constants";
import { Rubro } from "../types/Rubro";

/**
 * Obtiene todos los Rubros.
 * 
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de Rubros.
 */
export async function findAllRubro(token: string): Promise<Rubro[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Rubro[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene todos los Rubros Desbloqueados (bloqueado = false).
 * 
 * @param token oken de autenticación.
 * @returns Una promesa que se resuelve en una lista de Rubros.
 */
export async function findRubrosDesbloqueados(token: string): Promise<Rubro[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros/desbloqueados`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Rubro[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene un Rubro por su ID.
 * 
 * @param id ID del Rubro a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un Rubro.
 */
export async function findRubroById(id: number, token: string): Promise<Rubro> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Rubro;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Verifica si existe un Rubro por denominación.
 * 
 * @param denominacion Denominación a verificar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un boolean.
 */
export async function existsByDenominacion(denominacion: string, token: string): Promise<boolean> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros/exists/${denominacion}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Guarda un nuevo Rubro.
 * 
 * @param entity Rubro a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Rubro guardado.
 */
export async function saveRubro(entity: Rubro, token: string): Promise<Rubro> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Rubro;
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
 * Actualiza un Rubro existente por su ID.
 * 
 * @param id ID del Rubro a actualizar.
 * @param entity Rubro con los datos actualizados.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Rubro actualizado.
 */
export async function updateRubro(id: number, entity: Rubro, token: string): Promise<Rubro> {
    try {
        console.log(`update ${id}, values ${entity}`)
        const response = await fetch(`${URL_API_BASE}/rubros/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Rubro;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function bloquearDebloquearRubro(id: number, token: string): Promise<void> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros/bloquear-desbloquear/${id}`, {
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