import { useState } from "react";
import { ToastContainer } from "react-toastify";
import IndexRouter from "./routers/IndexRouter";
import Footer from "./components/Layout/Footer/Footer";
import EmpleadoLogin from "./components/Empleado/EmpleadoLogin";

import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [firstLogin, setFirstLogin] = useState(() => {
        const storageFirstLogin = localStorage.getItem('firstLogin');
        return storageFirstLogin !== null ? JSON.parse(storageFirstLogin) : true;
    });

    return (
        <>
            <ToastContainer />
            { firstLogin ? <EmpleadoLogin firstLogin={firstLogin} setFirstLogin={setFirstLogin} /> : null }
            <IndexRouter />
            <Footer />
        </>
    );
}

export default App;