import { URL_API_BASE } from "../constants";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";

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
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

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
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

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
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

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