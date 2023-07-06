import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import NavBarEmpleado from "../components/Layout/NavBar/NavBarEmpleado";
import HeaderAdmin from "../components/Admin/Header/HeaderAdmin";
const TableCliente = lazy(() => import("../components/Admin/Clientes/TableCliente"));
const TableEmpleado = lazy(() => import("../components/Admin/Empleados/TableEmpleado"));
const TableRubro = lazy(() => import("../components/Rubro/TableRubro"));
const TableUnidadMedida = lazy(() => import("../components/UnidadMedida/TableUnidadMedida"));
const TableArticuloManufacturado = lazy(() => import("../components/ArticuloManufacturado/TableArticuloManufacturado"));
const AMArticuloManufacturado = lazy(() => import("../components/ArticuloManufacturado/AMArticuloManufacturado"));
const TableArticuloInsumo = lazy(() => import("../components/ArticuloInsumo/TableArticuloInsumo"));
const AMArticuloInsumo = lazy(() => import("../components/ArticuloInsumo/AMArticuloInsumo"));

/**
 * Componente de enrutamiento para la sección de Administrador.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de Administrador.
 */
function AdminRouter(): JSX.Element {
    return(
        <>
            <NavBarEmpleado />
            <HeaderAdmin />
            <Suspense>
                <Routes>
                    <Route path="/usuarios/clientes" element={<TableCliente />} />
                    <Route path="/usuarios/empleados" element={<TableEmpleado />} />
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
            </Suspense>
        </>
    );
}

export default AdminRouter;