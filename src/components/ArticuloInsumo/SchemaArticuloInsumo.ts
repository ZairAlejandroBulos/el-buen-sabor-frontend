import * as Yup from 'yup';
import { validationSchemaUnidadMedida } from '../UnidadMedida/SchemaUnidadMedida';
import { validationSchemaRubro } from '../Rubro/SchemaRubro';

export const validationSchemaArticuloInsumo = () => {
    return Yup.object().shape({
        id: Yup.number()
            .integer()
            .min(0),
        denominacion: Yup.string()
            .required('La denominación es requerida')
            .max(20, 'Máximo de 20 caracteres'),
        esInsumo: Yup.boolean()
            .required('Es un insumo?'),
        unidadMedida: validationSchemaUnidadMedida(),
        precioCompra: Yup.number()
            .required('El precio de costo es requerido')
            .min(0),
        stockMinimo: Yup.number()
            .required('El stock minimo es requerido')
            .min(0),
        stockActual: Yup.number()
            .required('El stock actual es requerido')
            .min(0),
        rubro: validationSchemaRubro()
    })
}
