// Perfil de Usuario con Grid de Publicaciones
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, API_URL } from '../context/AuthContext';
import { Heart, Grid, Camera } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const { token, usuario: usuarioLogueado } = useContext(AuthContext);
  const [perfil, setPerfil] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [procesandoFollow, setProcesandoFollow] = useState(false);

  const fetchProfile = async () => {
    try {
      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const respuesta = await axios.get(`${API_URL}/users/${id}/profile`, config);
      setPerfil(respuesta.data.usuario);
      setPosts(respuesta.data.publicaciones);
    } catch (error) {
      console.error('Error al obtener perfil del backend:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id, token]);

  const handleFollow = async () => {
    if (!token) return alert('Debes iniciar sesión para seguir usuarios.');
    setProcesandoFollow(true);

    try {
      const respuesta = await axios.post(`${API_URL}/users/${id}/follow`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const { siguiendo } = respuesta.data;
      
      // Actualizar contadores localmente
      setPerfil(prev => ({
        ...prev,
        siguiendo,
        seguidores_count: siguiendo ? prev.seguidores_count + 1 : prev.seguidores_count - 1
      }));
    } catch (error) {
      console.error('Error en seguimiento:', error);
    } finally {
      setProcesandoFollow(false);
    }
  };

  const renderImage = (imgUrl) => {
    if (imgUrl.startsWith('http') || imgUrl.startsWith('data:')) {
      return imgUrl;
    }
    return `http://localhost:5000/${imgUrl}`;
  };

  if (cargando) {
    return <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)' }}>Cargando perfil...</div>;
  }

  if (!perfil) {
    return (
      <div className="glass" style={{ padding: '40px', borderRadius: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        El usuario no existe o no se pudo cargar la información.
      </div>
    );
  }

  const esMiPerfil = usuarioLogueado && usuarioLogueado.id === perfil.id;

  return (
    <div>
      {/* Cabecera del Perfil */}
      <header className="profile-header">
        <div className="profile-avatar-container">
          <img 
            src={perfil.foto_perfil ? renderImage(perfil.foto_perfil) : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200'} 
            alt={perfil.username} 
            className="profile-avatar"
          />
        </div>

        <div className="profile-info">
          <div className="profile-username-row">
            <h2 className="profile-username">{perfil.username}</h2>
            {!esMiPerfil && usuarioLogueado && (
              <button 
                onClick={handleFollow} 
                disabled={procesandoFollow}
                className={`follow-btn ${perfil.siguiendo ? 'unfollow' : 'follow'}`}
              >
                {perfil.siguiendo ? 'Dejar de seguir' : 'Seguir'}
              </button>
            )}
            {esMiPerfil && (
              <span style={{ fontSize: '0.8rem', background: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: '12px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                Tú (Mi Perfil)
              </span>
            )}
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{perfil.posts_count}</span> publicaciones
            </div>
            <div className="stat-item">
              <span className="stat-value">{perfil.seguidores_count}</span> seguidores
            </div>
            <div className="stat-item">
              <span className="stat-value">{perfil.seguidos_count}</span> seguidos
            </div>
          </div>

          <div className="profile-bio">
            <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '5px' }}>{perfil.username}</p>
            <p>{perfil.bio || 'Sin biografía disponible.'}</p>
          </div>
        </div>
      </header>

      {/* Grid de Publicaciones */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
          <Grid size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Publicaciones</span>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-secondary)' }}>
            <Camera size={36} style={{ marginBottom: '10px', opacity: 0.5 }} />
            <p>Aún no hay publicaciones en este perfil.</p>
          </div>
        ) : (
          <div className="profile-grid">
            {posts.map(post => (
              <div key={post.id} className="grid-post-item">
                <img 
                  src={renderImage(post.imagen_url)} 
                  alt={post.descripcion} 
                  className="grid-post-img"
                />
                <div className="grid-post-overlay">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Heart fill="white" size={18} />
                    <span>{post.likes_count || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
