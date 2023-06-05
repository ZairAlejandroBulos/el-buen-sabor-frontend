import { useAuth0 } from "@auth0/auth0-react";

const { getAccessTokenSilently } = useAuth0();
const AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE as string;
const API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL as string;

//realiza una llamada a una API pública. Utiliza la función fetch para hacer una solicitud GET a la URL ${API_BASE_URL} y espera la respuesta. Luego, convierte la respuesta en formato JSON y muestra el mensaje contenido en la respuesta en un cuadro de diálogo (alert).
export const callPublicApi = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert("Error");
    }
};

//realiza una llamada a una API privada que requiere autenticación. Primero, utiliza getAccessTokenSilently para obtener el token de acceso de forma segura, proporcionando el valor de AUDIENCE como parámetro. Luego, utiliza la función fetch para realizar una solicitud GET a la URL ${API_BASE_URL}/private, incluyendo el token de acceso en los encabezados de autorización. 
export const callPrivateApi = async () => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: AUDIENCE,
            },
        });

        const response = await fetch(`${API_BASE_URL}/private`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert("Error");
    }
};

//realiza una llamada a una API que requiere privilegios de administrador. Al igual que callPrivateApi, obtiene el token de acceso utilizando getAccessTokenSilently, especificando AUDIENCE como parámetro.
export const callAdminApi = async () => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: AUDIENCE,
            },
        });

        const response = await fetch(`${API_BASE_URL}/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await response.json();
        alert(data.message);
    } catch (error) {
        alert("Error");
    }
};