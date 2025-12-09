// src/components/PostDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import usePostDetail from '../hooks/usePostDetail'; 

const PostDetail = () => {
  // Obtenemos el ID de la URL (requiere que la ruta sea '/post/:postId')
  const { postId } = useParams(); 
  
  // Usamos el custom hook
  const { post, loadingDetail, errorDetail } = usePostDetail(postId);

  if (loadingDetail) return (
    <main><p>Cargando post...</p></main>
  );
  if (errorDetail) return (
    <main><p>❌ Error al cargar el post: {errorDetail}</p></main>
  );
  if (!post) return (
    <main><p>Post no encontrado.</p></main>
  );

  return (
    // Estructura HTML del post con datos dinámicos
    <main>
        <article className="post">
            <header>
                <h1 className="post-title">{post.title}</h1>
                <p className="post-meta">Publicado por {post.author} el {post.date}</p>
            </header>
            <div className="post-content">
                <p>{post.content}</p>
            </div>
        </article>
        <aside className="related-content">...</aside>
    </main>
  );
};

export default PostDetail;