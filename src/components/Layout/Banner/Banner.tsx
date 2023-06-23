import { Image } from "react-bootstrap";
import banner from "/images/Banner8.png";
import "./Banner.css";

/**
 * Componente que muestra el encabezado de la sección de inicio (Home).
 * @author Castillo
 */
function BannerHome() {
    return (
        <>
            <Image src={banner}
                alt="banner"
                className="d-block w-100 banner-home"
                fluid />
        </>
    )
}

export default BannerHome;