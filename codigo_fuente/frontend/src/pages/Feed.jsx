// Feed Principal de Publicaciones
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, API_URL } from '../context/AuthContext';
import Stories from '../components/Stories';
import { Heart, MessageCircle, Send } from 'lucide-react';

const Feed = ({ forceRefresh, onRefreshEnd }) => {
  const { token, usuario } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [comentariosInputs, setComentariosInputs] = useState({});
  const [cargando, setCargando] = useState(true);

  const fetchPosts = async () => {
    try {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const respuesta = await axios.get(`${API_URL}/posts`, config);
      setPosts(respuesta.data);
    } catch (error) {
      console.error('Error al obtener posts del backend:', error);
    } finally {
      setCargando(false);
      if (onRefreshEnd) onRefreshEnd();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [token]);

  useEffect(() => {
    if (forceRefresh) {
      fetchPosts();
    }
  }, [forceRefresh]);

  const handleLike = async (postId) => {
    if (!token) return alert('Debes iniciar sesión para dar me gusta.');
    
    try {
      // Petición al backend
      const respuesta = await axios.post(`${API_URL}/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const { likes_count, ya_dio_like } = respuesta.data;

      // Actualizar estado local del post
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, likes_count, ya_dio_like }
            : post
        )
      );
    } catch (error) {
      console.error('Error al procesar like:', error);
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    const contenido = comentariosInputs[postId];
    if (!contenido || !contenido.trim()) return;
    if (!token) return alert('Debes iniciar sesión para comentar.');

    try {
      const respuesta = await axios.post(`${API_URL}/posts/${postId}/comments`, { contenido }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const nuevoComentario = respuesta.data.comentario;

      // Agregar comentario al estado del post actual
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, comentarios: [...post.comentarios, nuevoComentario] }
            : post
        )
      );

      // Limpiar input
      setComentariosInputs(prev => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error al comentar:', error);
    }
  };

  const handleInputChange = (postId, valor) => {
    setComentariosInputs(prev => ({ ...prev, [postId]: valor }));
  };

  // Formatear url de imágenes subidas por Multer localmente
  const renderImage = (imgUrl) => {
    if (imgUrl.startsWith('http') || imgUrl.startsWith('data:')) {
      return imgUrl;
    }
    return `http://localhost:5000/${imgUrl}`;
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Stories />

      {cargando ? (
        <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)' }}>
          Cargando publicaciones de Anstagram...
        </div>
      ) : posts.length === 0 ? (
        <div className="glass" style={{ padding: '40px', borderRadius: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: '15px' }}>No hay publicaciones todavía.</p>
          <p style={{ fontSize: '0.85rem' }}>¡Sé el primero en compartir algo con tus compañeros de la UTCV!</p>
        </div>
      ) : (
        posts.map(post => (
          <article key={post.id} className="post-card glass">
            {/* Header del Post */}
            <div className="post-header">
              <Link to={`/profile/${post.usuario_id}`} className="post-author">
                <img 
                  src={post.foto_perfil ? renderImage(post.foto_perfil) : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} 
                  alt={post.username} 
                  className="post-author-avatar"
                />
                <span className="post-author-username">{post.username}</span>
              </Link>
            </div>

            {/* Imagen del Post */}
            <div className="post-image-container">
              <img 
                src={renderImage(post.imagen_url)} 
                alt="Contenido" 
                className="post-image"
                onDoubleClick={() => handleLike(post.id)}
              />
            </div>

            {/* Acciones */}
            <div className="post-actions">
              <button 
                onClick={() => handleLike(post.id)} 
                className={`action-btn ${post.ya_dio_like ? 'liked' : ''}`}
              >
                <Heart fill={post.ya_dio_like ? 'currentColor' : 'none'} size={24} />
              </button>
              <button className="action-btn">
                <MessageCircle size={24} />
              </button>
            </div>

            {/* Info y Comentarios */}
            <div className="post-info">
              <div className="likes-count">
                {post.likes_count} {post.likes_count === 1 ? 'Me gusta' : 'Me gustas'}
              </div>

              <div className="post-description">
                <Link to={`/profile/${post.usuario_id}`} className="post-description-username">
                  {post.username}
                </Link>
                {post.descripcion}
              </div>

              {/* Listado de comentarios */}
              <div className="comments-section">
                {post.comentarios && post.comentarios.map((com, index) => (
                  <div key={com.id || index} className="comment-item">
                    <span className="comment-username">{com.username}</span>
                    <span className="comment-content">{com.contenido}</span>
                  </div>
                ))}
              </div>

              {/* Formulario para agregar comentario */}
              {token && (
                <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="comment-form">
                  <input
                    type="text"
                    placeholder="Agrega un comentario..."
                    value={comentariosInputs[post.id] || ''}
                    onChange={(e) => handleInputChange(post.id, e.target.value)}
                    className="comment-input"
                  />
                  <button type="submit" className="comment-submit">
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default Feed;
