import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Base } from "../types/Base"
import { Endpoint } from "../types/Endpoint";
import { findAll } from "../services/BaseService";

/**
 * Hook personalizado para obtener todas las entidades de un endpoint específico.
 * @param endpoint Endpoint de la API para la entidad deseada.
 * @returns  Un objeto que contiene el estado de las entidades.
 */
export const useEntities = <T extends Base>(endpoint: Endpoint) => {
    const [entities, setEntities] = useState<T[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const token = await getAccessTokenSilently();

        const newEntities = await findAll<T>(endpoint, token);
        setEntities(newEntities);
    };

    return { entities };
};