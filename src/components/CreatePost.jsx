import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import usePosts from '../hooks/usePosts'; 

// Asumiremos que este componente está en la ruta /posts/new

const CreatePost = () => {
  // Inicialización de hooks y estados
  const navigate = useNavigate();
  const { createPost } = usePosts(); 
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // Estado para mensajes de éxito/error

  // Función de validación y envío
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage(''); // Limpiar mensajes anteriores

    // 1. Validaciones
    if (!title.trim() || !content.trim()) {
      setMessage('⚠️ Error: Los campos Título y Contenido no pueden estar vacíos.');
      return; // Detener el envío
    }

    setLoading(true);

    const newPost = {
      title,
      content,
      author: 'Usuario Actual', // Puedes obtener esto de un contexto de autenticación
      date: new Date().toISOString().split('T')[0],
      // JSON Server asignará el ID automáticamente
    };

    const result = await createPost(newPost); // Llama a la función del hook usePosts

    setLoading(false);

    if (result) {
      // 3. Limpiar Campos y 4. Mostrar Mensaje de Éxito
      setTitle('');
      setContent('');
      setMessage('✅ Post creado exitosamente. Redirigiendo en 3 segundos...');
      
      // 5. Agregar un mensaje luego de realizado el envío/Regresar al listado
      setTimeout(() => {
        navigate('/listado'); // Redirige a la ruta de listado
      }, 3000); // Espera 3 segundos antes de redirigir
      
    } else {
      setMessage('❌ Error al crear el post. Intente de nuevo.');
    }
  };

  return (
    <div className="form-container">
      <h2>Crear Nuevo Post</h2>
      
      {/* 1. Link para regresar al listado de posts */}
      <p>
        <Link to="/listado">← Regresar al Listado de Posts</Link>
      </p>

      {/* Mensaje de estado */}
      {message && <div className={message.startsWith('⚠️') || message.startsWith('❌') ? 'alert-error' : 'alert-success'}>{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Contenido:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            disabled={loading}
          ></textarea>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Crear Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;