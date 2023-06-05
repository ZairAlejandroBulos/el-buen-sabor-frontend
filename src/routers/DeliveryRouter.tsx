import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";

// Componente para el enrutamiento de los repartidores
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