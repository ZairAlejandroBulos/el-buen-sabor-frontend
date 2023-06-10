import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderAdmin from "../components/Admin/Header/HeaderAdmin";
import TableUsuario from "../components/Admin/Usuarios/TableUsuario";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";

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
                <Route path="/stock/articulos-manufacturados" element={<TableArticuloManufacturado />} />
            </Routes>
        </>
    );
}

export default AdminRouter;