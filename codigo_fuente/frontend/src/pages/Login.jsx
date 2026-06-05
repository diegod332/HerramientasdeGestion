// Pantalla de Inicio de Sesión
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, ingresa todos los campos.');
      return;
    }

    setError('');
    setCargando(true);

    const respuesta = await login(email, password);
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
        <p className="auth-subtitle">UTCV • Integrador de Proyectos</p>

        {error && <div className="alert-banner alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Correo Electrónico</label>
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
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={cargando}>
            {cargando ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          ¿No tienes una cuenta? 
          <Link to="/register" className="auth-link">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
