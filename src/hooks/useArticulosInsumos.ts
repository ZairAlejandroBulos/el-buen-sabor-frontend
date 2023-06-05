import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ArticuloInsumo } from "../types/ArticuloInsumo";
import { findAllArticuloInsumo } from "../services/ArticuloInsumoService";

export function useArticulosInsumos() {
    // Estado para almacenar la lista de artículos insumos
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    // Hook de autenticación para obtener el token de acceso
    const { getAccessTokenSilently } = useAuth0();

    // Efecto que se ejecuta una vez al montar el componente
    useEffect(() => {
        getAllArticuloInsumos();
    }, []);

    // Función para obtener todos los artículos insumos
    const getAllArticuloInsumos = async () => {
        // Obtener el token de acceso
        const token = await getAccessTokenSilently();

        // Obtener todos los artículos insumos
        const newArticulosInsumos = await findAllArticuloInsumo(token);
        setArticulosInsumos(newArticulosInsumos);

    }

    // Devolver el estado de los artículos insumos
    return { articulosInsumos };
}