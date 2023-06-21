import { Endpoint } from "../types/Endpoint";
import { ArticuloManufacturadoInsumo } from "../types/ArticuloManufacturadoInsumo";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/** 
* Obtiene una lista de Artículos Insumos que contenga un Artículo Manufacturado.
*
* @param id ID del Artículo Manufacturado al cual se buscaran sus Artículos Insumos.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Insumos.
*/
export async function findByArticuloManufacturado(id: number, token: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturadoInsumo}/byArticuloManufacturado/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturadoInsumo[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}