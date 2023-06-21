import { Rubro } from "../types/Rubro";
import { Endpoint } from "../types/Endpoint";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Obtiene todos los Rubros Desbloqueados (bloqueado = false).
 * 
 * @param token oken de autenticación.
 * @returns Una promesa que se resuelve en una lista de Rubros.
 */
export async function findRubrosDesbloqueados(token: string): Promise<Rubro[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Rubro}/desbloqueados`, {
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
 * Verifica si existe un Rubro por denominación.
 * 
 * @param denominacion Denominación a verificar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un boolean.
 */
export async function existsByDenominacion(denominacion: string, token: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Rubro}/exists/${denominacion}`, {
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
 * Bloquea/Desbloquea un Rubro por su ID.
 * 
 * @param id ID del Rubro a bloquear/desbloquear.
 * @param token Token de autenticación.
 */
export async function bloquearDebloquearRubro(id: number, token: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Rubro}/bloquear-desbloquear/${id}`, {
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