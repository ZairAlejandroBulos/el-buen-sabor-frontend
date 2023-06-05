import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./Index.css";

// Configuración de Auth0
import AuthProvider from "./components/Auth0/AuthProvider";

// Recuperar el estado de autenticación almacenado en el localStorage
const storedAuthState = JSON.parse(localStorage.getItem("authState") || "{}");

// Establecer el estado inicial de autenticación
const initialAuthState = {
  isAuthenticated: storedAuthState.isAuthenticated || false,
  idToken: storedAuthState.idToken || "",
};

// Renderizar la aplicación en el elemento con el id 'root'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider initialState={initialAuthState}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
