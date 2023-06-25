import * as Yup from "yup";

export const validationSchemaUnidadMedida = () => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),
        denominacion: Yup.string()
            .required('La denominación es requerida')
            .max(20, 'Máximo de 20 caracteres')
    });
};