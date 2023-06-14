import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderCocinero from "../components/Cocinero/Header/HeaderCocinero";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";
import AMArticuloManufacturado from "../components/ArticuloManufacturado/AMArticuloManufacturado";

/**
 * Componente de enrutamiento para la sección de Cocinero.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de Cocinero.
 */
function CocineroRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <HeaderCocinero />
            <Routes>
                <Route path="/rubros" element={<TableRubro />} />
                <Route path="/stock/articulos-manufacturados" element={<TableArticuloManufacturado />} />
                <Route path="/stock/articulos-manufacturados/form">
                    <Route path=":id" element={<AMArticuloManufacturado />} />
                </Route>
            </Routes>
        </>
    );
}

export default CocineroRouter;