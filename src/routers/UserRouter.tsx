import { Route, Routes } from "react-router-dom";
import Home from "../components/Layout/Home/Home";
import NavBar from "../components/Layout/NavBar/NavBar";
import { ListArticuloManufacturado } from "../components/Usuario/ArticuloManufacturado/ListArticuloManufacturado";

// Componente para enrutar las páginas de usuario
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


/*NavBar: Renderiza la barra de navegación en la parte superior de la página.
Routes: Define las rutas y sus componentes correspondientes.
Route: Define una ruta específica.
path="/" element={<Home />}: La ruta raíz ("/") muestra el componente Home, que es la página de inicio.
path="/productos/:termino" element={<ListArticuloManufacturado />}: La ruta "/productos/:termino" muestra el componente ListArticuloManufacturado,
 que muestra una lista de artículos manufacturados según un término de búsqueda proporcionado.
*/