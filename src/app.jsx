import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterComponent from './RouterComponent'; // Importa tu nuevo componente de ruteo

// Este código monta tu aplicación en el div id="root"
function renderApp() {
  const rootElement = document.getElementById('root');

  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        {/* Montamos el componente que contiene todas las rutas */}
        <RouterComponent /> 
      </React.StrictMode>
    );
  }
}

// Ejecuta el montaje
renderApp();