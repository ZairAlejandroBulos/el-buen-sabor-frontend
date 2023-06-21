import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Endpoint } from "../types/Endpoint";
import { ArticuloInsumo } from "../types/ArticuloInsumo";
import { findById } from "../services/BaseService";

/**
 * 
 * @param id 
 */
export const useArticuloInsumo = (id: number) => {
    const [articuloInsumo, setArticuloInsumo] = useState<ArticuloInsumo>({
        "id": 0,
        "denominacion": '',
        "esInsumo": true,
        "unidadMedida": {
            "id": 0,
            "denominacion": ''
        },
        "precioCompra": 0,
        "stockMinimo": 0,
        "stockActual": 0,
        "rubro": {
            "id": 0,
            "denominacion": '',
            "bloqueado": false
        }
    });
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getArticuloInsumoById();
    }, [id]);

    const getArticuloInsumoById = async () => {
        if (id !== -1) {
            const token = await getAccessTokenSilently();

            const newArticuloInsumo = await findById<ArticuloInsumo>(Endpoint.ArticuloInsumo, id, token);
            setArticuloInsumo(newArticuloInsumo);
        }
    };

    return { articuloInsumo, setArticuloInsumo };
};