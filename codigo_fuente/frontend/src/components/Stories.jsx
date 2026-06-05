// Componente de Stories (Historias de Anstagram)
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';

const Stories = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const respuesta = await axios.get(`${API_URL}/stories`);
        setStories(respuesta.data);
      } catch (error) {
        console.error('Error al obtener stories del backend:', error);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="stories-container glass">
      {stories.map(story => (
        <div key={story.id} className="story-item">
          <div className="story-avatar-wrapper">
            <img 
              src={story.foto_perfil ? (story.foto_perfil.startsWith('http') ? story.foto_perfil : `http://localhost:5000/${story.foto_perfil}`) : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} 
              alt={story.username} 
              className="story-avatar" 
            />
          </div>
          <span className="story-username">{story.username}</span>
        </div>
      ))}
      
      {/* Si no hay suficientes historias, mostramos placeholders bonitos */}
      {stories.length === 0 && (
        <>
          <div className="story-item">
            <div className="story-avatar-wrapper">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Usuario 1" className="story-avatar" />
            </div>
            <span className="story-username">sofia_dev</span>
          </div>
          <div className="story-item">
            <div className="story-avatar-wrapper">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150" alt="Usuario 2" className="story-avatar" />
            </div>
            <span className="story-username">carlos_ti</span>
          </div>
          <div className="story-item">
            <div className="story-avatar-wrapper">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Usuario 3" className="story-avatar" />
            </div>
            <span className="story-username">ana_valenzuela</span>
          </div>
          <div className="story-item">
            <div className="story-avatar-wrapper">
              <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" alt="Usuario 4" className="story-avatar" />
            </div>
            <span className="story-username">maria_romero</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Stories;
