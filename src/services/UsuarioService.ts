import { URL_API_BASE } from "../constants";
import { Cliente } from "../types/Cliente";


// realiza una solicitud a la API para obtener una lista de clientes según los roles proporcionados. La función recibe un arreglo de roles y un token de autenticación, y devuelve una promesa que se resuelve en un arreglo de objetos Cliente.
export async function findAllClientesByRoles(roles: string[], token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byRoles/${roles.join(",")}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

//solicitudes a la API para buscar clientes por nombre, apellido o una combinación de ambos. Cada función recibe los parámetros correspondientes y devuelve una promesa que se resuelve en un arreglo de objetos Cliente.
export async function findAllClientesByNombre(nombre: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byNombre/${nombre}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllClientesByApellido(apellido: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byApellido/${apellido}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

export async function findAllClientesByNombreAndApellido(nombre: string, apellido: string, token: string): Promise<Cliente[]> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/byNombreAndApellido/${nombre}/${apellido}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as Cliente[];
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}


//Recibe un objeto Cliente y un token de autenticación, y devuelve una promesa que se resuelve en el objeto Cliente guardado en la API.
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


//actualiza un cliente existente en la API. Recibe un ID de cliente, un objeto Cliente con los datos actualizados y un token de autenticación. Devuelve una promesa que se resuelve en el objeto Cliente actualizado.
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

//recibe el ID del cliente que se desea eliminar y un token de autenticación. Utiliza el método fetch con el verbo HTTP DELETE para enviar una solicitud de eliminación a la API.
export async function deleteCliente(id: number, token: string): Promise<void> {
    try {
        const response = await fetch(`${URL_API_BASE}/clientes/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}
