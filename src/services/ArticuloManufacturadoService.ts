import { URL_API_BASE } from "../constants";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";

export async function findAllArticuloManufacturados(token: string): Promise<ArticuloManufacturado[]> {
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
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllArticuloManufacturadosByTermino(termino: string, token: string): Promise<ArticuloManufacturado[]> {
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
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findArticuloManufacturadoById(id: number, token: string): Promise<ArticuloManufacturado> {
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
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}