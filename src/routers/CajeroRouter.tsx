import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";

// Componente para el enrutamiento del cajero
function CajeroRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <Routes>
            </Routes>
        </>
    );
}

export default CajeroRouter;