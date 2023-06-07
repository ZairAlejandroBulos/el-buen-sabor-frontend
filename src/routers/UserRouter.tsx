import { Route, Routes } from "react-router-dom";
import Home from "../components/Layout/Home/Home";
import NavBar from "../components/Layout/NavBar/NavBar";
import { ListArticuloManufacturado } from "../components/Usuario/ArticuloManufacturado/ListArticuloManufacturado";

/**
 * Componente de enrutamiento para la sección de Usuario.
 * @returns Un elemento JSX que representa el enrutamiento de la sección de usuario.
 */
function UserRouter(): JSX.Element {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos/:termino" element={<ListArticuloManufacturado />} />
            </Routes>
        </>
    );
}

export default UserRouter;