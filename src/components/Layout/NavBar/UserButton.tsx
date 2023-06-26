import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Dropdown } from "react-bootstrap";

/**
 * Componente que muestra un botón de usuario.
 * @author Bulos
 */
function UserButton(): JSX.Element {
    const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return (
        isAuthenticated ? (
            <Dropdown className="navbar-btn-user">
                <Dropdown.Toggle id="dropdown-user" variant="dark" className="me-3">
                    {user?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/mi-perfil">
                        <i className="bi bi-person-lines-fill me-2"></i>
                        <span>Perfil</span>
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to="/mis-pedidos">
                        <i className="bi bi-bag-fill me-2"></i>
                        <span>Mis Pedidos</span>
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item onClick={handleLogout} className="cerrar-sesion">
                        <i className="bi bi-box-arrow-left me-2"></i>
                        <span>Cerrar Sesión</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        ) : (
            <Button onClick={() => loginWithRedirect()} variant="dark" className="text-center me-3">
                <i className="bi bi-person me-2"></i>
                <span>Ingreso</span>
            </Button>
        )
    );
}

export default UserButton;