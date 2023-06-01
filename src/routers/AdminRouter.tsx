import { Route, Routes } from "react-router-dom";
import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderAdmin from "../components/Admin/Header/HeaderAdmin";
import TableUsuario from "../components/Admin/Usuarios/TableUsuario";
import TableRubro from "../components/Rubro/TableRubro";
import TableArticuloManufacturado from "../components/ArticuloManufacturado/TableArticuloManufacturado";

function AdminRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <HeaderAdmin />
            <Routes>
                <Route path="/usuarios" element={<TableUsuario />} />
                <Route path="/rubros" element={<TableRubro />} />
                <Route path="/stock" element={<TableArticuloManufacturado />} />
            </Routes>
        </>
    );
}

export default AdminRouter;