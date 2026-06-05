// Componente Modal para Crear Publicación
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext, API_URL } from '../context/AuthContext';
import { X, Image, Upload } from 'lucide-react';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const { token } = useContext(AuthContext);
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivoImagen(file);
      setImagenUrl(''); // Limpiar url si sube archivo
      const reader = new FileReader();
      reader.onloadend = () => {
        setVistaPrevia(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlChange = (e) => {
    setImagenUrl(e.target.value);
    setArchivoImagen(null); // Limpiar archivo si pone url
    setVistaPrevia(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!archivoImagen && !imagenUrl) {
      setError('Debes proporcionar una imagen (archivo o URL).');
      return;
    }

    setCargando(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('descripcion', descripcion);

      if (archivoImagen) {
        formData.append('imagen', archivoImagen);
      } else {
        formData.append('imagen_url', imagenUrl);
      }

      await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      // Reiniciar formulario y cerrar modal
      setDescripcion('');
      setImagenUrl('');
      setArchivoImagen(null);
      setVistaPrevia('');
      onPostCreated(); // Actualizar el feed
      onClose();
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error al intentar crear la publicación.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <h3 className="modal-title">Crear nueva publicación</h3>

        {error && <div className="alert-banner alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Vista Previa de Imagen */}
          <div 
            style={{ 
              width: '100%', 
              height: '240px', 
              borderRadius: '12px', 
              background: 'var(--bg-primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justify: 'center',
              overflow: 'hidden',
              marginBottom: '20px',
              border: '2px dashed var(--border-color)',
              position: 'relative'
            }}
          >
            {vistaPrevia ? (
              <img 
                src={vistaPrevia} 
                alt="Vista previa" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <Image size={48} style={{ marginBottom: '8px', opacity: 0.5 }} />
                <p style={{ fontSize: '0.85rem' }}>La vista previa de tu foto aparecerá aquí</p>
              </div>
            )}
          </div>

          {/* Subida de Archivo */}
          <div className="input-group">
            <label>Subir archivo de imagen</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                id="file-upload" 
                style={{ display: 'none' }}
              />
              <label 
                htmlFor="file-upload" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '12px',
                  borderRadius: '12px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  textTransform: 'none',
                  fontSize: '0.9rem'
                }}
              >
                <Upload size={18} />
                Seleccionar desde el dispositivo
              </label>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '15px 0', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>o bien</div>

          {/* URL de Imagen */}
          <div className="input-group">
            <label>Enlace de imagen de internet</label>
            <input 
              type="text" 
              placeholder="https://ejemplo.com/imagen.jpg" 
              value={imagenUrl}
              onChange={handleUrlChange}
              className="input-field"
            />
          </div>

          {/* Descripción */}
          <div className="input-group">
            <label>Descripción de la publicación</label>
            <textarea 
              placeholder="Escribe un pie de foto..." 
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="input-field"
              rows="3"
              style={{ resize: 'none' }}
            />
          </div>

          <button 
            type="submit" 
            className="auth-btn" 
            disabled={cargando}
          >
            {cargando ? 'Publicando...' : 'Compartir'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
