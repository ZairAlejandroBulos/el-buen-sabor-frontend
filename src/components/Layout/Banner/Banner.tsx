import { Image } from "react-bootstrap";

/**
 * Componente que muestra el encabezado de la sección de inicio (Home).
 * @author Castillo
 */
function BannerHome(): JSX.Element {
    return (
        <Image 
            src="/images/banner.png"
            alt="banner"
            fluid 
            className="d-block w-100"
        />
    );
}

export default BannerHome;