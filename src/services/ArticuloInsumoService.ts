import { URL_API_BASE } from "../constants";
import { ArticuloInsumo } from "../types/ArticuloInsumo";

/** 
* Obtiene todos los Artículos Insumos.
*
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Insumos.
*/
export async function findAllArticuloInsumo(token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-insumos`, {
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

/** 
* Obtiene una lista de Artículos Insumos que sean bebidas.
*
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en una lista de Artículos Insumos que sean bebidas.
*/
export async function findBebidas(token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-insumos/bebidas`, {
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

/** 
* Obtiene un Articulo Insumo por su ID.
*
* @param id ID del Articulo Insumo a buscar.
* @param token Token de autenticación.
* @returns Una promesa que se resuelve en un Artículo Insumo.
*/
export async function findArticuloInsumoById(id: number, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-insumos/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloInsumo;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

/**
 * Guarda un nuevo Artículo Insumo.
 * 
 * @param entity Artículo Insumo a guardar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Insumo guardado.
 */
export async function saveArticuloInsumo(entity: ArticuloInsumo, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-insumos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(entity),
        });

        if (response.status === 201) {
            const data = await response.json() as ArticuloInsumo;
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
 * Actualiza un Artículo Insumo existente por su ID.
 * 
 * @param id ID del Artículo Insumo a actualizar.
 * @param entity Artículo Insumo con los datos actualizados.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en el Artículo Insumo actualizado.
 */
export async function updateArticuloInsumo(id: number, entity: ArticuloInsumo, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-insumos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(entity),
        });

        if (response.status === 201) {
            const data = await response.json() as ArticuloInsumo;
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
 * Elimina un Artículo Insumo por su ID.
 * 
 * @param id ID del Artículo Insumo a eliminar.
 * @param token Token de autenticación.
 */export async function deleteArticuloInsumo(id: number, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-insumos/${id}`, {
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