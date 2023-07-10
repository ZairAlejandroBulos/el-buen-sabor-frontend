import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Home from "../../Layout/Home/Home";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import ItemArticuloManufacturado from "./ItemArticuloManufacturado";
import { useArticulosManufacturadosSearch } from "../../../hooks/useArticulosManufacturadosSearch";

/**
 * Componente que muestra una lista de Artículos Manufacturados.
 * @author Castillo
 */
function ListArticuloManufacturado(): JSX.Element {
    const { termino } = useParams<string>();
    const { articulosManufacturados } = useArticulosManufacturadosSearch(termino);

    return (
        <>
            <Home />

            <Container fluid="md" className="mt-1 mb-1" >
                <Row>
                    {
                        articulosManufacturados.length !== 0
                            ?
                            (
                                articulosManufacturados.map((item: ArticuloManufacturado) =>
                                    <ItemArticuloManufacturado 
                                        key={item.id}
                                        {...item}
                                    />
                                )
                            )
                            : (
                                <p>
                                    No se encontraron productos para la búsqueda "{termino}"
                                </p>
                            )}
                </Row>
            </Container>
        </>
    );
}

export default ListArticuloManufacturado;