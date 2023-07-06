import { Col, Row } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import Panel from "./Panel";
import MiCuenta from "./MiCuenta";
import { useCliente } from "../../../hooks/useCliente";

/**
 * Componente de la página Mi Perfil
 * @author Bulos 
 */
function MiPerfil(): JSX.Element {
    const { user, logout } = useAuth0();
    const { cliente } = useCliente(undefined, user?.sub);

    const handleLogout = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return(
       <Row className="mt-5">
            <Col xs={12} sm={6} md={4} xl={3}>
                <Panel 
                    usuario={`${cliente.nombre} ${cliente.apellido}`} 
                    handleLogout={handleLogout} 
                />
            </Col>
            <Col xs={12} sm={6} md={8} xl={9} className="mt-sm-0">
                <MiCuenta 
                    cliente={cliente} 
                />
            </Col>
       </Row>
    );
}

export default MiPerfil;