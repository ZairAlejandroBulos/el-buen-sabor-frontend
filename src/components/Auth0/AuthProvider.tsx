import { ReactNode, useEffect } from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

interface Props {
  children?: ReactNode;
  initialState: {
    isAuthenticated: boolean;
    idToken: string;
  };
}

/**
 * Componente que proporciona el contexto de autenticación.
 * @author Bulos
 */
function AuthProvider({ children, initialState }: Props): JSX.Element {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  useEffect(() => {
    storeAuthState();
  }, [ isAuthenticated, getIdTokenClaims, initialState ]);  

  const storeAuthState = async () => {
    if (isAuthenticated) {
      const idToken = await getIdTokenClaims();
      localStorage.setItem(
        "authState",
        JSON.stringify({ isAuthenticated, idToken })
      );
    } else {
      localStorage.removeItem("authState");
    }
  };

  return (
    <Auth0Provider
      domain={domain as string}
      clientId={clientId as string}
      authorizationParams={{
        audience: audience as string,
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      { children }
    </Auth0Provider>
  );
}

export default AuthProvider;