import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import Home from "../../Layout/Home/Home";
import { ArticuloManufacturado } from "../../../types/ArticuloManufacturado";
import { ItemArticuloManufacturado } from "./ItemArticuloManufacturado";
import { useArticulosManufacturados } from "../../../hooks/useArticulosManufacturados";

export function ListArticuloManufacturado() {
    // Obtener el parámetro de la URL
    const { termino } = useParams<string>();
    // Obtener los artículos manufacturados mediante el hook personalizado
    const { articulosManufacturados } = useArticulosManufacturados(termino);

    // Renderizar la lista de artículos manufacturados
    // Si hay artículos manufacturados, mostrarlos
    // Si no hay artículos manufacturados, mostrar un mensaje de búsqueda vacía
    return (
        <>
            <Home />

            <Container fluid="md" className="mt-3" style={{ height: "100vh" }}>
                <Row>
                    {
                        articulosManufacturados.length !== 0
                            ?
                            (
                                articulosManufacturados.map((item: ArticuloManufacturado, index: number) =>
                                    <ItemArticuloManufacturado key={index}
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
