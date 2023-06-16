import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderCocinero from "../components/Cocinero/Header/HeaderCocinero";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";
import AMArticuloManufacturado from "../components/ArticuloManufacturado/AMArticuloManufacturado";
import TableUnidadMedida from "../components/UnidadMedida/TableUnidadMedida";
import AMArticuloInsumo from "../components/ArticuloInsumo/AMArticuloInsumo";
import TableArticuloInsumo from "../components/ArticuloInsumo/TableArticuloInsumo";

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
                <Route path="/unidad-medida" element={<TableUnidadMedida />} />
                <Route path="/stock/articulos-manufacturados" element={<TableArticuloManufacturado />} />
                <Route path="/stock/articulos-manufacturados/form">
                    <Route path=":id" element={<AMArticuloManufacturado />} />
                </Route>
                <Route path="/stock/articulos-insumos" element={<TableArticuloInsumo />} />
                <Route path="/stock/articulos-insumos/form">
                    <Route path=":id" element={<AMArticuloInsumo />} />
                </Route>
            </Routes>
        </>
    );
}

export default CocineroRouter;