const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;


/**
 * Verifica si existe una UnidadMedida por denominación.
 * 
 * @param denominacion Denominación a verificar.
 * @param token Token de autenticación.
 * @returns Una promesa que se resuelve en un boolean.
 */
export async function existsByDenominacion(denominacion: string, token: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/unidad-medida/exists/${denominacion}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(`Error! ${error}`);
    }
}