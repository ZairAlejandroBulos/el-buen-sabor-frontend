import { Endpoint } from "../types/Endpoint";
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

/**
 * Busca una Imagen por su nombre y devuelve su URL.
 * 
 * @param nombre Nombre de la Imagen a buscar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un string que representa la URL de la Imagen.
 */
export async function findImagenByName(nombre: string, token: string): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Imagen}/byName/${nombre}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.blob();
        const imagenUrl = URL.createObjectURL(data);

        return imagenUrl;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}


/**
 * Guarda una nueva Imagen.
 * 
 * @param file Archivo de Imagen a guardar.
 * @param nombre Nombre original de la Imagen.
 * @param token Token de autenticación.
 */
export async function saveImagen(file: File, nombre: string, token: string): Promise<void> {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${API_BASE_URL}/${Endpoint.Imagen}/${nombre}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status !== 204) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}