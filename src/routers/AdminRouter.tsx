import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderAdmin from "../components/Admin/Header/HeaderAdmin";
import TableUsuario from "../components/Admin/Usuarios/TableUsuario";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";
import AMArticuloManufacturado from "../components/ArticuloManufacturado/AMArticuloManufacturado";
import TableArticuloInsumo from "../components/ArticuloInsumo/TableArticuloInsumo";
import AMArticuloInsumo from "../components/ArticuloInsumo/AMArticuloInsumo";
import TableUnidadMedida from "../components/UnidadMedida/TableUnidadMedida";

/**
 * Componente de enrutamiento para la sección de Administrador.
 * @returns  Un elemento JSX que representa el enrutamiento de la sección de Administrador.
 */
function AdminRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <HeaderAdmin />
            <Routes>
                <Route path="/usuarios" element={<TableUsuario />} />
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

export default AdminRouter;