import { toast } from "react-toastify";

/**
 * Muestra un mensaje de información utilizando el componente Toast.
 * @param mensaje El mensaje de información a mostrar.
 */
export function toastInfo(mensaje: string) {
    toast.info(mensaje, {
        position: toast.POSITION.TOP_CENTER
    });
}

/**
 * Muestra un mensaje de éxito utilizando el componente Toast.
 * @param mensaje El mensaje de éxito a mostrar.
 */
export function toastExito(mensaje: string) {
    toast.success(mensaje, {
        position: toast.POSITION.TOP_CENTER
    });
}

/**
 * Muestra un mensaje de advertencia utilizando el componente Toast.
 * @param mensaje El mensaje de advertencia a mostrar.
 */
export function toastAdvertencia(mensaje: string) {
    toast.warning(mensaje, {
        position: toast.POSITION.TOP_CENTER
    });
}

/**
 * Muestra un mensaje de error utilizando el componente Toast.
 * @param mensaje El mensaje de error a mostrar.
 */
export function toastError(mensaje: string) {
    toast.error(mensaje, {
        position: toast.POSITION.TOP_CENTER
    });
}