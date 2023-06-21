import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { findAllSimpleArticuloManufacturados, findAllArticuloManufacturadosByTermino } from "../services/ArticuloManufacturadoService";

/**
 * Hook personalizado para obtener la lista de Artículos Manufacturados (Simple).
 * @param termino Término de búsqueda opcional.
 * @returns Un objeto que contiene la lista de Artículos Manufacturados.
 */
export const useArticulosManufacturadosSimple = (termino: string = "all") => {
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
            newArticulosManufacturados = await findAllSimpleArticuloManufacturados(token);
            setArticulosManufacturados(newArticulosManufacturados);
        } else {
            newArticulosManufacturados = await findAllArticuloManufacturadosByTermino(termino, token);
            setArticulosManufacturados(newArticulosManufacturados);
        }
    };

    return { articulosManufacturados };
}