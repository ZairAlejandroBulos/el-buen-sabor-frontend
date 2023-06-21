import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Endpoint } from "../types/Endpoint";
import { ArticuloManufacturado } from "../types/ArticuloManufacturado";
import { findAll } from "../services/BaseService";

/**
 * 
 */
export const useArticulosManufacturados = () => {
    const [articulosManufacturados, setArticulosManufacturados] = useState<ArticuloManufacturado[]>([]);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAllArticuloManufacturados();
    }, []);

    const getAllArticuloManufacturados = async () => {
        const token = await getAccessTokenSilently();

        const newArticulosManufacturados = await findAll<ArticuloManufacturado>(Endpoint.ArticuloManufacturado, token);
        setArticulosManufacturados(newArticulosManufacturados);
    };

    return { articulosManufacturados };
};