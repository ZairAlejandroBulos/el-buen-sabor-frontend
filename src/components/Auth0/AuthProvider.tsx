import React, { ReactNode } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

interface Props {
  children?: ReactNode;
}

function AuthProvider({ children }: Props): JSX.Element {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain as string}
      clientId={clientId as string}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      { children }
    </Auth0Provider>
  );
}

export default AuthProvider;