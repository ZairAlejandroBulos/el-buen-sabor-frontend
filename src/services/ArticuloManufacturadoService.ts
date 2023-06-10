import { URL_API_BASE } from "../constants";
import { findImagenByName } from "./ImagenService";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";

/** 
* Obtiene todos los Artículos Manufacturados.
*
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Manufacturados.
*/
export async function findAllArticuloManufacturados(token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/findAll`, {
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
* Obtiene un Artículo Manufacturado por su ID.
*
* @param id ID del Artículo Manufacturado a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en un Artículo Manufacturado.
*/
export async function findArticuloManufacturadoById(id: number, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/${id}`, {
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
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/byTermino/${termino}`, {
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
 * Guarda un nuevo Artículo Manufacturado.
 * 
 * @param entity Artículo Manufacturado a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Manufacturado guardado.
 */
export async function saveArticuloManufacturado(entity: ArticuloManufacturado, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(entity),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza un Artículo Manufacturado existente por su ID.
 * 
 * @param id ID del Artículo Manufacturado a actualizar.
 * @param entity Artículo Manufacturado con los datos actualizados.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Manufacturado actualizado.
 */
export async function updateArticuloManufacturado(id: number, entity: ArticuloManufacturado, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(entity),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Elimina un Artículo Manufacturado por su ID.
 * 
 * @param id ID del Artículo Manufacturado a eliminar.
 * @param token Token de autenticación.
 */
export async function deleteArticuloManufacturado(id: number, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}