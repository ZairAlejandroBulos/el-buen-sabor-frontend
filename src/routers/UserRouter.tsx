import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "../components/Layout/NavBar/NavBar";
const Home = lazy(() => import("../components/Layout/Home/Home"));
const ListArticuloManufacturado = lazy(() => import("../components/Usuario/ArticuloManufacturado/ListArticuloManufacturado"));

/**
 * Componente de enrutamiento para la sección de Usuario.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de usuario.
 */
function UserRouter(): JSX.Element {
    return (
        <>
            <NavBar />
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos/:termino" element={<ListArticuloManufacturado />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default UserRouter;