import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Endpoint } from "../types/Endpoint";
import { UnidadMedida } from "../types/UnidadMedida";
import { findAll } from "../services/BaseService";

/**
 * Hook personalizado para obtener una lista de UnidadMedida.
 * @author Castillo
 */
export const useUnidadesMedidas = () => {
    const [unidadesMedidas, setUnidadesMedidas] = useState<UnidadMedida[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllUnidadMedida();
    }, []);

    const getAllUnidadMedida = async () => {
        const token = await getAccessTokenSilently();

        const newUnidadesMedidas = await findAll<UnidadMedida>(Endpoint.UnidadMedida, token);
        setUnidadesMedidas(newUnidadesMedidas);
    };
    
    return { unidadesMedidas };
}