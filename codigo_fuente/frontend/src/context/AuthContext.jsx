// Contexto de Autenticación de Anstagram
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// URL base del backend
export const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Si hay un token guardado, intentar configurarlo en axios
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Cargar perfil del usuario actual desde localStorage
      const userStored = localStorage.getItem('usuario');
      if (userStored) {
        setUsuario(JSON.parse(userStored));
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUsuario(null);
    }
    setCargando(false);
  }, [token]);

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const respuesta = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token: tokenRecibido, usuario: datosUsuario } = respuesta.data;
      
      localStorage.setItem('token', tokenRecibido);
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));
      setToken(tokenRecibido);
      setUsuario(datosUsuario);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        mensaje: error.response?.data?.mensaje || 'Error de conexión con el servidor.'
      };
    }
  };

  // Función para registrarse
  const register = async (username, email, password, bio) => {
    try {
      const respuesta = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        bio
      });
      const { token: tokenRecibido, usuario: datosUsuario } = respuesta.data;

      localStorage.setItem('token', tokenRecibido);
      localStorage.setItem('usuario', JSON.stringify(datosUsuario));
      setToken(tokenRecibido);
      setUsuario(datosUsuario);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        mensaje: error.response?.data?.mensaje || 'Error al intentar registrarse.'
      };
    }
  };

  // Cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, register, logout, cargando, setUsuario }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};
