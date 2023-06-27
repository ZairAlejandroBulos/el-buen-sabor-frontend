import { Endpoint } from "../types/Endpoint";
import { findImagenByName, saveImagen } from "./ImagenService";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { ArticuloManufacturadoInsumo } from "../types/ArticuloManufacturadoInsumo";
import { saveDetalles, updateDetalles } from "./ArticuloManufacturadoInsumoService";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/** 
* Obtiene todos los Artículos Manufacturados (Simple).
*
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Manufacturados.
*/
export async function findAllSimpleArticuloManufacturados(token: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturado}/simple`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado[];

        for (const item of data) {
            const newImagenUrl = await findImagenByName(item.imagen, token);
            item.imagen = newImagenUrl || "";
        }
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/** 
* Obtiene un Artículo Manufacturado (Simple) por su ID.
*
* @param id ID del Artículo Manufacturado a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en un Artículo Manufacturado.
*/
export async function findArticuloManufacturadoSimpleById(id: number, token: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturado}/simple/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado;
        const newImagenUrl = await findImagenByName(data.imagen, token);
        data.imagen = newImagenUrl || "";

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/** 
* Obtiene Artículos Manufacturados, buscados por su término.
*
* @param termino Termino de los Artículos Manufacturados a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Manufacturados que coincidan con el término.
*/
export async function findAllArticuloManufacturadosByTermino(termino: string, token: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturado}/byTermino/${termino}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado[];

        for (const item of data) {
            const newImagenUrl = await findImagenByName(item.imagen, token);
            item.imagen = newImagenUrl || "";
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * 
 * @param entity 
 * @param token 
 * @returns 
 */
export async function saveOnlyArticuloManufacturado(entity: ArticuloManufacturado, token: string): Promise<ArticuloManufacturado> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturado}`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json() as ArticuloManufacturado;
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
 * 
 * @param entity 
 * @param token 
 * @returns 
 */
export async function updateOnlyArticuloManufacturado(id: number, entity: ArticuloManufacturado, token: string): Promise<ArticuloManufacturado> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturado}/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json() as ArticuloManufacturado;
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
 * Guarda un nuevo Artículo Manufacturado (con sus dependencias).
 * 
 * @param entity  Artículo Manufacturado a guardar.
 * @param file Imagen a guardar.
 * @param detalles Artículos Insumos a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Manufacturado guardado.
 */
export async function saveArticuloManufacturado(entity: ArticuloManufacturado, file: File, detalles: ArticuloManufacturadoInsumo[], token: string): Promise<ArticuloManufacturado> {
    try {
        // Imagen
        await saveImagen(file, entity.imagen, token);

        // Artículo Manufacturado
        const articuloManufacturado = await saveOnlyArticuloManufacturado(entity, token);

        // Artículos Manufacturados Insumos (Detalles)
        await saveDetalles(detalles, articuloManufacturado, token);

        return articuloManufacturado;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza un Artículo Manufacturado.
 * 
 * @param id ID del Artículo Manufacturado a actualizar.
 * @param entity Artículo Manufacturado a actualizar.
 * @param file Imagen a actualizar.
 * @param detalles Artículos Insumos a guardar/actualizar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Manufacturado actualizado.
*/
export async function updateArticuloManufacturado(id: number, entity: ArticuloManufacturado, file: File, detalles: ArticuloManufacturadoInsumo[], token: string): Promise<ArticuloManufacturado> {
    try {
        // Imagen
        saveImagen(file, entity.imagen, token);

        // Artículo Manufacturado
        const articuloManufacturado = await updateOnlyArticuloManufacturado(id, entity, token);

        // Artículos Manufacturados Insumos (Detalles)
        updateDetalles(detalles, articuloManufacturado, token);

        return articuloManufacturado;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}