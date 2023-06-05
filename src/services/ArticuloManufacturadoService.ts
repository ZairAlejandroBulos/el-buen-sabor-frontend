import { URL_API_BASE } from "../constants";
import { findImagenByName } from "./ImagenService";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";

// Función para obtener todos los artículos manufacturados
export async function findAllArticuloManufacturados(token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados`, {
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
            const newImagenUrl = await findImagenByName(item.imagen.nombre, token);
            item.imagen.imagenUrl = newImagenUrl || "";
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

// Función para obtener un artículo manufacturado por su ID
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
        const newImagenUrl = await findImagenByName(data.imagen.nombre, token);
        data.imagen.imagenUrl = newImagenUrl || "";

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

// Función para obtener todos los artículos manufacturados que coinciden con un término de búsqueda
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

        // Obtener y asignar la URL de la imagen a cada artículo manufacturado
        for (const item of data) {
            const newImagenUrl = await findImagenByName(item.imagen.nombre, token);
            item.imagen.imagenUrl = newImagenUrl || "";
        }

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

// Función para guardar un artículo manufacturado
export async function saveArticuloManufacturado(articuloManufacturado: ArticuloManufacturado, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articuloManufacturado),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

// Función para actualizar un artículo manufacturado por su ID
export async function updateArticuloManufacturado(id: number, articuloManufacturado: ArticuloManufacturado, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articuloManufacturado),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

// Función para eliminar un artículo manufacturado por su ID
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