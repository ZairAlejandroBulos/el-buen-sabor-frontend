import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

import { ArticuloInsumo } from "../types/ArticuloInsumo";
import { findAllArticuloInsumo } from "../services/ArticuloInsumoService";

/**
 * Hook personalizado para obtener la lista de Artículos Insumos.
 * @returns Un objeto que contiene la lista de Artículos Insumos.
 */
export const useArticulosInsumos = () => {
    const [articulosInsumos, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllArticuloInsumos();
    }, []);

    const getAllArticuloInsumos = async () => {
        const token = await getAccessTokenSilently();

        const newArticulosInsumos = await findAllArticuloInsumo(token);
        setArticulosInsumos(newArticulosInsumos);
    };

    return { articulosInsumos };
};