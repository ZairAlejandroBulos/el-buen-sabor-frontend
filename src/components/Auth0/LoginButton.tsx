import { useAuth0 } from "@auth0/auth0-react";

import "./Button.css";
import { Button } from "react-bootstrap";

/**
 * Componente que representa un botón de inicio para la barra de navegación.
 * @author Bulos
 */
function LoginButton(): JSX.Element {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button onClick={() => loginWithRedirect() } variant="btn btn-light navbar-btn">
      <i className="bi bi-person"></i>
      <span>Ingresa</span>
    </Button>
  );
}

export default LoginButton;