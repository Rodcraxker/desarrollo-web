import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importa el componente que contendrá la estructura HTML de tu post
import PostPage from './components/PostPage';
// Nota: Deberás crear este archivo en la ruta 'src/components/PostPage.jsx'

function App() {
  return (
    // 1. Usamos Router para habilitar la navegación en toda la aplicación
    <Router>
      <div className="App">
        {/* 2. Definimos las rutas de la aplicación */}
        <Routes>
          
          {/* Esta ruta '/' cargará el componente PostPage. 
            Es la página de inicio o la URL del post específico.
          */}
          <Route path="/" element={<PostPage />} />
          
          {/* (Opcional) Puedes añadir otras rutas aquí si tienes una página
            de listado o de contacto, por ejemplo.
            <Route path="/listado" element={<div>Página de Listado</div>} />
          */}

          {/* Ruta para manejar URLs que no existen (Not Found)
            <Route path="*" element={<div>404 - Página no encontrada</div>} /> 
          */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;