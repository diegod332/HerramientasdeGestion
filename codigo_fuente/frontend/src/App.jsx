// Componente Principal de la Aplicación Anstagram
// UTCV - 9° IDGS - Administración de Proyectos de TI
import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import About from './pages/About';
import CreatePostModal from './components/CreatePostModal';

// Componente para proteger rutas privadas
const RutaProtegida = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
};

const ContenidoApp = () => {
  const { token } = useContext(AuthContext);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [feedRefreshKey, setFeedRefreshKey] = useState(0);

  const handlePostCreated = () => {
    // Incrementar key para forzar la recarga del Feed
    setFeedRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app-layout">
      {/* Solo mostramos la barra lateral si el usuario inició sesión */}
      {token && <Navbar onOpenCreateModal={() => setModalAbierto(true)} />}

      <main className="main-content">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
          <Route path="/register" element={token ? <Navigate to="/" replace /> : <Register />} />

          {/* Rutas Protegidas */}
          <Route path="/" element={
            <RutaProtegida>
              <Feed forceRefresh={modalAbierto === false && feedRefreshKey > 0} />
            </RutaProtegida>
          } />
          <Route path="/profile/:id" element={
            <RutaProtegida>
              <Profile />
            </RutaProtegida>
          } />
          <Route path="/about" element={
            <RutaProtegida>
              <About />
            </RutaProtegida>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modal global de publicación */}
      {token && (
        <CreatePostModal 
          isOpen={modalAbierto} 
          onClose={() => setModalAbierto(false)} 
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ContenidoApp />
      </AuthProvider>
    </Router>
  );
}

export default App;
