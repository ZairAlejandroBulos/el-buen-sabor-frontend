import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./Index.css";

// Configuracion Auth0
import AuthProvider from "./components/Auth0/AuthProvider";
const storedAuthState = JSON.parse(localStorage.getItem("authState") || "{}");
const initialAuthState = {
    isAuthenticated: storedAuthState.isAuthenticated || false,
    idToken: storedAuthState.idToken || "",
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider initialState={initialAuthState}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);