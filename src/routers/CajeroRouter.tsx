import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";

/**
 * Componente de enrutamiento para la sección de Cajero.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de Cajero.
 */
function CajeroRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <Suspense>
                <Routes>
                </Routes>
            </Suspense>
        </>
    );
}

export default CajeroRouter;