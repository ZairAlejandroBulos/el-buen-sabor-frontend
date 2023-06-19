import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { UnidadMedida } from "../types/UnidadMedida";
import { findAll } from "../services/BaseService";

/**
 * Hook personalizado para obtener una lista de UnidadMedida.
 * @author Castillo
 */
export const useUnidadMedida = () => {
    const [unidadMedida, setUnidadMedida] = useState<UnidadMedida[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllUnidadMedida();
    }, []);

    const getAllUnidadMedida = async () => {
        const token = await getAccessTokenSilently();

        const newUnidadMedida = await findAll<UnidadMedida>('unidad-medida', token);
        setUnidadMedida(newUnidadMedida);
    };

    
    return { unidadMedida };
}