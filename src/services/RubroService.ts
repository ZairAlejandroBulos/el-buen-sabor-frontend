import { URL_API_BASE } from "../constants";
import Rubro from "../types/Rubro";

export async function findAllRubro(): Promise<Rubro[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Rubro[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllParents(): Promise<Rubro[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros/parents`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Rubro[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findRubroById(id: number): Promise<Rubro> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Rubro;
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function saveRubro(entity: Rubro): Promise<Rubro> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Rubro;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function updateRubro(id: number, entity: Rubro): Promise<Rubro> {
    try {
        const response = await fetch(`${URL_API_BASE}/rubros/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json'
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Rubro;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}