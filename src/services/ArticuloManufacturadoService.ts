import { Endpoint } from "../types/Endpoint";
import { findImagenByName } from "./ImagenService";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/** 
* Obtiene todos los Artículos Manufacturados.
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
* Obtiene un Artículo Manufacturado por su ID.
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
 * Guarda un nuevo ArticuloManufacturado.
 * 
 * @param entity ArticuloManufacturado a guardar.
 * @param file Imagen a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el ArticuloManufacturado guardado.
 */
export async function saveArticuloManufacturado(entity: ArticuloManufacturado, file: File, token: string): Promise<ArticuloManufacturado> {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const responseImagen = await fetch(`${API_BASE_URL}/${Endpoint.Imagen}/${entity.imagen}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        if (responseImagen.status === 204) {
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
                throw new Error(`HTTP error! status: ${responseImagen.status}`);
            }
        } else {
            throw new Error(`HTTP error! status: ${responseImagen.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Actualiza un ArticuloManufacturado.
 * 
 * @param id ID del ArticuloManufacturado a actualizar.
 * @param entity ArticuloManufacturado a actualizar.
 * @param file Imagen a actualizar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el ArticuloManufacturado actualizado.
 */
export async function updateArticuloManufacturado(id: number, entity: ArticuloManufacturado, file: File, token: string): Promise<ArticuloManufacturado> {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const responseImagen = await fetch(`${API_BASE_URL}/${Endpoint.Imagen}/${entity.imagen}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        if (responseImagen.status === 204) {
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
                throw new Error(`HTTP error! status: ${responseImagen.status}`);
            }
        } else {
            throw new Error(`HTTP error! status: ${responseImagen.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}