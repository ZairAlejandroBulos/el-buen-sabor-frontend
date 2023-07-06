import "./Pefil.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

interface Props {
    usuario: string;
    handleLogout: () => void;
}

/**
 * Componente del panel de perfil.
 * @author Bulos 
 */
function Panel({ usuario, handleLogout }: Props): JSX.Element {
    return (
        <Container className="border d-flex flex-column justify-content-between container-panel">
            <div className="d-flex flex-column align-items-center mt-4">
                <img
                    src="https://static.vecteezy.com/system/resources/previews/007/033/146/original/profile-icon-login-head-icon-vector.jpg"
                    alt="mi-perfil"
                    className="rounded-circle"
                    style={{ maxHeight: "100px" }}
                />
                <p className="mt-3 mb-1 fw-bold fs-5">{ usuario }</p>
            </div>
            <Link to="/mi-perfil" className="m-0 p-2 border-top border-dark">
                Mis datos personales
            </Link>
            <Link to="/mis-pedidos" className="m-0 p-2 border-top border-dark">
                Mis pedidos
            </Link>
            <Link to="#" onClick={handleLogout} className="m-0 p-2 border-top border-dark">
                Cerrar Sesión
            </Link>
        </Container>
    );
}

export default Panel;