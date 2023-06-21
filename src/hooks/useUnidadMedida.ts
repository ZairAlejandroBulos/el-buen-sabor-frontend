import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Endpoint } from "../types/Endpoint";
import { UnidadMedida } from "../types/UnidadMedida";
import { findById } from "../services/BaseService";

export const useUnidadMedida = (id: number) => {
    const [unidadMedida, setUnidadMedida] = useState<UnidadMedida>({ 'id': 0, 'denominacion': '' });
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getUnidadMedidaById();
    }, [id]);

    const getUnidadMedidaById = async () => {
        if (id !== -1 ) {
            const token = await getAccessTokenSilently();

            const newUnidadMedid = await findById<UnidadMedida>(Endpoint.UnidadMedida, id, token);
            setUnidadMedida(newUnidadMedid);
        }
    };

    return { unidadMedida, setUnidadMedida };
};