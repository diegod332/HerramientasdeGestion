// Pantalla de Registro de Usuario
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Por favor, ingresa los campos requeridos.');
      return;
    }

    setError('');
    setCargando(true);

    const respuesta = await register(username, email, password, bio);
    setCargando(false);

    if (respuesta.success) {
      navigate('/');
    } else {
      setError(respuesta.mensaje);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card glass">
        <h1 className="auth-logo text-gradient">Anstagram</h1>
        <p className="auth-subtitle">Crea tu cuenta de proyecto UTCV</p>

        {error && <div className="alert-banner alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Nombre de Usuario *</label>
            <input
              type="text"
              id="username"
              placeholder="diego_sanchez"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Correo Electrónico *</label>
            <input
              type="email"
              id="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Contraseña *</label>
            <input
              type="password"
              id="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="bio">Biografía / Presentación</label>
            <textarea
              id="bio"
              placeholder="Cuéntanos sobre ti..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="input-field"
              rows="2"
              style={{ resize: 'none' }}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={cargando}>
            {cargando ? 'Registrando...' : 'Registrarme'}
          </button>
        </form>

        <div className="auth-footer">
          ¿Ya tienes una cuenta? 
          <Link to="/login" className="auth-link">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
