import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderCocinero from "../components/Cocinero/Header/HeaderCocinero";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";

function CocineroRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <HeaderCocinero />
            <Routes>
                <Route path="/rubros" element={<TableRubro />} />
                <Route path="/stock" element={<TableArticuloManufacturado />} />
            </Routes>
        </>
    );
}

export default CocineroRouter;