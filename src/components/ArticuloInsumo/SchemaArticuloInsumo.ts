import * as Yup from 'yup';

export const validationSchemaArticuloInsumo = () => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),
        denominacion: Yup.string()
            .required('La Denominación es requerida')
            .max(20, 'Máximo de 20 catacteres')
            .trim(),
        esInsumo: Yup.boolean()
            .required('¿Es un Insumo?'),
        unidadMedida: Yup.object().shape({
            id: Yup.number()
                .integer()
                .min(0),
            denominacion: Yup.string()
                .required('La Denominación es requerida')
                .max(20, 'Máximo de 20 catacteres')
                .trim() 
        }).required('Debe seleccionar una Unidad de Medida'),
        rubro: Yup.object().shape({
            id: Yup.number()
                .integer()
                .min(0),
            denominacion: Yup.string()
                .required('La denominación es requerida')
                .max(20, 'Máximo de 20 catacteres')
                .trim(),
            bloqueado: Yup.boolean()
                .nullable(),
            esInsumo: Yup.boolean()
                .nullable()
        }).required('Debe seleccionar un Rubro'),
        precioCompra: Yup.number()
            .min(0)
            .required('El Precio de Compra es requerido'),
        stockMinimo: Yup.number()
            .min(0)
            .required('El Stock Mínimo es requerido'),
        stockActual: Yup.number()
            .min(0)
            .required('El Stock Actual es requerido'),
    })
};