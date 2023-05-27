import { URL_API_BASE } from "../constants";
import Cliente from "../types/Cliente";

export async function findAllClientes() {
    // Busqueda rol = cliente
}

export async function findAllEmpleados() {
    // Busqueda rol = empleado 
}

export async function findAllClientesById(id: number) {
    // Busqueda id = ?. El rol no importa
}
export async function saveCliente(entity: Cliente, token: string): Promise<Cliente> {
    try {
        const response = await fetch(`${URL_API_BASE} / clientes`, {
            method: "POST",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Cliente;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function updateCliente(id: number, entity: Cliente, token: string): Promise<Cliente> {
    try {
        const response = await fetch(`${URL_API_BASE} / clientes/${id}}`, {
            method: "PUT",
            body: JSON.stringify(entity),
            headers: {
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 201) {
            const data = await response.json() as Cliente;
            return data;
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function deleteCliente(id: number) {

}
