import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { findAllArticuloManufacturados, findAllArticuloManufacturadosByTermino } from "../services/ArticuloManufacturadoService";

export function useArticulosManufacturados(termino: string = "all") {
    // Estado para almacenar la lista de artículos manufacturados
    const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
    // Hook de autenticación para obtener el token de acceso
    const { getAccessTokenSilently } = useAuth0();

    // Efecto que se ejecuta cuando cambia el valor de 'termino'
    useEffect(() => {
        getAllArticuloManufacturados();
    }, [termino]);

    // Función para obtener todos los artículos manufacturados
    const getAllArticuloManufacturados = async () => {
        // Obtener el token de acceso
        const token = await getAccessTokenSilently();

        if (termino === "all") {
            // Obtener todos los artículos manufacturados
            const newArticulosManufacturados = await findAllArticuloManufacturados(token);
            setArticulosManufacturados(newArticulosManufacturados);
        } else {
            // Obtener artículos manufacturados por un término de búsqueda específico
            const newArticulosManufacturados = await findAllArticuloManufacturadosByTermino(termino, token);
            setArticulosManufacturados(newArticulosManufacturados);
        }
    }

    // Devolver el estado de los artículos manufacturados
    return { articulosManufacturados };
}