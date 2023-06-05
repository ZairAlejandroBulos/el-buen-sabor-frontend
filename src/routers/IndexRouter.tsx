import React from "react";
import UserRouter from "./UserRouter";
import AdminRouter from "./AdminRouter";
import CajeroRouter from "./CajeroRouter";
import CocineroRouter from "./CocineroRouter";
import DeliveryRouter from "./DeliveryRouter";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Componente principal para el enrutamiento general
function IndexRouter(): JSX.Element {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<UserRouter />} />
                <Route path="/admin/*" element={<AdminRouter />} />
                <Route path="/cajero/*" element={<CajeroRouter />} />
                <Route path="/cocinero/*" element={<CocineroRouter />} />
                <Route path="/delivery/*" element={<DeliveryRouter />} />
            </Routes>
        </BrowserRouter>
    );
}

export default IndexRouter;


/*
BrowserRouter: Es el componente de enrutamiento principal proporcionado por react-router-dom.
Routes: Define las rutas y sus componentes correspondientes.
Route: Define una ruta específica.
path="*": Esta ruta coincide con cualquier URL que no haya sido manejada previamente. Aquí se define el enrutamiento para los usuarios.
path="/admin/*": Esta ruta coincide con cualquier URL que comienza con "/admin/". Aquí se define el enrutamiento para los administradores.
path="/cajero/*": Esta ruta coincide con cualquier URL que comienza con "/cajero/". Aquí se define el enrutamiento para los cajeros.
path="/cocinero/*": Esta ruta coincide con cualquier URL que comienza con "/cocinero/". Aquí se define el enrutamiento para los cocineros.
path="/delivery/*": Esta ruta coincide con cualquier URL que comienza con "/delivery/". Aquí se define el enrutamiento para los repartidores.
 */