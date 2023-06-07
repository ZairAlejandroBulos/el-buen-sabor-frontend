import { Button } from "react-bootstrap";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import ModalArticuloInsumo from "./ModalArticuloInsumo";
import { useModal } from "../../hooks/useModal";

/**
 * Componente que representa un elemento de Artículo Insumo en la lista.
 * @author Castillo
 */
function ItemArticuloInsumo(props: ArticuloInsumo): JSX.Element {
    const { showModal, handleClose } = useModal();

    return (
        <>
            <tr>
                <td>
                    {props.denominacion}
                </td>
                <td>
                    ${props.articuloInsumoPrecioCompra.monto}
                </td>
                <td>
                    {props.articuloInsumoStockMinimo.stockMinimo}
                </td>
                <td>
                    {props.articuloInsumoStockActual.stockActual}
                </td>
                <td>
                    {props.unidadMedida.denominacion}
                </td>
                <td>
                    <Button onClick={() => handleClose()} variant="warning">
                        Modificar
                    </Button>
                </td>
                <td>
                    <Button variant="danger">
                        Comprar
                    </Button>
                </td>
            </tr>
            {/*<ModalArticuloInsumo
                showModal={showModal}
                handleClose={handleClose}
                articuloInsumo={props}
            />
            */}
        </>
    );
}
export default ItemArticuloInsumo;