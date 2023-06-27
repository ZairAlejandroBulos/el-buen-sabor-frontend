import * as Yup from "yup";
import { validationSchemaRubro } from "../Rubro/SchemaRubro";

export const validationSchemaArticuloManufacturado = () => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),
        denominacion: Yup.string()
            .required('La Denominación es requerida')
            .trim(),
        descripcion: Yup.string()
            .required('La Descripción es requerida')
            .trim(),
        tiempoEstimadoCocina: Yup.string()
            .required('El Tiempo Estimado en Cocina es requerido')
            .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, 'Formato inválido. Debe ser HH:mm:ss')
            .trim(),
        precioVenta: Yup.number()
            .required('El Precio de Venta es requerido')
            .positive('El Precio de Venta debe ser un valor positivo'),
        imagen: Yup.string()
            .required('La Imagen es requerida')
            .trim(),
        receta: Yup.string()
            .required('La Receta es requerida')
            .trim(),
        rubro: validationSchemaRubro()
    });
};