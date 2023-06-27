import { NavLink } from "react-router-dom";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";

/**
 * Componente que representa un elemento de Artículo Manufacturado en la tabla.
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
                    ${ props.precioVenta }
                </td>

                <td>
                    <NavLink
                        to={`/admin/stock/articulos-manufacturados/form/${props.id}`}
                        className="btn btn-warning"
                    >
                        Editar
                    </NavLink>
                </td>
            </tr>
        </>
    );
}

export default ItemArticuloManufacturado;