import { Button } from "react-bootstrap";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";

/**
 * Componente que representa un elemento de ArticuloManufacturado en la tabla.
 * @author Bulos
 */
function ItemArticuloManufacturado(props: ArticuloManufacturado): JSX.Element {
    return(
        <>
            <tr>
                <td>
                    { props.denominacion }
                </td>

                <td>
                    { props.rubro?.denominacion }
                </td>

                <td>
                    { props.tiempoEstimadoCocina }
                </td>

                <td>
                    { props.precioVenta }
                </td>

                <td>
                    {/* TODO: Implementar update */}
                    <Button variant="warning">
                        Editar
                    </Button>
                </td>
            </tr>
        </>
    );
}

export default ItemArticuloManufacturado;