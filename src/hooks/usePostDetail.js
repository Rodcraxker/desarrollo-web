import useFetch from './useFetch';

const API_BASE_URL = 'http://localhost:3000/posts';

// Hook para manejar el detalle de un post específico
const usePostDetail = (postId) => {
  // Solo ejecuta useFetch si tenemos un postId válido
  const url = postId ? `${API_BASE_URL}/${postId}` : null;
  
  // useFetch ejecuta el GET automáticamente
  const { data: post, loading: loadingDetail, error: errorDetail } = useFetch(url);

  return { 
    post, 
    loadingDetail, 
    errorDetail,
  };
};

export default usePostDetail;