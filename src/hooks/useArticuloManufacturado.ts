import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Endpoint } from "../types/Endpoint";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { findById } from "../services/BaseService";

/**
 * Hook personalizado para obtener un Artículo Manufacturado por su ID.
 * @param id ID del Artículo Manufacturado a buscar.
 * @returns Un objeto que contiene el estado del Artículo Manufacturado y la función para actualizarla.
 */
export const useArticuloManufacturado = (id: number) => {
    const [articuloManufacturado, setArticuloManufacturado] = useState<ArticuloManufacturado>({
        "id": 0,
        "denominacion": '',
        "descripcion": '',
        "imagen": '',
        "precioVenta": 0,
        "tiempoEstimadoCocina": '',
        "rubro": {
            "id": 0,
            "denominacion": '',
            "bloqueado": false
        }
    });
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getArticuloManufacturadoById();
    }, [id]);

    const getArticuloManufacturadoById = async () => {
        if (id !== -1) {
            const token = await getAccessTokenSilently();

            const newArticuloManufacturado = await findById<ArticuloManufacturado>(Endpoint.ArticuloManufacturado, id, token);
            setArticuloManufacturado(newArticuloManufacturado);
        }
    };

    return { articuloManufacturado, setArticuloManufacturado };
};