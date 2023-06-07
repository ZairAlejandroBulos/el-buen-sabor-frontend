import { Button } from "react-bootstrap";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";

/**
 * Componente que representa un elemento de ArticuloManufacturado en la tabla.
 * @author 
 */
function ItemArticuloManufacturado(props: ArticuloManufacturado): JSX.Element {
    return(
        <>
            <tr>
                <td>
                    { props.denominacion }
                </td>

                <td>
                    {/* TODO: Mostrar Rubro */}
                    -
                </td>

                <td>
                    {/* TODO: Manejar tiempoEstimadoCocina como Date */}
                    { props.tiempoEstimadoCocina }
                </td>

                <td>
                    { props.articuloManufacturadoPrecioVenta.precioVenta }
                </td>

                <td>
                    {/* TODO: Implementar update */}
                    <Button variant="warning">
                        Editar
                    </Button>
                </td>

                <td>
                    {/* TODO: Implementar delete */}
                    <Button variant="danger">
                        Eliminar
                    </Button>
                </td>
            </tr>
        </>
    );
}

export default ItemArticuloManufacturado;