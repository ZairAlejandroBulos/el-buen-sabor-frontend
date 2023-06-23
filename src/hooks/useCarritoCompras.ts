import { useArticulosManufacturadosSimple } from "./useArticulosManufacturadosSimple";

/**
 * Hook personalizado para obtener un item del Carrito de Compras.
 * @param id ID del ArticuloManufacutrado a buscar.
 * @returns Un objeto que contiene el los datos del ArticuloManufacturado dependiendo de su id.
 */
export const useCarritoCompras = (id: number) => {
    const { articulosManufacturados } = useArticulosManufacturadosSimple()
    const item = articulosManufacturados.find(i => i.id === id)
    if (item == null) return null

    return {item};
};