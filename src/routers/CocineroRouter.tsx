import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderCocinero from "../components/Cocinero/Header/HeaderCocinero";
import TableRubro from "../components/Rubro/TableRubro";

function CocineroRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <HeaderCocinero />
            <Routes>
                <Route path="/rubros" element={<TableRubro />} />
            </Routes>
        </>
    );
}

export default CocineroRouter;