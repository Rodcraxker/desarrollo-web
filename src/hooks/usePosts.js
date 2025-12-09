import useFetch from './useFetch';

const API_BASE_URL = 'http://localhost:3000/posts';

/**
 * Hook para manejar la lista de posts con paginación y las operaciones CRUD.
 *
 * @param {number} page - Número de la página actual (por defecto 1).
 * @param {number} limit - Número de posts por página (por defecto 10).
 * @returns {object} { posts, loadingPosts, errorPosts, updatePost, createPost, deletePost, refetch }
 */
const usePosts = (page = 1, limit = 10) => {
  // 1. Construimos la URL con los parámetros de paginación
  // JSON Server usa _page y _limit
  const urlWithPagination = `${API_BASE_URL}?_page=${page}&_limit=${limit}`;
  
  // 2. useFetch se encarga de cargar la lista inicial con la URL paginada.
  const { 
    data: posts, 
    loading: loadingPosts, 
    error: errorPosts, 
    executeFetch // Función base para llamadas manuales (CRUD)
  } = useFetch(urlWithPagination);

  // --- Funciones CRUD (Usan executeFetch con la URL específica del recurso) ---

  // Función para actualizar un post (PUT/PATCH)
  const updatePost = async (id, updatedPost) => {
    // La operación apunta al ID específico, ignorando los parámetros de paginación
    return await executeFetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT', 
      body: JSON.stringify(updatedPost),
    });
  };

  // Función para crear un post (POST)
  const createPost = (newPost) => {
    // La operación apunta a la URL base
    return executeFetch(API_BASE_URL, { 
      method: 'POST', 
      body: JSON.stringify(newPost) 
    });
  }

  // Función para eliminar un post (DELETE)
  const deletePost = (id) => {
    // La operación apunta al ID específico
    return executeFetch(`${API_BASE_URL}/${id}`, { 
      method: 'DELETE' 
    });
  }
  
  // Función para recargar la lista actual (con la paginación actual)
  const refetch = () => executeFetch(urlWithPagination);


  return { 
    posts, 
    loadingPosts, 
    errorPosts, 
    updatePost,
    createPost,
    deletePost,
    refetch,
  };
};

export default usePosts;