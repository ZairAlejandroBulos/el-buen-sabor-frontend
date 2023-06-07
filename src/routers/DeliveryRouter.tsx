import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";

/**
 * Componente de enrutamiento para la sección de Delevery.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de Delivery.
 */
function DeliveryRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <Routes>
            </Routes>
        </>
    );
}

export default DeliveryRouter;