import useFetch from './useFetch';

const API_BASE_URL = 'http://localhost:3000/posts';

// Hook para manejar la lista de posts y lógica CRUD
const usePosts = () => {
  // UseFetch se encarga de cargar la lista inicial al montar
  const { data: posts, loading: loadingPosts, error: errorPosts, executeFetch } = useFetch(API_BASE_URL);

  // Función para actualizar un post (usada en el componente de formulario)
  const updatePost = async (id, updatedPost) => {
    // La lógica de los botones "Actualizar y Continuar" usaría esta función
    return await executeFetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT', // o PATCH
      body: JSON.stringify(updatedPost),
    });
  };

  // Otras operaciones CRUD...
  const createPost = (newPost) => executeFetch(API_BASE_URL, { method: 'POST', body: JSON.stringify(newPost) });
  const deletePost = (id) => executeFetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });


  return { 
    posts, 
    loadingPosts, 
    errorPosts, 
    updatePost,
    createPost,
    deletePost,
    refetch: executeFetch, // Para refrescar la lista después de un CRUD
  };
};

export default usePosts;