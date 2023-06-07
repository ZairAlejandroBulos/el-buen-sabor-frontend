import { useState } from "react";

/**
 * Hook personalizado para manejar el estado de una alerta en validaciones.
 * @returns Un objeto con el estado de la alerta y una función para invertir el estado.
 */
export const useAlert = () => {
    const [ showAlert, setAlert ] = useState(false);

    const handleAlert = () => {
        setAlert(!showAlert);
    };

    return { showAlert, handleAlert };
}