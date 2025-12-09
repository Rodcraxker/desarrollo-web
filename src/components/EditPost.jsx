import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePosts from '../hooks/usePosts';
import usePostDetail from '../hooks/usePostDetail'; 

// Asumimos que esta función maneja el estado del formulario (inputs)
const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const { updatePost } = usePosts(); // Función para enviar la petición PUT/PATCH
  const { post: initialPost, loadingDetail, errorDetail } = usePostDetail(postId); // Hook para cargar los datos iniciales

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Cargar datos iniciales al montar
  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title || '');
      setContent(initialPost.content || '');
    }
  }, [initialPost]);


  // 2. Función genérica de envío (llama a updatePost)
  const handleUpdate = async (shouldNavigateToList) => {
    setLoading(true);
    setMessage('');

    if (!title.trim() || !content.trim()) {
      setMessage('⚠️ El título y el contenido no pueden estar vacíos.');
      setLoading(false);
      return;
    }

    const updatedData = { title, content }; // Datos a enviar

    const success = await updatePost(postId, updatedData);

    setLoading(false);

    if (success) {
      setMessage('✅ Post actualizado exitosamente.');
      
      // 3. Lógica de Redirección Condicional
      if (shouldNavigateToList) {
        // Redirige al listado
        navigate('/listado');
      } 
      // Si shouldNavigateToList es false, el usuario se queda en la página de edición.
      
    } else {
      setMessage('❌ Error al actualizar el post.');
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Post ID: {postId}</h2>
      {message && <div className={message.startsWith('❌') ? 'alert-error' : 'alert-success'}>{message}</div>}

      {/* ... Formulario y Inputs (Title, Content) van aquí ... */}
      
      <div className="button-group">
        {/* Botón 1: Actualizar y Continuar Editando (shouldNavigateToList = false) */}
        <button 
          onClick={() => handleUpdate(false)} 
          disabled={loading}
          className="btn-primary"
        >
          {loading ? 'Actualizando...' : 'Actualizar y Continuar Editando'}
        </button>

        {/* Botón 2: Actualizar y Regresar a Listado (shouldNavigateToList = true) */}
        <button 
          onClick={() => handleUpdate(true)} 
          disabled={loading}
          className="btn-secondary"
        >
          Actualizar y Regresar a Listado
        </button>
      </div>
    </div>
  );
};

export default EditPost;