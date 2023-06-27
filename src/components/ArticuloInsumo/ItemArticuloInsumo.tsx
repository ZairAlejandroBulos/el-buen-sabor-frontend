import { Button } from "react-bootstrap";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { NavLink } from "react-router-dom";

/**
 * Componente que representa un elemento de Artículo Insumo en la lista.
 * @author Castillo
 */
function ItemArticuloInsumo(props: ArticuloInsumo): JSX.Element {
    return (
        <>
            <tr>
                <td>
                    {props.denominacion}
                </td>
                <td>
                    {props.rubro?.denominacion}
                </td>
                <td>
                    ${props.precioCompra}
                </td>
                <td>
                    {props.stockMinimo}
                </td>
                <td>
                    {props.stockActual}
                </td>
                <td>
                    {props.unidadMedida?.denominacion}
                </td>
                <td>
                    <NavLink
                        to={'/admin/stock/articulos-insumos/form/' + props.id}
                        className="btn btn-warning"
                    >
                        Editar
                    </NavLink>
                </td>
                <td>
                    <Button variant="danger">
                        Comprar
                    </Button>
                </td>
            </tr>
        </>
    );
}
export default ItemArticuloInsumo;