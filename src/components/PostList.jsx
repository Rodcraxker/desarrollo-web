// components/PostList.jsx (Hipotético)
import React, { useState } from 'react';
import usePosts from '../hooks/usePosts'; 

const POSTS_PER_PAGE = 5;

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // 1. Cargar posts usando paginación
  const { posts, loadingPosts, errorPosts } = usePosts(currentPage, POSTS_PER_PAGE);
  
  // NOTE: Para calcular el total de páginas, necesitarías leer el header 'X-Total-Count'
  // que el useFetch base NO está capturando. Esto requeriría modificar useFetch para 
  // capturar headers si JSON Server es tu backend final.
  // Por simplicidad, asumiremos un cálculo simple aquí.
  const totalPages = 10; // Valor de ejemplo

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ... (Lógica de renderizado) ...
  
  return (
    <div>
      <h1>Listado de Posts</h1>
      {/* Mapear y renderizar 'posts' */}

      {/* 2. Controles de Paginación */}
      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PostList;