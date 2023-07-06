import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "../components/Layout/NavBar/NavBar";
import { CarritoProvider } from "../context/CarritoContext";
import { DetalleCarrito } from "../components/Usuario/Cart/DetalleCarrito";
const Home = lazy(() => import("../components/Layout/Home/Home"));
const MiPerfil = lazy(() => import ("../components/Usuario/Perfil/MiPerfil"));
const DetalleArticuloManufacturado = lazy(() => import("../components/Usuario/ArticuloManufacturado/DetalleArticuloManufacturado"));
const ListArticuloManufacturado = lazy(() => import("../components/Usuario/ArticuloManufacturado/ListArticuloManufacturado"));

/**
 * Componente de enrutamiento para la sección de Usuario.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de usuario.
 */
function UserRouter(): JSX.Element {
    return (
        <>
            <CarritoProvider>
                <NavBar />
                <Suspense>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/productos">
                            <Route path=":termino" element={<ListArticuloManufacturado />} />
                        </Route>
                        <Route path="/detalle-manufacturado">
                            <Route path=":id" element={<DetalleArticuloManufacturado />} />
                        </Route>
                        <Route path="/carrito-detalle" element={<DetalleCarrito />} />
                        <Route path="/mi-perfil" element={<MiPerfil />} />
                    </Routes>
                </Suspense>
            </CarritoProvider>
        </>
    );
}

export default UserRouter;