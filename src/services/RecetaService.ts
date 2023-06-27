import { Receta } from "../types/Receta";
import { Endpoint } from "../types/Endpoint";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * 
 * @param id 
 * @param token 
 * @returns 
 */
export async function findRecetaByArticuloManufacturado(id: number, token: string): Promise<Receta> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Receta}/byArticuloManufacturado/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Receta;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}