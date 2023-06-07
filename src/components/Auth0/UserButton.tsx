import { useAuth0 } from "@auth0/auth0-react";

import "./Button.css";
import { Dropdown, DropdownButton } from "react-bootstrap";

/**
 * Componente que representa un botón de usuario.
 * Se muestra cuando el usuario ha iniciado sesión.
 * @author Bulos
 */
function UserButton(): JSX.Element {
  const { user, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <DropdownButton
      title={user?.name}
      variant="bi bi-person-fill btn btn-light navbar-btn"
    >
      <Dropdown.Item>Perfil</Dropdown.Item>
      <Dropdown.Item>Pedidos</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => handleLogout()} style={{color: "#F94144"}}>Cerrar Sesión</Dropdown.Item>
    </DropdownButton>
  );
}

export default UserButton;