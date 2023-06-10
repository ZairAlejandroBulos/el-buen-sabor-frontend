import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { findAllArticuloManufacturados, findAllArticuloManufacturadosByTermino } from "../services/ArticuloManufacturadoService";

/**
 * Hook personalizado para obtener la lista de Artículos Manufacturados.
 * @param termino Término de búsqueda opcional.
 * @returns Un objeto que contiene la lista de Artículos Manufacturados.
 */
export const useArticulosManufacturados = (termino: string = "all") => {
    const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllArticuloManufacturados();
    }, [termino]);

    /**
     * Función interna para obtener la lista de Artículos Manufacturados, dependiendo el término de búsqueda.
     */
    const getAllArticuloManufacturados = async () => {
        const token = await getAccessTokenSilently();

        let newArticulosManufacturados: ArticuloManufacturado[];

        if (termino === "all") {
            newArticulosManufacturados = await findAllArticuloManufacturados(token);
            setArticulosManufacturados(newArticulosManufacturados);
        } else {
            newArticulosManufacturados = await findAllArticuloManufacturadosByTermino(termino, token);
            setArticulosManufacturados(newArticulosManufacturados);
        }
    };

    return { articulosManufacturados };
}