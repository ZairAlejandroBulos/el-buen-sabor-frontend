import { Endpoint } from "../types/Endpoint";
import { ArticuloInsumo } from "../types/ArticuloInsumo";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;


/** 
* Obtiene una lista de Artículos Insumos que sean bebidas.
*
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Insumos que sean bebidas.
*/
export async function findBebidas(token: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloInsumo}/bebidas`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloInsumo[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}