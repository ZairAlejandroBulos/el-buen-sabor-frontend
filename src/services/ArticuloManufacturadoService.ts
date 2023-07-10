import { Endpoint } from "../types/Endpoint";
import { findImagenByName } from "./ImagenService";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/** 
* Obtiene todos los Artículos Manufacturados (Simple).
*
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Manufacturados.
*/
export async function findAllSimpleArticuloManufacturados(token: string): Promise<ArticuloManufacturado[]> {
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
            const newImagenURL = await findImagenByName(item.imagen, token);
            item.imagenURL = newImagenURL || "";
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
export async function findArticuloManufacturadoSimpleById(id: number, token: string): Promise<ArticuloManufacturado> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturado}/simple/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado;
        const newImagenURL = await findImagenByName(data.imagen, token);
        data.imagenURL = newImagenURL || "";
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
export async function findAllArticuloManufacturadosByTermino(termino: string, token: string): Promise<ArticuloManufacturado[]> {
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
            const newImagenURL = await findImagenByName(item.imagen, token);
            item.imagenURL = newImagenURL || "";
        }
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}


/**
 * Guarda un Artículo Manufacturado.
 * 
 * @param entity Artículo Manufacturado a guardar.
 * @param file Imagen a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Manufacturado guardado.
 */
export async function saveArticuloManufacturado(entity: ArticuloManufacturado, file: File, token: string): Promise<ArticuloManufacturado> {
    try {
        const formData = new FormData();
        formData.append(
            'articuloManufacturado',
            new Blob([JSON.stringify(entity)], {
                type: 'application/json',
            })
        );
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturado}/saveFull`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado;
        return data;
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
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Manufacturado actualizado. 
 */
export async function updateArticuloManufacturado(id: number, entity: ArticuloManufacturado, token: string, file?: File): Promise<ArticuloManufacturado> {
    try {
        const formData = new FormData();
        formData.append(
            'articuloManufacturado',
            new Blob([JSON.stringify(entity)], {
                type: 'application/json',
            })
        );
        if (file && file !== null) formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/${Endpoint.ArticuloManufacturado}/updateFull/${id}`, {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status !== 201) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturado;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}