import React, { useState } from "react";

export function useAlert() {
    // Estado para controlar la visibilidad de la alerta
    const [ showAlert, setAlert ] = useState(false);

    // Función para alternar la visibilidad de la alerta
    const handleAlert = () => {
        setAlert(!showAlert);
    };

    // Devolver el estado de la alerta y la función para controlarla
    return { showAlert, handleAlert };
}