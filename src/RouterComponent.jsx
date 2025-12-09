import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes del proyecto (Listado, Detalle, Crear)
import PostDetail from './components/PostDetail'; 
import PostList from './components/PostList'; 
import CreatePost from './components/CreatePost'; 

function RouterComponent() {
  return (
    // Usa Router, Routes y Route
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de Listado (Paginado) */}
          <Route path="/" element={<PostList />} />
          <Route path="/listado" element={<PostList />} />
          
          {/* Ruta para Crear Post */}
          <Route path="/crear" element={<CreatePost />} />
          
          {/* Ruta de Detalle (Necesita el ID) */}
          <Route path="/posts/:postId" element={<PostDetail />} /> 

          {/* Ruta 404 */}
          <Route path="*" element={<h1>404 | Página no encontrada</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default RouterComponent;