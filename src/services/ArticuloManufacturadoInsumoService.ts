import { Endpoint } from "../types/Endpoint";
import { save, update } from "./BaseService";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { ArticuloManufacturadoInsumo } from "../types/ArticuloManufacturadoInsumo";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/** 
* Obtiene una lista de Artículos Insumos que contenga un Artículo Manufacturado.
*
* @param id ID del Artículo Manufacturado al cual se buscaran sus Artículos Insumos.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Insumos.
*/
export async function findByArticuloManufacturado(id: number, token: string): Promise<ArticuloManufacturadoInsumo[]> {
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

/**
 * Guarda una lista de Artículos Manufacturados Insumos.
 * 
 * @param entities Artículos Manufacturados Insumos a guardar.
 * @param articuloManufacturadoId ID del Artículo Manufacturado.
 * @param token Token de autenticación.
 */
export async function saveDetalles(entities: ArticuloManufacturadoInsumo[], articuloManufacturado: ArticuloManufacturado, token: string): Promise<void> {
    try {
        await Promise.all(entities.map(async (detalle: ArticuloManufacturadoInsumo) => {
            detalle.articuloManufacturado.id = articuloManufacturado.id;
            
            await save<ArticuloManufacturadoInsumo>(Endpoint.ArticuloManufacturadoInsumo, detalle, token);
        }));
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza una lista de Artículos Manufacturados Insumos.
 * 
 * @param entities Artículos Manufacturados Insumos a actualizar.
 * @param articuloManufacturadoId ID del Artículo Manufacturado.
 * @param token Token de autenticación.
 */
export async function updateDetalles(entities: ArticuloManufacturadoInsumo[], articuloManufacturado: ArticuloManufacturado, token: string): Promise<void> {
    try {
        await Promise.all(entities.map(async (detalle: ArticuloManufacturadoInsumo) => {
            detalle.articuloManufacturado.id = articuloManufacturado.id;
            
            if (detalle.id === 0) {
                await save<ArticuloManufacturadoInsumo>(Endpoint.ArticuloManufacturadoInsumo, detalle, token);
            } else {
                await update<ArticuloManufacturadoInsumo>(Endpoint.ArticuloManufacturadoInsumo, detalle.id, detalle, token);
            }
        }));
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}