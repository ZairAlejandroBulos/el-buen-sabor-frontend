import { URL_API_BASE } from "../constants";
import { ArticuloManufacturadoInsumo } from "../types/ArticuloManufacturadoInsumo";

/** 
* Obtiene una lista de Artículos Insumos que contenga un Artículo Manufacturado.
*
* @param id ID del Artículo Manufacturado al cual se buscaran sus Artículos Insumos.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Insumos.
*/
export async function findByArticuloManufacturado(id: number, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados-insumos/byArticuloManufacturado/${id}`, {
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