import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { ArticuloManufacturadoInsumo } from "../types/ArticuloManufacturadoInsumo";
import { findByArticuloManufacturado } from "../services/ArticuloManufacturadoInsumoService";

/**
 * Hook personalizado para obtener una lista de Artículos Manufacturados Insumos.
 * @param id ID del Artículo Manufacturado.
 */
export const useArticulosManufacturadosInsumos = (id: number) => {
    const [articulosManufacturadosInsumos, setArticulosManufacturadosInsumos] = useState<ArticuloManufacturadoInsumo[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getByArticuloManufacturadoId();
    }, [id]);

    const getByArticuloManufacturadoId = async () => {
        const token = await getAccessTokenSilently();

        const newArticulosManufacturadosInsumos = await findByArticuloManufacturado(id, token);
        setArticulosManufacturadosInsumos(newArticulosManufacturadosInsumos);
    };

    return { articulosManufacturadosInsumos };
};