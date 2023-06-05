import { URL_API_BASE } from "../constants";
import { ArticuloManufacturadoInsumo } from "../types/ArticuloManufacturadoInsumo";


//realiza una solicitud GET a la API para obtener los insumos asociados a un artículo manufacturado. La función toma el ID del artículo manufacturado y el token de autenticación como parámetros.
export async function findByArticuloManufacturado(id: number, token: string) {
    try {
        //${URL_API_BASE} es la URL base de la API y id es el ID del artículo manufacturado.
        const response = await fetch(`${URL_API_BASE}/articulos-manufacturados-insumos/byArticuloManufacturado/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as ArticuloManufacturadoInsumo[];
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}

//La función verifica si la respuesta de la solicitud es exitosa (código de estado 200)
//y luego convierte los datos de la respuesta en un array de objetos ArticuloManufacturadoInsumo.
//Finalmente, devuelve los datos obtenidos. Si ocurre algún error, se captura y se lanza una excepción con un mensaje de error.