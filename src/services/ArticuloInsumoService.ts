import { URL_API_BASE } from "../constants";
import { ArticuloInsumo } from "../types/ArticuloInsumo";

// Obtener todos los artículos de insumo
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

// Obtener todas las bebidas
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

// Obtener un artículo de insumo por su ID
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

// Guardar un nuevo artículo de insumo
export async function saveArticuloInsumo(articuloManufacturado: ArticuloInsumo, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-insumos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articuloManufacturado),
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

// Actualizar un artículo de insumo existente
export async function updateArticuloInsumo(id: number, articuloInsumo: ArticuloInsumo, token: string) {
    try {
        const response = await fetch(`${URL_API_BASE}/articulos-insumos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(articuloInsumo),
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


// Eliminar un artículo de insumo por su ID
export async function deleteArticuloInsumo(id: number, token: string) {
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