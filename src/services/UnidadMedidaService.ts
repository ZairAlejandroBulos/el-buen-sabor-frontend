import { URL_API_BASE } from "../constants";
import { UnidadMedida } from "../types/UnidadMedida";

/**
 * Obtiene todos las UnidadMedida.
 * 
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una lista de UnidadMedida.
 */
export async function findAllUnidadMedida(token: string): Promise<UnidadMedida[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/unidad-medida`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as UnidadMedida[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Obtiene una UnidadMedida por su ID.
 * 
 * @param id ID de la UnidadMedida a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en una UnidadMedida.
 */
export async function findUnidadMedidaById(id: number, token: string): Promise<UnidadMedida> {
    try {
        const response = await fetch(`${URL_API_BASE}/unidad-medida/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as UnidadMedida;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Verifica si existe una UnidadMedida por denominación.
 * 
 * @param denominacion Denominación a verificar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un boolean.
 */
export async function existsByDenominacion(denominacion: string, token: string): Promise<boolean> {
    try {
        const response = await fetch(`${URL_API_BASE}/unidad-medida/exists/${denominacion}`, {
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
 * Guarda una nueva UnidadMedida.
 * 
 * @param entity UnidadMedida a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en la UnidadMedida guardado.
 */
export async function saveUnidadMedida(entity: UnidadMedida, token: string): Promise<UnidadMedida> {
    try {
        const response = await fetch(`${URL_API_BASE}/unidad-medida`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json() as UnidadMedida;
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
 * Actualiza una UnidadMedida existente por su ID.
 * 
 * @param id ID de la UnidadMedida a actualizar.
 * @param entity UnidadMedida con los datos actualizados.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en la UnidadMedida actualizado.
 */
export async function updateUnidadMedida(id: number, entity: UnidadMedida, token: string): Promise<UnidadMedida> {
    try {
        console.log(`update ${id}, values ${entity}`)
        const response = await fetch(`${URL_API_BASE}/unidad-medida/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json',
            }
        });

        if (response.status === 201) {
            const data = await response.json() as UnidadMedida;
            return data;
        } else {
            console.log("ERROR UPDATE RESPONSE")
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}