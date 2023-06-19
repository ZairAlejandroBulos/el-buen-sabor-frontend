import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Rubro } from "../types/Rubro";
import { findAllRubro } from "../services/RubroService";

/**
 * Hook personalizado para obtener una lista de Rubro.
 * @author Bulos
 */
export const useRubros = () => {
    const [rubros, setRubros] = useState<Rubro[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllRubros();
    }, []);

    const getAllRubros = async () => {
        const token = await getAccessTokenSilently();
        
        const newRubros = await findAllRubro(token);
        setRubros(newRubros);
    };

    return { rubros };
};